/**
 * import the required packages
 */
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FindCakeUseCase } from '../../applicationLayer/use-cases/findcake.usecase';
import { CreateCakeUseCase } from '../../applicationLayer/use-cases/createcake.usecase';
import { CakeDto } from '../../dtos/cake.dto';
import { JwtAuthGuard } from 'src/middlewares/jwtauth.middleware';
import { SearchForCakesUseCase } from '../../applicationLayer/use-cases/searchcakes.usecase';
import { FilesInterceptor } from '@nestjs/platform-express';
import { GetCakeDetailsUseCase } from '../../applicationLayer/use-cases/GetCakeDetailsUseCase';
import { GetSimilarCakesUseCase } from '../../applicationLayer/use-cases/GetSimilarCakes.usecase';
/**
 * Handles the requests comming to the cakes endpoint
 */
@Controller('cakes')
export class CakeController {
  constructor(
    private readonly findCakeUseCase: FindCakeUseCase,
    private readonly createCakeUseCase: CreateCakeUseCase,
    private readonly searchForCakesUseCase: SearchForCakesUseCase,
    private readonly getCakeDetailsUseCase: GetCakeDetailsUseCase,
    private readonly getSimilarCakesUseCase: GetSimilarCakesUseCase,
  ) {}
  /**
   * Handles the cakes comming get request to the cakes endpoint
   */
  @Get()
  @UseGuards(JwtAuthGuard)
  async get_all_cakes(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('log') log = 0,
    @Query('lat') lat = 0,
  ) {
    return this.findCakeUseCase.execute(page, limit, log, lat);
  }
  /**
   * handle post requests
   */
  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('images', 5))
  async create_cake(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() cakeDto: CakeDto,
  ) {
    console.log(cakeDto);
    if (!files || files.length === 0) {
      throw new BadRequestException(
        'At least one image file (images) is required!',
      );
    }
    // return ""
    return this.createCakeUseCase.execute(cakeDto, files);
  }
  /**
   * handle cakes/search endpoint
   */
  @Get('search')
  @UseGuards(JwtAuthGuard)
  async searchCakes(
    @Query('keyword') keyword: string,
    @Query('category_id') category_id: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('log') log = 0,
  ) {
    return this.searchForCakesUseCase.execute(keyword, category_id);
  }
  /**
   * handles cakes/similar_cakes endpoint
   */
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
   * handles cakes:423423443 endpoint
   */
  @Get(':cake_id')
  @UseGuards(JwtAuthGuard)
  async getCakeDetails(@Param('cake_id') cake_id: string) {
    console.log('here ',cake_id)
    return this.getCakeDetailsUseCase.execute(cake_id);
  }
}
