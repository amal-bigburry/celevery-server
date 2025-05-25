/*
 * Company License: Bigburry Hypersystems LLP
 * All rights reserved © Bigburry Hypersystems LLP
 */
/**
 * Importing the required packages and modules
 */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CakeCategoryController } from './infrastructureLayer/controllers/cakecategory.controller';
import { CakeCategoryRepositoryImp } from './infrastructureLayer/implimentations/cakecategory.repository.imp';
import { CakeCategoryModel } from './infrastructureLayer/models/cakecategory.model';
import { FindCakeCategoryUseCase } from './applicationLayer/use-cases/getallcakecategory.usecase';
import { CreateCakeCategoryUseCase } from './applicationLayer/use-cases/createcakecategory.usecase';
import { CAKE_CATEGORY_REPOSITORY } from './tokens/cakeCategoryRepository.token';
import { FindCakeCategoryByIDUseCase } from './applicationLayer/use-cases/findcategorybyid.usecase';
/**
 * Defines the CakeCategoryModule which organizes controllers, providers, and imports
 */
@Module({
  /**
   * Imports Mongoose schema for cake categories
   */
  imports: [
    MongooseModule.forFeature([
      { name: 'CakeCategories', schema: CakeCategoryModel },
    ]),
  ],
  /**
   * Declares the controller responsible for handling cake category HTTP requests
   */
  controllers: [CakeCategoryController],
  /**
   * Provides the use cases and repository implementation for dependency injection
   */
  providers: [
    CreateCakeCategoryUseCase,
    FindCakeCategoryUseCase,
    FindCakeCategoryByIDUseCase,
    {
      provide: CAKE_CATEGORY_REPOSITORY, // string token for interface
      useClass: CakeCategoryRepositoryImp,
    },
  ],
  /**
   * Exports specific use cases for use in other modules
   */
  exports: [FindCakeCategoryUseCase, FindCakeCategoryByIDUseCase],
})
export class CakeCategoryModule {}
