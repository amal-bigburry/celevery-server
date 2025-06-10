/**
 * Bigburry Hypersystems LLP - Proprietary Source Code
 * This file contains the StoreRepositoryImplimentation class, which provides a concrete implementation of the StoreRepository interface. It manages persistence and file storage operations related to store entities in the system. MongoDB is used for data persistence through Mongoose models, and AWS S3 is used for storing uploaded media assets such as license and ID proof documents.
 *
 * Section: Required Imports
 * The necessary packages for database interaction, file management, cloud storage integration, and exception handling are imported. Models are injected using NestJS's dependency injection and AWS S3 is configured for media upload functionality.
 */
import { ConfigService } from '@nestjs/config';
import { StoreRepository } from '../../../applicationLayer/interfaces/store.interfaces';
import { StoreDto } from '../../../../../common/dtos/store.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { extname } from 'path';
import { randomUUID } from 'crypto';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { CakeEntity } from 'src/modules/cakes/domainLayer/entities/cake.entity';
import { UpdateStoreDto } from 'src/common/dtos/udpate-store.dto';
import { updateObject } from 'src/common/utils/update-object.util';
/**
 * Bigburry Hypersystems LLP - StoreRepositoryImplimentation Class
 * Implements the methods required by the StoreRepository interface. This class handles storage and retrieval of store data, updating field values, fetching store-related cakes, and managing file uploads via AWS S3. All data manipulation is abstracted through Mongoose models, while error handling is performed with NestJS utilities.
 */
@Injectable()
export class StoreRepositoryImplimentation implements StoreRepository {
  private readonly s3: S3Client;
  constructor(
    private readonly configService: ConfigService,
    @InjectModel('Stores') private readonly storeModel: Model<StoreDto>,
    @InjectModel('Cakes') private readonly cakeModel: Model<CakeEntity>,
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
   * Bigburry Hypersystems LLP - Method: getAllStoreInPlatform
   * Retrieves all store records present in the platform, regardless of ownership.
   * Returns an array of StoreDto objects representing all stores.
   */
  async getAllStoreInPlatform(): Promise<Array<StoreDto>> {
    return await this.storeModel.find({});
  }
  /**
   * Bigburry Hypersystems LLP - Method: deleteStore
   * Placeholder method for deleting a store entity from the platform. This method is currently not implemented and will throw an exception if invoked.
   */
  async deleteStore(store_id: string): Promise<string> {
    await this.storeModel.findByIdAndDelete(store_id);
    return 'deleted';
  }
  /**
   * Bigburry Hypersystems LLP - Method: getStore
   * Retrieves a store record by its unique identifier. If the store exists in the database, it returns the StoreDto object. If not, it throws a BadRequestException indicating an invalid store identifier.
   */
  async getStore(store_id: string): Promise<StoreDto> {
    let stores = await this.storeModel.findById(store_id);
    if (stores) {
      return stores;
    } else {
      throw new BadRequestException('Invalid store id');
    }
  }
  /**
   * Bigburry Hypersystems LLP - Method: updateStore
   * Updates a single field value of a store entity. This method takes the store identifier, the field name, and the new value, and attempts to apply the update. Note: field-level validation or error handling is not applied here, and dynamic field access assumes the field exists on the model.
   */
  async updateStore(UpdateStoreDto: UpdateStoreDto, store_id:string): Promise<string> {
    let store = await this.storeModel.findById(store_id);
    if (store) {
      let updatedstore = updateObject(UpdateStoreDto, store)
      updatedstore.save();
      return updatedstore;
    }
    throw new BadRequestException('updation failed because store not found.');
  }
  /**
   * Bigburry Hypersystems LLP - Method: createStore
   * Handles the creation of a new store record. This method uploads the license and ID proof files to AWS S3, constructs their public URLs, then populates a new store object using values from the provided StoreDto and file URLs. The final data is inserted into the MongoDB store collection using the model’s create method.
   */
  async createStore(
    storeDto: StoreDto,
    vendor_details: object,
    licenseFile: Express.Multer.File,
    idProofFile: Express.Multer.File,
  ): Promise<string> {
    try {
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
      const kyc_document_url = `https://${this.configService.get<string>('AWS_BUCKET_NAME')}.s3.${this.configService.get<string>('AWS_REGION')}.amazonaws.com/${idProofS3FileName}`;
      storeDto.kyc_document_url = kyc_document_url;
      let dataToStore = {
        ...storeDto,
        store_name: storeDto.store_name,
        store_contact_number: storeDto.store_contact_number,
        store_contact_email: storeDto.store_contact_email,
        store_license_details: {
          licensed_by: storeDto.licensed_by,
          license_number: storeDto.license_number,
          licensed_country: storeDto.licensed_country,
          license_file_url: licenseFileUrl,
          kyc_document_url: kyc_document_url,
          kyc_document_number: storeDto.kyc_document_number,
          kyc_document_type: storeDto.kyc_document_type,
        },
        store_owner_id: storeDto.store_owner_id,
        address: storeDto.address,
        lat: storeDto.lat,
        log: storeDto.log,
      };
      // let store:{store_license_details: {kyc_document_url: string}, _id: string} = {};
      let store = await this.storeModel.create(dataToStore);
      vendor_details = {
        ...vendor_details,
        vendor_id: store._id,
      };
      // console.log(store);
      // submit vendor creation form
      try {
        // let vendor_details: object = {};
        const vendor = await axios.post(
          this.configService.get<string>('CASHFREE_API_URL') +
            `/easy-split/vendors`,
          vendor_details,
          {
            headers: {
              'Content-Type': 'application/json',
              'x-api-version': '2025-01-01',
              'x-client-id': `${this.configService.get<string>('CASHFREE_KEY_ID')}`,
              'x-client-secret': `${this.configService.get<string>('CASHFREE_SECRET_KEY')}`,
            },
          },
        );
        console.log('vendor created, uploading docs ');
        // console.log('vendor created', response.data);
        // upload vendor docs
        // Fetch the file from URL
        // const fileResponse = await fetch(storeDto.kyc_document_url);
        // const fileBlob = await fileResponse.blob();
        // const formData = new FormData();
        // formData.append('doc_type', storeDto.kyc_document_type);
        // formData.append('doc_value', storeDto.kyc_document_number);
        // formData.append('file', fileBlob, 'document.pdf'); // Add filename
        // const updatedVendor = await axios.post(
        //   this.configService.get<string>('CASHFREE_API_URL') +
        //     `/easy-split/vendor-docs/${store._id}`,
        //   formData,
        //   {
        //     headers: {
        //       'x-api-version': '2025-01-01',
        //       'x-client-id': this.configService.get<string>('CASHFREE_KEY_ID'),
        //       'x-client-secret': this.configService.get<string>(
        //         'CASHFREE_SECRET_KEY',
        //       ),
        //     },
        //   },
        // );
        // console.log('vendor updated', updatedVendor.data);
        // console.log('vendor created', response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('API Error:', error.response?.data || error.message);
        } else {
          console.error('Unexpected Error:', error);
        }
      }
      return 'ok';
    } catch (error) {
      console.error('Error creating store:', error);
      return 'error';
    }
  }
  /**
   * Bigburry Hypersystems LLP - Method: getAllStores
   * Retrieves all stores associated with a given store_owner_id. This method executes a MongoDB query using the injected model and returns an array of matching store records.
   */
  async getAllStores(store_owner_id: string): Promise<Array<StoreDto>> {
    return await this.storeModel.find({ store_owner_id: store_owner_id });
  }
}
