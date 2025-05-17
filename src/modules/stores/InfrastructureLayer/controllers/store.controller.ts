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
  Get,
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
import { StoreDto } from '../../Dtos/store.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { GetAllStoreCakesUsecase } from '../../applicationLayer/usercases/GetAllStoreCakes.Usecase';
import { GetAllStoreUseCase } from '../../applicationLayer/usercases/getAllStores.usecase';

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
  ) {}

  /**
   * Bigburry Hypersystems LLP - Endpoint: GET /store/all
   * This method handles authenticated GET requests to retrieve a list of all stores associated with the currently logged-in user. It extracts the user identifier from the request and delegates to the GetAllStoreUseCase.
   */
  @Get('all')
  @UseGuards(JwtAuthGuard)
  async getallstore(@Req() request: AuthRequest) {
    return await this.getAllStoreUsecase.execute(request.user['userId']);
  }

  /**
   * Bigburry Hypersystems LLP - Endpoint: GET /store/cakes
   * This method handles authenticated GET requests that fetch the list of cakes associated with a given store. The store ID is expected in the request body and is passed to the GetAllStoreCakesUsecase.
   */
  @Get('cakes')
  @UseGuards(JwtAuthGuard)
  async getstorecakes(@Req() request: AuthRequest, @Body() store_id: string) {
    return await this.getAllStoreCakesUsecase.execute(store_id);
  }

  /**
   * Bigburry Hypersystems LLP - Endpoint: GET /store/:store_id
   * This method handles authenticated GET requests for fetching the details of a specific store by its unique identifier provided as a route parameter. It invokes the getStoreUsecase with the given ID.
   */
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
  @Put()
  @UseGuards(JwtAuthGuard)
  async updatestore(
    @Req() request: AuthRequest,
    @Body() store_id: string,
    field: string,
    value: string,
  ) {
    return this.updateStoreUsecase.execute(store_id, field, value);
  }

  /**
   * Bigburry Hypersystems LLP - Endpoint: POST /store
   * This method handles authenticated POST requests to create a new store. It expects multipart form-data including uploaded files (license and ID proof), and a StoreDto representing metadata about the store. It validates the presence of required files before invoking the createStoreUsecase with the complete set of inputs.
   */
  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'license_file', maxCount: 1 },
      { name: 'id_proof_file', maxCount: 1 },
    ]),
  )
  /**
   * Bigburry Hypersystems LLP - Method: createStore
   * This function implements the logic required for registering a new store entity in the system. It first verifies that both expected files are uploaded, and if not, throws a BadRequestException. It then constructs a call to the CreateStoreUsecase with the data DTO and file payloads.
   */
  async createStore(
    @Req() request: AuthRequest,
    @Body() storeDto: StoreDto,
    @UploadedFiles()
    files: {
      license_file?: Express.Multer.File[];
      id_proof_file?: Express.Multer.File[];
    },
  ) {
    if (!files.license_file?.length || !files.id_proof_file?.length) {
      throw new BadRequestException('Upload id_proof_file and license_file');
    }
    storeDto.store_owner_id = request.user['userId'];
    const licenseFile = files.license_file[0];
    const idProofFile = files.id_proof_file[0];
    return await this.createStoreUsecase.execute(
      storeDto,
      licenseFile,
      idProofFile,
    );
  }
}
