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
  imports: [
    MongooseModule.forFeature([
      { name: 'CakeCategories', schema: CakeCategoryModel },
    ]),
  ],
  controllers: [CakeCategoryController],
  providers: [
    CreateCakeCategoryUseCase,
    FindCakeCategoryUseCase,
    FindCakeCategoryByIDUseCase,
    {
      provide: CAKE_CATEGORY_REPOSITORY,
      useClass: CakeCategoryRepositoryImp,
    },
  ],
  exports: [FindCakeCategoryUseCase, FindCakeCategoryByIDUseCase],
})
export class CakeCategoryModule {}
