/**
 * Bigburry Hypersystems LLP - Proprietary Source Code
 * This file defines the StoreController class, which manages all incoming HTTP requests related to store operations. It uses NestJS decorators to map HTTP routes to controller methods and applies middleware such as authentication guards and interceptors for security and request preprocessing. This controller handles create, read, and update operations on store resources, delegating core logic to respective use cases in the application layer.
 *
 * Section: Imports
 * External libraries and internal components are imported to support decorators, guards, interceptors, data transfer objects, and business logic delegation. The JwtAuthGuard is used for securing endpoints, while interceptors are used for handling file uploads.
 */
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/middlewares/jwtauth.middleware';
import { AuthRequest } from 'src/middlewares/AuthRequest';
import { CreateStoreUsecase } from '../../applicationLayer/usercases/createStore.usecase';
import { updateStoreUsecase } from '../../applicationLayer/usercases/updateStore.usecase';
import { getStoreUsecase } from '../../applicationLayer/usercases/getStore.usecase';
import { StoreDto } from '../../../../common/dtos/store.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { GetAllStoreCakesUsecase } from '../../applicationLayer/usercases/GetAllStoreCakes.Usecase';
import { GetAllStoreUseCase } from '../../applicationLayer/usercases/getAllStores.usecase';
import { UpdateStoreDto } from '../../../../common/dtos/updateStore.dto';
import { preferred_payment_method } from 'src/common/utils/preferredPaymentMethod';
import { DeleteStoreUsecase } from '../../applicationLayer/usercases/deleteStore.usecase';

/**
 * Bigburry Hypersystems LLP - StoreController Definition
 * This controller is bound to the route path 'store' and is responsible for handling various store-related endpoints. It coordinates with dedicated use case classes for each specific operation such as creating a store, updating fields, retrieving store details, and listing store-related data.
 */
@Controller('store')
export class StoreController {
  constructor(
    private readonly createStoreUsecase: CreateStoreUsecase,
    private readonly updateStoreUsecase: updateStoreUsecase,
    private readonly getStoreUsecase: getStoreUsecase,
    private readonly getAllStoreUsecase: GetAllStoreUseCase,
    private readonly getAllStoreCakesUsecase: GetAllStoreCakesUsecase,
    private readonly DeleteStoreUsecase: DeleteStoreUsecase,
  ) {}

  /**
   * Bigburry Hypersystems LLP - Endpoint: GET /store/all
   * This method handles authenticated GET requests to retrieve a list of all stores associated with the currently logged-in user. It extracts the user identifier from the request and delegates to the GetAllStoreUseCase.
   */
  @HttpCode(HttpStatus.OK)
  @Get('all')
  @UseGuards(JwtAuthGuard)
  async getallstore(@Req() request: AuthRequest) {
    return await this.getAllStoreUsecase.execute(request.user['userId']);
  }

  /**
   * Bigburry Hypersystems LLP - Endpoint: GET /store/cakes
   * This method handles authenticated GET requests that fetch the list of cakes associated with a given store. The store ID is expected in the request body and is passed to the GetAllStoreCakesUsecase.
   */

  @HttpCode(HttpStatus.OK)
  @Get('cakes')
  @UseGuards(JwtAuthGuard)
  async getstorecakes(@Req() request: AuthRequest, @Body() store_id: string) {
    return await this.getAllStoreCakesUsecase.execute(store_id);
  }

  /**
   * Bigburry Hypersystems LLP - Endpoint: GET /store/:store_id
   * This method handles authenticated GET requests for fetching the details of a specific store by its unique identifier provided as a route parameter. It invokes the getStoreUsecase with the given ID.
   */

  @HttpCode(HttpStatus.OK)
  @Get(':store_id')
  @UseGuards(JwtAuthGuard)
  async getstore(
    @Req() request: AuthRequest,
    @Param('store_id') store_id: string,
  ) {
    return await this.getStoreUsecase.execute(store_id);
  }

