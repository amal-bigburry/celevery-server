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
import { CakeDto } from '../../dtos/cake.dto';
import { extname } from 'path';
import { randomUUID } from 'crypto';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import getDistanceFromLatLonInKm from 'src/common/utils/getDistanceFromLatLonInKm';
import { ConfigService } from '@nestjs/config';
import { GETSTORE } from '../../tokens/getstoreusecase.token';
import { STORE_STATUS } from 'src/common/utils/contants';
import { CakeRepository } from '../../applicationLayer/interfaces/cake.repository';
import { InjectModel } from '@nestjs/mongoose';
import sharp from 'sharp';
import { IGetStoreUseCase } from '../../applicationLayer/interfaces/getStoreUsecase.interface';
/**
 * implementation of cake repository
 */
export class CakeRepositoryImp implements CakeRepository {
  /**
   * constructor injecting required dependencies
   */
  constructor(
    @InjectModel('Cakes') private cakeModel: Model<CakeEntity>,
    private readonly configService: ConfigService,
    @Inject(GETSTORE)
    private readonly getstoreUsecase: IGetStoreUseCase,
  ) {}
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
  async findAll(): Promise<CakeEntity[]> {
    // Get all cakes in platform
    const cakes: CakeEntity[] = await this.cakeModel.find().exec();

    // filter cakes only from opened stores
    // let openStoreCakes = (
    //   await Promise.all(
    //     cakes.map(async (cake) => {
    //       const store = await this.getstoreUsecase.execute(cake.store_id);
    //       return store.store_status === STORE_STATUS.OPEN ? cake : null;
    //     }),
    //   )
    // ).filter((cake) => cake !== null);
    return cakes;
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
    // known_for: string,
    // include: string[],
  ): Promise<CakeEntity[]> {
    let filter: any = {};
    if (category_id) {
      filter.cake_category_ids = category_id;
    } else if (keyword) {
      filter.cake_name = { $regex: keyword, $options: 'i' };
    }
    const cakes = await this.cakeModel.find(filter).exec();

    const openStoreCakes = (
      await Promise.all(
        cakes.map(async (cake) => {
          const store = await this.getstoreUsecase.execute(cake.store_id);
          return store.store_status === STORE_STATUS.OPEN ? cake : null;
        }),
      )
    ).filter((cake) => cake !== null);
    const cakelist = await Promise.all(
      openStoreCakes.map(async (cake) => {
        const store = await this.getstoreUsecase.execute(cake.store_id);
        const distanceBetweenUserAndCake = getDistanceFromLatLonInKm(
          store?.lat,
          store?.log,
          lat,
          log,
        );
        return {
          _id: cake._id.toString(),
          cake_name: cake.cake_name,
          cake_description: cake.cake_description,
          cake_image_urls: cake.cake_image_urls,
          distance: distanceBetweenUserAndCake,
          store_name: store.store_name,
        };
      }),
    );
    cakelist.sort((a, b) => a.distance - b.distance);
    return cakes;
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
