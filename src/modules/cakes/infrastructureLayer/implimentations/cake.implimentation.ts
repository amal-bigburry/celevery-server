/**
 * © Bigburry Hypersystems LLP. All rights reserved.
 * This source code is confidential and intended only for internal use.
 * Unauthorized copying, modification, distribution, or disclosure is prohibited.
 */
/**
 * importing required packages
 */
import { Model } from 'mongoose';
import { CakeEntity } from '../../domainLayer/entities/cake.entity';
import { CakeDto } from '../../../../common/dtos/cake.dto';
import { extname } from 'path';
import { randomUUID } from 'crypto';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import getDistanceFromLatLonInKm from 'src/common/utils/getDistanceFromLatLonInKm';
import { ConfigService } from '@nestjs/config';
import { GETSTORE } from '../../tokens/get-store.token';
import { STORE_STATUS } from 'src/common/utils/contants';
import { CakeRepository } from '../../applicationLayer/interfaces/cake.interface';
import { InjectModel } from '@nestjs/mongoose';
import sharp from 'sharp';
import { IGetStoreUseCase } from '../../applicationLayer/use-cases/get-store.usecase';
import { isStoreOpen } from 'src/common/utils/isStoreOpen';
import { getCurrentMilitaryTime } from 'src/common/utils/getCurrentMilterytime';
import { getCurrentDayName } from 'src/common/utils/getCurrentDayName';
/**
 * implementation of cake repository
 */
@Injectable()
export class CakeRepositoryImp implements CakeRepository {
  /**
   * constructor injecting required dependencies
   */
  constructor(
    @InjectModel('Cakes') private cakeModel: Model<CakeEntity>,
    private readonly configService: ConfigService,
    // @Inject(GETSTORE)
    private readonly getstoreUsecase: IGetStoreUseCase,
  ) {}
  /**
   * Finds all cakes belonging to a specific store by store_id
   * Returns an array of CakeEntity objects
   */
  async findCakeByStoreId(store_id: string): Promise<CakeEntity[]> {
    return await this.cakeModel.find({ store_id }).exec();
  }
  /**
   * Updates the 'known_for' field of a cake by its ID
   * Throws exception if cake not found
   * Returns confirmation string after update
   */
  async updateKnownfor(cake_id: string, known_for: string): Promise<string> {
    const cake = await this.cakeModel.findById(cake_id).exec();
    if (!cake) throw new BadRequestException('Cake not found');
    cake.known_for = known_for;
    await cake.save();
    return 'updated';
  }
  /**
   * Retrieves all cakes and calculates distance from user location
   * Applies pagination logic on the results
   * Returns paginated cake data with store info and distance
   */
  async findCakesFromOpenStore(): Promise<CakeEntity[]> {
    const cakes = await this.cakeModel.find().exec();

    const cakeResults = await Promise.all(
      cakes.map(async (cake) => {
        const store = await this.getstoreUsecase.execute(cake.store_id);
        if (!store) return null;

        const currentDay = getCurrentDayName().toLowerCase(); // e.g., "monday"
        const openAt = store[`${currentDay}_open_at`];
        const closeAt = store[`${currentDay}_close_at`];

        const isOpen = isStoreOpen(openAt, closeAt);
        const isApproved = store.store_status === STORE_STATUS.APPROVED;

        return isOpen || isApproved ? cake : null;
      }),
    );

    return cakeResults.filter((cake) => cake !== null);
  }

  /**
   * Finds a cake by its unique ID
   * Throws exception if cake not found
   * Returns the found cake entity
   */
  async findById(cake_id: string): Promise<CakeEntity> {
    const cake = await this.cakeModel.findById(cake_id).exec();
    if (!cake) throw new BadRequestException('Cake not found');
    return cake;
  }
  /**
   * Creates a new cake entry using cakeDto
   * Returns the created cake object
   */
  async createcake(cakeDto: CakeDto): Promise<Object> {
    return await this.cakeModel.create(cakeDto);
  }
  /**
   * Searches for cakes based on keyword or category
   * Constructs query filter conditionally
   * Returns list of cakes that match the criteria
   */
  async find(
    keyword: string,
    category_id: string,
    log: number,
    lat: number,
  ): Promise<any[]> {
    let filter: any = {};
    if (category_id) {
      filter.cake_category_ids = category_id;
    } else if (keyword) {
      filter.cake_name = { $regex: keyword, $options: 'i' };
    }


    let openStoreCakes = await this.findCakesFromOpenStore();
    openStoreCakes = openStoreCakes?.filter(
      (cake) =>
        cake?.cake_name?.toLowerCase()?.includes(keyword?.toLowerCase()) ||
        cake?.cake_description?.toLowerCase()?.includes(keyword?.toLowerCase()) ||
        cake?.cake_category_ids?.includes(category_id),
    );
    // console.log('openStoreCakes', openStoreCakes);

    const cakelist = await Promise.all(
      openStoreCakes.map(async (cake) => {
        // console.log(cake);
        const store = await this.getstoreUsecase.execute(cake.store_id);
        // console.log('store', store);
        const distanceBetweenUserAndCake = getDistanceFromLatLonInKm(
          store?.lat,
          store?.log,
          lat,
          log,
        );
        return {
          _id: cake._id,
          cake_name: cake.cake_name,
          cake_description: cake.cake_description,
          cake_image_urls: cake.cake_image_urls,
          distance: distanceBetweenUserAndCake,
          cake_variants: cake.cake_variants,
          known_for: cake.known_for,
          store_name: store.store_name,
          store_id: store._id,
        };
      }),
    );

    cakelist.sort((a, b) => a.distance - b.distance);
    return cakelist;
  }

  /**
   * Uploads images to AWS S3 and returns list of URLs
   * Uses config service to fetch AWS credentials and region
   * Throws exception if AWS connection fails
   */
  async uploadImage(
    files: Express.Multer.File[],
  ): Promise<Array<string> | null> {
    let s3Urls: string[] = [];
    try {
      const s3 = new S3Client({
        region: this.configService.get<string>('AWS_REGION'),
        forcePathStyle: false,
        endpoint: `https://s3.${this.configService.get<string>('AWS_REGION')}.amazonaws.com`,
        credentials: {
          accessKeyId: `${this.configService.get<string>('AWS_ACCESS_KEY')}`,
          secretAccessKey: `${this.configService.get<string>('AWS_SECRET_KEY')}`,
        },
      });

      // console.log(files)

      for (const file of files) {
        let compressed_files = await sharp(file.buffer)
          .resize({ width: 1024 }) // Optional: reduce resolution
          .jpeg({ quality: 60 }) // Adjust quality to control file size
          .toBuffer();
        const fileExtension = extname(file.originalname);
        const s3FileName = `${randomUUID()}${fileExtension}`;
        const uploadResult = await s3.send(
          new PutObjectCommand({
            Bucket: this.configService.get<string>('AWS_BUCKET_NAME'),
            Key: s3FileName,
            Body: compressed_files,
            ContentType: file.mimetype,
          }),
        );
        s3Urls.push(
          `https://${this.configService.get<string>('AWS_BUCKET_NAME')}.s3.${this.configService.get<string>('AWS_REGION')}.amazonaws.com/${s3FileName}`,
        );
      }
      return s3Urls;
    } catch {
      throw new BadRequestException('Image Not saved, Aws not Connected');
    }
  }
}
