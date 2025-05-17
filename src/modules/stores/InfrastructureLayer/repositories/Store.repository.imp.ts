/**
 * importing the requied packages
 */
import { ConfigService } from '@nestjs/config';
import { StoreRepository } from '../../applicationLayer/repositories/store.repository';
import { StoreDto } from '../../Dtos/store.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { extname } from 'path';
import { randomUUID } from 'crypto';
import { BadRequestException } from '@nestjs/common';
import { CakeDto } from 'src/modules/cakes/dtos/cake.dto';
/**
 * implimenting interface of store repository
 */
export class StoreRepositoryImplimentation implements StoreRepository {
  private readonly s3: S3Client;
  constructor(
    private readonly configService: ConfigService,
    @InjectModel('Stores') private readonly storeModel: Model<StoreDto>,
    @InjectModel('Cakes') private readonly cakeModel: Model<CakeDto>,
  ) {
    this.s3 = new S3Client({
      region: this.configService.get<string>('AWS_REGION'),
      forcePathStyle: false,
      endpoint: `https://s3.${this.configService.get<string>('AWS_REGION')}.amazonaws.com`,
      credentials: {
        accessKeyId: `${this.configService.get<string>('AWS_ACCESS_KEY')}`,
        secretAccessKey: `${this.configService.get<string>('AWS_SECRET_KEY')}`,
      },
    });
  }
  /**
   * funtion to get all cakes in a store
   */
  async getAllStoreCakes(store_id: string): Promise<Array<CakeDto>> {
    let stores = await this.cakeModel.find({ store_id });
    return stores;
  }
  /**
   * function to delete a store from the platform
   */
  async deleteStore(): Promise<string> {
    throw new Error('Method not implemented.');
  }
  async getStore(store_id: string): Promise<StoreDto> {
    let stores = await this.storeModel.findById(store_id);
    if (stores) {
      return stores;
    } else {
      throw new BadRequestException('Invalid store id');
    }
  }
  /**
   * funtion to update the store details in the platform
   */
  async updateStore(
    store_id: string,
    field: string,
    value: string,
  ): Promise<string> {
    let store = this.storeModel.findById(store_id);
    store[field] = value;
    return 'updated';
  }
  /**
   * function to create store in the platform
   */
  async createStore(
    storeDto: StoreDto,
    licenseFile: Express.Multer.File,
    idProofFile: Express.Multer.File,
  ): Promise<string> {
    try {
      // Upload license file
      const licenseFileExtension = extname(licenseFile.originalname);
      const licenseS3FileName = `${randomUUID()}${licenseFileExtension}`;
      await this.s3.send(
        new PutObjectCommand({
          Bucket: `${this.configService.get<string>('AWS_BUCKET_NAME')}`,
          Key: licenseS3FileName,
          Body: licenseFile.buffer,
          ContentType: licenseFile.mimetype,
        }),
      );
      const licenseFileUrl = `https://${this.configService.get<string>('AWS_BUCKET_NAME')}.s3.${this.configService.get<string>('AWS_REGION')}.amazonaws.com/${licenseS3FileName}`;
      const idProofFileExtension = extname(idProofFile.originalname);
      const idProofS3FileName = `${randomUUID()}${idProofFileExtension}`;
      await this.s3.send(
        new PutObjectCommand({
          Bucket: `${this.configService.get<string>('AWS_BUCKET_NAME')}`,
          Key: idProofS3FileName,
          Body: idProofFile.buffer,
          ContentType: idProofFile.mimetype,
        }),
      );
      const idProofFileUrl = `https://${this.configService.get<string>('AWS_BUCKET_NAME')}.s3.${this.configService.get<string>('AWS_REGION')}.amazonaws.com/${idProofS3FileName}`;
      // Prepare store data with uploaded file URLs
      let dataToStore = {
        store_name: storeDto.store_name,
        store_contact_number: storeDto.store_contact_number,
        store_contact_email: storeDto.store_contact_email,
        store_license_details: {
          licensed_by: storeDto.licensed_by,
          license_number: storeDto.license_number,
          licensed_country: storeDto.licensed_country,
          license_file_url: licenseFileUrl, // ✅ from S3 upload
          id_proof_file_url: idProofFileUrl, // ✅ from S3 upload
        },
        store_owner_id: storeDto.store_owner_id,
        address: storeDto.address,
        lat: storeDto.lat,
        log: storeDto.log,
      };
      await this.storeModel.create(dataToStore);
      return 'ok';
    } catch (error) {
      console.error('Error creating store:', error);
      return 'error';
    }
  }
  /**
   * function to get all the store in the platform
   */
  async getAllStores(store_owner_id: string): Promise<Array<StoreDto>> {
    return await this.storeModel.find({ store_owner_id: store_owner_id });
  }
}
