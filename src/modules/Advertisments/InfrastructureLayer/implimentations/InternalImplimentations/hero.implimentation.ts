/**
 * Licensed to Bigburry Hypersystems LLP
 * All rights reserved. Unauthorized copying, redistribution or modification of this file,
 * via any medium is strictly prohibited. Proprietary and confidential.
 */
/**
 * @fileoverview This file provides the implementation of the HerosRepository interface,
 * which is a part of the data access layer and directly communicates with the MongoDB
 * database through the use of Mongoose models.
 * It also includes logic to upload hero images to AWS S3 storage using the AWS SDK.
 * The class is decorated with @Injectable() to make it eligible for dependency injection
 * within the NestJS application.
 * This implementation serves as the bridge between the application's core business logic
 * and the external data and storage infrastructure.
 *
 * Company: Bigburry Hypersystems LLP
 */
/**
 * Importing necessary dependencies from various internal and external modules.
 * This includes NestJS core utilities, Mongoose models, AWS SDK for handling S3 uploads,
 * and the interface definition that this repository implementation fulfills.
 * The goal of this import section is to organize dependencies required to perform CRUD operations
 * and file handling tasks, all of which are central to the repository's responsibilities.
 *
 * Company: Bigburry Hypersystems LLP
 */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { HeroInterface } from '../../../applicationLayer/interfaces/hero.interface';
import { HeroDto } from '../../../../../common/dtos/hero.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { extname } from 'path';
import { randomUUID } from 'crypto';
/**
 * This class implements the HerosRepository interface and provides a concrete data access mechanism.
 * It contains the logic to persist hero records into MongoDB and to upload associated hero media content
 * to an AWS S3 bucket.
 * The constructor takes in a Mongoose model injected via @InjectModel and a configuration service instance
 * to access environment variables securely.
 *
 * Company: Bigburry Hypersystems LLP
 */
@Injectable()
export class HerosRepositoryImp implements HeroInterface {
  constructor(
    @InjectModel('HeroRepository')
    private HeroRepositoryModel: Model<HeroDto>,
    private configService: ConfigService,
  ) {}
  /**
   * This method is responsible for uploading a file (usually an image) to an AWS S3 bucket.
   * It first establishes an S3 client using credentials and configuration from environment variables.
   * The uploaded file is renamed using a UUID to avoid naming conflicts in the S3 bucket.
   * On successful upload, the method returns an updated HeroDto object with the new S3 URL and file type.
   * If an error occurs, a BadRequestException is thrown to inform the client of upload failure.
   *
   * Company: Bigburry Hypersystems LLP
   */
  async uploadImage(
    heroDto: HeroDto,
    file: Express.Multer.File,
  ): Promise<HeroDto> {
    let s3Url = '';
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
      let fileExtension = extname(file.originalname);
      const s3FileName = `${randomUUID()}${fileExtension}`;
      const uploadResult = await s3.send(
        new PutObjectCommand({
          Bucket: `${this.configService.get<string>('AWS_BUCKET_NAME')}`,
          Key: s3FileName,
          Body: file.buffer,
          ContentType: file.mimetype,
        }),
      );
      s3Url = `https://${this.configService.get<string>('AWS_BUCKET_NAME')}.s3.${this.configService.get<string>('AWS_REGION')}.amazonaws.com/${s3FileName}`;
      // heroDto.hero_content_url = s3Url;
      // heroDto.hero_content_type = fileExtension;
      return {
        ...heroDto,
        hero_content_type: fileExtension,
        hero_content_url: s3Url,
      };
    } catch (error) {
      console.error('S3 Upload Error:', error);
      throw new NotFoundException('Image Not saved, Aws not Connected');
    }
  }
  /**
   * This method handles the creation of a new hero entity by first uploading the associated media
   * file to AWS S3, and then storing the resulting data in MongoDB via the Mongoose model.
   * It returns the created document upon success, enabling further operations or client feedback.
   *
   * Company: Bigburry Hypersystems LLP
   */
  async create(heroDto: HeroDto, file): Promise<HeroDto> {
    let hero = await this.uploadImage(heroDto, file);
    const createdHero = await this.HeroRepositoryModel.create(hero);
    return createdHero;
  }
  /**
   * This method retrieves all hero records from the MongoDB collection.
   * It performs a simple find query and returns the result as an array of HeroDto objects.
   * This provides clients with the ability to list all available hero entries in the system.
   *
   * Company: Bigburry Hypersystems LLP
   */
  async getAll(): Promise<HeroDto[]> {
    return await this.HeroRepositoryModel.find();
  }
  /**
   * This method deletes a specific hero record based on the provided hero_id.
   * It uses the findByIdAndDelete function from Mongoose to perform the removal.
   * After deletion, a confirmation message string is returned to indicate completion.
   *
   * Company: Bigburry Hypersystems LLP
   */
  async delete(hero_id: string): Promise<string> {
    console.log(hero_id);
    await this.HeroRepositoryModel.findByIdAndDelete(hero_id);
    return 'deleted';
  }
}
