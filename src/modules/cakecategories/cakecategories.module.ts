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
import { CakeCategoryModel } from '../../common/databaseModels/cake-category.model';
import { FindCakeCategoryUseCase } from './applicationLayer/use-cases/get-all-cake-category.usecase';
import { CreateCakeCategoryUseCase } from './applicationLayer/use-cases/create-cake-category.usecase';
import { CAKECATEGORYINTERFACETOKEN } from './tokens/cakeCategoryRepository.token';
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
      provide: CAKECATEGORYINTERFACETOKEN,
      useClass: CakeCategoryRepositoryImp,
    },
  ],
  exports: [
    FindCakeCategoryUseCase,
    FindCakeCategoryByIDUseCase,
    CAKECATEGORYINTERFACETOKEN,
  ],
})
export class CakeCategoryModule {}
