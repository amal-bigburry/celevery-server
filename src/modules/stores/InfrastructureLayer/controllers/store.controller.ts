/**
 * importing the required packages
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
 * controller to mange store routes
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
   * get request at all endpoint
   */
  @Get('all')
  @UseGuards(JwtAuthGuard)
  async getallstore(@Req() request: AuthRequest) {
    return await this.getAllStoreUsecase.execute(request.user['userId']);
  }
  /**
   * get request to handle the cakes endpoints
   */
  @Get('cakes')
  @UseGuards(JwtAuthGuard)
  async getstorecakes(@Req() request: AuthRequest, @Body() store_id: string) {
    return await this.getAllStoreCakesUsecase.execute(store_id);
  }
  /**
   * get request with store id at route
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
   * handle the put frequest in the platfrom
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
   * handles the post request in the platform
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
   * functio to create the store in the platform
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
