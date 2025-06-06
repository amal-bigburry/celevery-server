/*
 * Company License: Bigburry Hypersystems LLP
 * All rights reserved © Bigburry Hypersystems LLP
 */
/**
 * Importing required packages and modules
 */
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FindCakeUseCase } from '../../applicationLayer/use-cases/findcake.usecase';
import { CreateCakeUseCase } from '../../applicationLayer/use-cases/createcake.usecase';
import { CakeDto } from '../../../../common/dtos/cake.dto';
import { JwtAuthGuard } from 'src/middlewares/jwtauth.middleware';
import { SearchForCakesUseCase } from '../../applicationLayer/use-cases/searchcakes.usecase';
import { FilesInterceptor } from '@nestjs/platform-express';
import { GetCakeDetailsUseCase } from '../../applicationLayer/use-cases/GetCakeDetailsUseCase';
import { GetSimilarCakesUseCase } from '../../applicationLayer/use-cases/GetSimilarCakes.usecase';
import { AuthRequest } from 'src/middlewares/AuthRequest';
import { GetCakesInStoreUsecase } from '../../applicationLayer/use-cases/getCakesInStore.usecase';
/**
 * Controller handling HTTP requests related to cakes
 */
@Controller('cakes')
export class CakeController {
  constructor(
    private readonly findCakeUseCase: FindCakeUseCase,
    private readonly createCakeUseCase: CreateCakeUseCase,
    private readonly searchForCakesUseCase: SearchForCakesUseCase,
    private readonly getCakeDetailsUseCase: GetCakeDetailsUseCase,
    private readonly getSimilarCakesUseCase: GetSimilarCakesUseCase,
    private readonly getCakesInStoreUsecase: GetCakesInStoreUsecase,
  ) {}
  /**
   * Handles GET requests to fetch cakes with pagination and location filters
   */
  @Get()
  @UseGuards(JwtAuthGuard)
  async get_all_cakes(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('log') log = 0,
    @Query('lat') lat = 0,
    @Query('knownfor') knownfor:string[] = [],
    @Query('sortby') sortby:string,
    @Query('orderby') orderby:string,
  ) {
    return this.findCakeUseCase.execute(page, limit, log, lat, knownfor, sortby, orderby);
  }
  /**
   * Handles POST requests to create a new cake with image uploads
   */
  @HttpCode(HttpStatus.CREATED)
  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('images', 5))
  async create_cake(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() cakeDto: CakeDto,
    @Req() request: AuthRequest,
  ) {
    // console.log(cakeDto);
    if (!files || files.length === 0) {
      throw new BadRequestException(
        'At least one image file (images) is required!',
      );
    }
    // console.log('files',files)
    return this.createCakeUseCase.execute(
      cakeDto,
      files,
      request.user['userId'],
    );
  }
  /**
   * Handles GET requests to search cakes by keyword and category
   */
  @HttpCode(HttpStatus.OK)
  @Get('search')
  @UseGuards(JwtAuthGuard)
  async searchCakes(
    @Query('keyword') keyword: string,
    @Query('category_id') category_id: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('log') log = 0,
    @Query('lat') lat = 0,
  ) {
    return this.searchForCakesUseCase.execute(keyword, category_id, log, lat);
  }

  @HttpCode(HttpStatus.OK)
  @Get('cakesinstore')
  @UseGuards(JwtAuthGuard)
  async storecakes(
    @Query('store_id') store_id: string,
  ) {
    return this.getCakesInStoreUsecase.execute(store_id);
  }
  /**
   * Handles GET requests to fetch similar cakes by cake and variant IDs
   */
  @HttpCode(HttpStatus.OK)
  @Get('similar_cakes')
  async get_other_sellers(
    @Query('cake_id') cake_id: string,
    @Query('variant_id') variant_id: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('log') log = 0,
  ) {
    return this.getSimilarCakesUseCase.execute(cake_id, variant_id);
  }
  /**
   * Handles GET request to fetch details of a specific cake by ID
   */
  @HttpCode(HttpStatus.OK)
  @Get(':cake_id')
  @UseGuards(JwtAuthGuard)
  async getCakeDetails(@Param('cake_id') cake_id: string) {
    // console.log('here ', cake_id);
    return this.getCakeDetailsUseCase.execute(cake_id);
  }
}
