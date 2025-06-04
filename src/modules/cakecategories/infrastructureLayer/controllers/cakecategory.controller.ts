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
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FindCakeCategoryUseCase } from '../../applicationLayer/use-cases/getallcakecategory.usecase';
import { CreateCakeCategoryUseCase } from '../../applicationLayer/use-cases/createcakecategory.usecase';
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
  getAllCakes() {
    return this.findCakeCategoryUseCase.execute();
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
