/**
 * importing required packages
 */
import { InjectModel } from '@nestjs/mongoose';
import { CakeRepository } from '../../applicationLayer/repositories/cake.repository';
import { Model } from 'mongoose';
import { CakeEntity } from '../../domainLayer/entities/cake.entity';
import { CakeDto } from '../../dtos/cake.dto';
import { extname } from 'path';
import { randomUUID } from 'crypto';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { BadRequestException, Inject } from '@nestjs/common';
import getDistanceFromLatLonInKm from 'src/common/utils/getDistanceFromLatLonInKm';
import { ConfigService } from '@nestjs/config';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { IGetStoreUseCase } from '../../applicationLayer/interfaces/getStoreUsecase.interface';
import { GETSTORE } from '../../applicationLayer/tokens/getstoreusecase.token';
/**
 * implimentation of cake repository
 */
export class CakeRepositoryImp implements CakeRepository {
  constructor(
    @InjectModel('Cakes') private cakeModel: Model<CakeEntity>,
    private readonly configService: ConfigService,
    @Inject(GETSTORE)
    private readonly getstoreusecase: IGetStoreUseCase,
  ) {}
  /**
   * finall method
   */
  async findAll(
    page: number,
    limit: number,
    log: number,
    lat: number,
  ): Promise<PaginationDto> {
    const cakes = await this.cakeModel.find().exec();
    if (cakes.length === 0) throw new BadRequestException('No cakes found');
    const cakelist = await Promise.all(
      cakes.map(async (cake) => {
        const store = await this.getstoreusecase.execute(cake.store_id);
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
    const total = cakelist.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedData = cakelist.slice(start, end);
    return {
      data: paginatedData,
      total,
      page,
      limit,
      totalPages,
    };
  }
  /**
   * function to find the cake by id
   */
  async findById(cake_id: string): Promise<CakeEntity> {
    const cake = await this.cakeModel.findById(cake_id).exec();
    if (!cake) throw new BadRequestException('Cake not found');
    return cake;
  }
  /**
   * function to create a cake in the platform
   */
  async createcake(cakeDto: CakeDto): Promise<Object> {
    return await this.cakeModel.create(cakeDto);
  }
  /**
   * functioin to find the cake in the jplatform
   */
  async find(keyword: string, category_id: string): Promise<CakeEntity[]> {
    let filter: any = {};
    if (category_id) {
      filter.cake_category_ids = category_id;
    } else if (keyword) {
      filter.cake_name = { $regex: keyword, $options: 'i' };
    }
    const cakes = await this.cakeModel.find(filter).exec();
    return cakes;
  }
  /**
   * function to upload image of cake to cloud
   */
  async uploadImage(
    files: Express.Multer.File[],
  ): Promise<Array<string> | null> {
    let s3Urls: string[] = [];
    try {
      const s3 = new S3Client({
        region: this.configService.get<string>('AWS_REGION'), // ap-south-1
        forcePathStyle: false, // ✅ correct URL style
        endpoint: `https://s3.${this.configService.get<string>('AWS_REGION')}.amazonaws.com`,
        credentials: {
          accessKeyId: `${this.configService.get<string>('AWS_ACCESS_KEY')}`, // e.g., 'AKIAIOSFODNN7EXAMPLE'
          secretAccessKey: `${this.configService.get<string>('AWS_SECRET_KEY')}`, // e.g., 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY'
        },
      });
      for (const file of files) {
        const fileExtension = extname(file.originalname);
        const s3FileName = `${randomUUID()}${fileExtension}`;
        const uploadResult = await s3.send(
          new PutObjectCommand({
            Bucket: this.configService.get<string>('AWS_BUCKET_NAME'),
            Key: s3FileName,
            Body: file.buffer,
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
