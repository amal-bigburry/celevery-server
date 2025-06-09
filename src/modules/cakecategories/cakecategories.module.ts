/*
 * Company License: Bigburry Hypersystems LLP
 * All rights reserved © Bigburry Hypersystems LLP
 */
/**
 * Importing the required packages and modules
 */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CakeCategoryController } from './infrastructureLayer/controllers/cake-category.controller';
import { CakeCategoryRepositoryImp } from './infrastructureLayer/implimentations/cake-category.implimentation';
import { CakeCategoryModel } from './infrastructureLayer/models/cakecategory.model';
import { FindCakeCategoryUseCase } from './applicationLayer/use-cases/get-all-cake-category.usecase';
import { CreateCakeCategoryUseCase } from './applicationLayer/use-cases/create-cake-category.usecase';
import { CAKE_CATEGORY_REPOSITORY } from './tokens/cakeCategoryRepository.token';
import { FindCakeCategoryByIDUseCase } from './applicationLayer/use-cases/find-category-by-id.usecase';
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
