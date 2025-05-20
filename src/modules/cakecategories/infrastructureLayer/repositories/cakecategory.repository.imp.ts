/**
 * import required packages
 */
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CakeCategoryEntity } from '../../domainLayer/entities/cakecategory.entity';
import { CakeCategoryRepository } from '../../applicationLayer/repositories/cakecategory.repository';
import { CakeCategoryDto } from '../../dtos/cakecategory.dto';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { extname } from 'path';
import { randomUUID } from 'crypto';
import { ConfigService } from '@nestjs/config';
/**
 * implimentation of cake category interface
 */
export class CakeCategoryRepositoryImp implements CakeCategoryRepository {
  constructor(
    @InjectModel('CakeCategories')
    private cakecategoryModel: Model<CakeCategoryEntity>,
    private configService: ConfigService,
  ) {}
  /**
   * Checks if a cake category with the given name exists.
   * Returns the category ID if found, otherwise returns null.
   */
  async checkifexist(name: string): Promise<string> {
    const category = await this.cakecategoryModel.find({ category_name:  name })
    if(category?.length>0){
      throw new BadRequestException("Category name already exist")
    }
    return ""
  
  }
  /**
   * helps to create cake category
   */
  async createcakecategory(cakeCategoryDto: CakeCategoryDto): Promise<Object> {
    try {
      return await this.cakecategoryModel.create(cakeCategoryDto);
    } catch (error) {
      if (error.code === 11000) {
        const key = Object.keys(error.keyValue)[0];
        const value = error.keyValue[key];
        throw new BadRequestException(
          `Duplicate value for ${key}: "${value}".`,
        );
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }
  /**
   * returns all the available categories in the platform
   */
  async findAll(): Promise<Array<any>> {
    return await this.cakecategoryModel.find().exec();
  }
  /**
   * returns category details if we pass with category id
   */
  async findCategoryById(
    cakeCategoryId: string,
  ): Promise<CakeCategoryEntity> {
    let cakecategory =  await this.cakecategoryModel.findById(cakeCategoryId)
    if(cakecategory){return cakecategory}
    throw new BadRequestException('Cake category not found')
  }
  /**
   * Helps to upload image to the aws s3 and returns the image ulrs with public view access
   */
  async uploadImage(file: Express.Multer.File): Promise<string> {
    let s3Url = '';
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
      let fileExtension = extname(file.originalname);
      const s3FileName = `${randomUUID()}${fileExtension}`;
      const uploadResult = await s3.send(
        new PutObjectCommand({
          Bucket: `${this.configService.get<string>('AWS_BUCKET_NAME')}`, // e.g., 'my-bucket'
          Key: s3FileName,
          Body: file.buffer, // 👈 Multer gives buffer directly
          ContentType: file.mimetype,
        }),
      );
      s3Url = `https://${this.configService.get<string>('AWS_BUCKET_NAME')}.s3.${this.configService.get<string>('AWS_REGION')}.amazonaws.com/${s3FileName}`;
      return s3Url;
    } catch (error) {
      console.error('S3 Upload Error:', error); // 🔥 This will show the actual reason
      throw new BadRequestException('Image Not saved, Aws not Connected');
    }
  }
}