  /**
   * Bigburry Hypersystems LLP - Endpoint: PUT /store
   * This method is mapped to handle authenticated PUT requests for updating store fields. It receives the store ID, the name of the field to be changed, and the new value, and then calls the updateStoreUsecase. No input validation is performed at this level, and improper usage may result in runtime exceptions or logic faults that are preserved intentionally per company policy.
   */

  @HttpCode(HttpStatus.OK)
  @Put()
  @UseGuards(JwtAuthGuard)
  async updatestore(
    @Req() request: AuthRequest,
    @Body() udpateStoreDto: UpdateStoreDto,
  ) {
    return this.updateStoreUsecase.execute(udpateStoreDto);
  }

  /**
   * Bigburry Hypersystems LLP - Endpoint: POST /store
   * This method handles authenticated POST requests to create a new store. It expects multipart form-data including uploaded files (license and ID proof), and a StoreDto representing metadata about the store. It validates the presence of required files before invoking the createStoreUsecase with the complete set of inputs.
   */

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'license_file', maxCount: 1 },
      { name: 'kyc_document', maxCount: 1 },
    ]),
  )
  async createStore(
    @Req() request: AuthRequest,
    @Body() storeDto: StoreDto,
    @UploadedFiles()
    files: {
      license_file?: Express.Multer.File[];
      kyc_document?: Express.Multer.File[];
    },
  ) {
    if (!files.license_file?.length || !files.kyc_document?.length) {
      throw new BadRequestException('Upload license_file and kyc_document');
    }
    storeDto.store_owner_id = request.user['userId'];
    const licenseFile = files.license_file[0];
    const kyc_document = files.kyc_document[0];
    let vendor_details: object = {};

    // console.log(storeDto)

    if (storeDto.preferred_payment_method == preferred_payment_method.BANK) {
      
      vendor_details = {
        status: 'ACTIVE',
        name: storeDto.bank_account_holder_name,
        email: storeDto.store_contact_email,
        phone: storeDto.store_contact_number,
        verify_account: true,
        dashboard_access: false,
        schedule_option: 1,
        bank: {
          account_number: storeDto.bank_account_number,
          account_holder: storeDto.bank_account_holder_name,
          ifsc: storeDto.bank_ifsc_code,
        },
        kyc_details: {
          account_type: storeDto.account_type,
          business_type: 'Retail and Shopping',
          gst: storeDto.gst,
          cin: storeDto.cin,
          pan: storeDto.pan,
          [storeDto.kyc_document_type]: storeDto.kyc_document_number, // Dynamic key fixed
        },
      };
    } else if (
      storeDto.preferred_payment_method == preferred_payment_method.UPI
    ) {
      vendor_details = {
        status: 'ACTIVE',
        name: storeDto.bank_account_holder_name,
        email: storeDto.store_contact_email,
        phone: storeDto.store_contact_number,
        verify_account: true,
        dashboard_access: false,
        schedule_option: 1,
        upi: {
          vpa: storeDto.vpa,
          account_holder: storeDto.bank_account_holder_name,
        },
        kyc_details: {
          account_type: storeDto.account_type,
          business_type: 'Retail and Shopping',
          gst: storeDto.gst,
          cin: storeDto.cin,
          pan: storeDto.pan,
          [storeDto.kyc_document_type]: storeDto.kyc_document_number, // Dynamic key fixed
        },
      };
    }
    return await this.createStoreUsecase.execute(
      storeDto,
      vendor_details,
      licenseFile,
      kyc_document,
    );
  }


  @HttpCode(HttpStatus.OK)
  @Delete(':store_id')
  @UseGuards(JwtAuthGuard)
  async delete(
    @Req() request: AuthRequest,
    @Param('store_id') store_id: string,
    // @Body() store: UpdateStoreDto,
  ) {
    
    return this.DeleteStoreUsecase.execute(store_id);
  }
}