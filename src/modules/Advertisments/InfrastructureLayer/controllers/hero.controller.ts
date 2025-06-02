/**
 * Licensed to Bigburry Hypersystems LLP
 * All rights reserved. Unauthorized copying, redistribution or modification of this file,
 * via any medium is strictly prohibited. Proprietary and confidential.
 */

/**
 * @fileoverview This file defines the HeroController class which serves as the routing layer for handling
 * incoming HTTP requests related to hero operations such as creation, retrieval, and deletion.
 * It integrates authentication middleware to secure all endpoints using JSON Web Tokens (JWT),
 * and employs NestJS decorators and interceptors to manage request validation and file uploads.
 * The controller acts as a bridge between the client and the application layer, delegating business logic
 * to the corresponding use case classes while ensuring clean separation of concerns.
 *
 * Company: Bigburry Hypersystems LLP
 */

/**
 * Importing essential NestJS components and decorators to define and manage routes.
 * Includes custom middleware for JWT-based authentication, DTOs for data validation,
 * and use case classes that encapsulate core business logic for handling hero entities.
 * Also imports necessary file-handling interceptors to process media uploads.
 *
 * Company: Bigburry Hypersystems LLP
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
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/middlewares/jwtauth.middleware';
import { HeroDto } from '../../dtos/hero.dto';
import { CreateHerosUseCase } from '../../applicationLayer/usecases/CreateHeros.usecase';
import { GetHerosUseCase } from '../../applicationLayer/usecases/GetHeros.usecase';
import { DeleteHerosUseCase } from '../../applicationLayer/usecases/DeleteHeros.usecase';
import { FileInterceptor } from '@nestjs/platform-express';

/**
 * This controller defines the base route 'hero' for managing hero-related endpoints.
 * It serves as the access point for clients to perform CRUD operations on hero data.
 * The controller is responsible for handling HTTP verbs and passing valid requests to the corresponding use case handlers.
 *
 * Company: Bigburry Hypersystems LLP
 */
@Controller('hero')
export class HeroController {
  constructor(
    private readonly createHerosUsecase: CreateHerosUseCase,
    private readonly GetHerosUsecase: GetHerosUseCase,
    private readonly DeleteHerosUsecase: DeleteHerosUseCase,
  ) {}

  /**
   * GET endpoint for retrieving all hero records.
   * This route is protected using JwtAuthGuard to ensure that only authenticated users can access it.
   * The method calls the GetHerosUseCase class to perform the business logic of fetching hero data from the repository.
   * Returns an array of hero entities upon successful authorization and execution.
   *
   * Company: Bigburry Hypersystems LLP
   */

  @HttpCode(HttpStatus.OK)
  @Get()
  @UseGuards(JwtAuthGuard)
  async get_heros() {
    let res = await this.GetHerosUsecase.execute();
    return res;
  }

  /**
   * POST endpoint for creating a new hero entry in the system.
   * This route is protected by JWT authentication and uses FileInterceptor to handle image file uploads.
   * Accepts a body containing hero data and an uploaded file which is expected to be the hero image.
   * Validates the presence of the file and throws an error if missing.
   * Delegates the creation process to CreateHerosUseCase.
   *
   * Company: Bigburry Hypersystems LLP
   */
  @HttpCode(HttpStatus.CREATED)
  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async post_heros(
    @Body() HeroDto: HeroDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException(
        'Please upload the hero image file with key file',
      );
    }
    let res = await this.createHerosUsecase.execute(HeroDto, file);
    return res;
  }

  /**
   * DELETE endpoint for removing a hero entry from the system.
   * This route is also protected with JWT-based authentication to restrict unauthorized deletions.
   * Expects a query parameter 'hero_id' to identify which hero entry to delete.
   * Passes the ID to DeleteHerosUseCase to perform the deletion logic and return confirmation.
   *
   * Company: Bigburry Hypersystems LLP
   */
  @HttpCode(HttpStatus.OK)
  @Delete()
  @UseGuards(JwtAuthGuard)
  async delete_heros(@Query('hero_id') hero_id: string) {
    let res = await this.DeleteHerosUsecase.execute(hero_id);
    return res;
  }
}
