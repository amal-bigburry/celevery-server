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
  Put,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FindCakeUseCase } from '../../applicationLayer/use-cases/find-cake.usecase';
import { CreateCakeUseCase } from '../../applicationLayer/use-cases/create-cake.usecase';
import { CakeDto } from '../../../../common/dtos/cake.dto';
import { JwtAuthGuard } from 'src/middlewares/jwtauth.middleware';
import { SearchForCakesUseCase } from '../../applicationLayer/use-cases/search-cakes.usecase';
import { FilesInterceptor } from '@nestjs/platform-express';
import { GetCakeDetailsUseCase } from '../../applicationLayer/use-cases/get-cake-details.usecase';
import { GetSimilarCakesUseCase } from '../../applicationLayer/use-cases/get-similar-cakes.usecase';
import { AuthRequest } from 'src/middlewares/AuthRequest';
import { GetCakesInStoreUsecase } from '../../applicationLayer/use-cases/get-cakes-in-store.usecase';
import { UpdateCakeDetailsUseCase } from '../../applicationLayer/use-cases/update-cake-detail.usecase';
import { UpdateCakeDto } from 'src/common/dtos/updateCake.dto';
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
    private readonly updateCakeDetailsUseCase: UpdateCakeDetailsUseCase,
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
    @Query('category_id') category_id:string,
    @Req() req:AuthRequest
  ) {
    let data = await this.findCakeUseCase.execute(log, lat, knownfor, sortby, orderby,category_id,req.user['userId']);
     // pagination logic
    const total = data.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedData = data.slice(start, end);
    return {
      data: paginatedData,
      total,
      page,
      limit,
      totalPages,
    };
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
    @Req() req:AuthRequest
  ) {
    let user_id = req.user['userId']
    let data = await this.searchForCakesUseCase.execute(keyword, category_id, log, lat,user_id);
     // pagination logic
    const total = data.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedData = data.slice(start, end);
    return {
      data: paginatedData,
      total,
      page,
      limit,
      totalPages,
    };
  }


  @HttpCode(HttpStatus.OK)
  @Get('cakesinstore')
  @UseGuards(JwtAuthGuard)
  async storecakes(
    @Query('store_id') store_id: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    let data = await this.getCakesInStoreUsecase.execute(store_id);
     // pagination logic
    const total = data.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedData = data.slice(start, end);
    return {
      data: paginatedData,
      total,
      page,
      limit,
      totalPages,
    };
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
  ) {
    let data = await this.getSimilarCakesUseCase.execute(cake_id, variant_id);
     // pagination logic
    const total = data.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedData = data.slice(start, end);
    return {
      data: paginatedData,
      total,
      page,
      limit,
      totalPages,
    };
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
  } /**
   * Handles GET request to fetch details of a specific cake by ID
   */
  @HttpCode(HttpStatus.OK)
  @Put(':cake_id')
  @UseGuards(JwtAuthGuard)
  async updateCakeDetails(@Param('cake_id') cake_id: string, @Body() updatecakedto: UpdateCakeDto) {
    // console.log(updatecakedto)
    // console.log('here ', cake_id);
    return this.updateCakeDetailsUseCase.execute(cake_id,updatecakedto);
  }
}
