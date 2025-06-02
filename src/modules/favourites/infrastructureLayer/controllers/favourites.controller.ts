/**
 * © Bigburry Hypersystems LLP. All rights reserved.
 * This source code is confidential and intended only for internal use.
 * Unauthorized copying, modification, distribution, or disclosure is prohibited.
 */
/**
 * importing the required packages
 */
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Delete,
  BadRequestException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthRequest } from 'src/middlewares/AuthRequest';
import { AddToFavouritesUsecase } from '../../applicationLayer/usecases/AddToFavourites.usecase';
import { GetMyFavouritesUsecase } from '../../applicationLayer/usecases/GetMyFavourites.usecase';
import { RemoveMyFavouritesUsecase } from '../../applicationLayer/usecases/RemoveMyFavourites.usecase';
import { JwtAuthGuard } from 'src/middlewares/jwtauth.middleware';
import { Types } from 'mongoose';
/**
 * controller to handle the pop request
 */
@Controller('favourites')
export class FavouritesController {
  constructor(
    private readonly AddToFavouritesUsecase: AddToFavouritesUsecase,
    private readonly GetMyFavouritesUsecase: GetMyFavouritesUsecase,
    private readonly RemoveMyFavouritesUsecase: RemoveMyFavouritesUsecase,
  ) {}
  /**
   * post request to send message
   */

  @HttpCode(HttpStatus.CREATED)
  @Post()
  @UseGuards(JwtAuthGuard)
  async add_to_favourites(
    @Body() cake_id: { cake_id: string },
    @Req() request: AuthRequest,
  ) {
    if (!cake_id) {
      throw new BadRequestException('Body needs cake_id');
    }
    const isValidObjectId = Types.ObjectId.isValid(cake_id.cake_id);
    if (!isValidObjectId) {
      throw new BadRequestException('Invalid MongoDB ObjectId');
    }
    await this.AddToFavouritesUsecase.execute(
      request.user['userId'],
      cake_id.cake_id,
    );
    return 'added';
  }
  /**
   * post request to send message
   */

  @HttpCode(HttpStatus.OK)
  @Get()
  @UseGuards(JwtAuthGuard)
  async get_favourites(@Body() cake_id: string, @Req() request: AuthRequest) {
    let res = await this.GetMyFavouritesUsecase.execute(request.user['userId']);
    return res;
  }
  /**
   * post request to send message
   */

  @HttpCode(HttpStatus.OK)
  @Delete()
  @UseGuards(JwtAuthGuard)
  async delete_favourites(
    @Body() cake: { cake_id: string },
    @Req() request: AuthRequest,
  ) {
    let res = await this.RemoveMyFavouritesUsecase.execute(
      request.user['userId'],
      cake.cake_id,
    );
    return res;
  }
}
