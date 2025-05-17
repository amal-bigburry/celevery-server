/**
 * importing the required pakcages
 */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CakeCategoryController } from './infrastructureLayer/controllers/cakecategory.controller';
import { CakeCategoryRepositoryImp } from './infrastructureLayer/repositories/cakecategory.repository.imp';
import { CakeCategoryModel } from './applicationLayer/models/cakecategory.model';
import { FindCakeCategoryUseCase } from './applicationLayer/use-cases/getallcakecategory.usecase';
import { CreateCakeCategoryUseCase } from './applicationLayer/use-cases/createcakecategory.usecase';
import { CAKE_CATEGORY_REPOSITORY } from './applicationLayer/tokens/cakeCategoryRepository.token';
import { FindCakeCategoryByIDUseCase } from './applicationLayer/use-cases/findcategorybyid.usecase';
/**
 * Module
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
      provide: CAKE_CATEGORY_REPOSITORY, // string token for interface
      useClass: CakeCategoryRepositoryImp,
    },
  ],
  exports:[FindCakeCategoryUseCase, FindCakeCategoryByIDUseCase]
})
export class CakeCategoryModule {}
