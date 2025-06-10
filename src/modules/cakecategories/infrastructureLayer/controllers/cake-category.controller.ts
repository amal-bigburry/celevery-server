/**
 * importing all the required packages
 */
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FindCakeCategoryUseCase } from '../../applicationLayer/use-cases/get-all-cake-category.usecase';
import { CreateCakeCategoryUseCase } from '../../applicationLayer/use-cases/create-cake-category.usecase';
import { CakeCategoryDto } from '../../../../common/dtos/cakecategory.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/middlewares/jwtauth.middleware';
/**
 * Main route /cakecategories
 */
@Controller('cakecategories')
export class CakeCategoryController {
  constructor(
    private readonly findCakeCategoryUseCase: FindCakeCategoryUseCase,
    private readonly createCakeCategoryUseCase: CreateCakeCategoryUseCase,
  ) {}
  /**
   * route get request to /cakecategories
   */
  @HttpCode(HttpStatus.OK)
  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllCakes(@Query('page') page = 1, @Query('limit') limit = 10) {
    let data = await this.findCakeCategoryUseCase.execute();
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
   * route post request to /cakecategories
   */
  @HttpCode(HttpStatus.CREATED)
  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  createCakeCategory(
    @Body() cakeCategoryDto: CakeCategoryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('An image file is required!');
    }
    return this.createCakeCategoryUseCase.execute(cakeCategoryDto, file);
  }
}
