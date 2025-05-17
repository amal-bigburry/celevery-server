/**
 * importing the required packages 
 */
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CakeSchema } from './applicationLayer/repositories/cake.schema';
import { CakeRepositoryImp } from './infrastructureLayer/repositories/cake.repository.imp';
import { CakeController } from './infrastructureLayer/controllers/cake.controller';
import { CreateCakeUseCase } from './applicationLayer/use-cases/createcake.usecase';
import { FindCakeUseCase } from './applicationLayer/use-cases/findcake.usecase';
import { CakeCategoryModel } from '../cakecategories/applicationLayer/models/cakecategory.model';
import { SearchForCakesUseCase } from './applicationLayer/use-cases/searchcakes.usecase';
import { MulterModule } from '@nestjs/platform-express';
import { GetCakeDetailsUseCase } from './applicationLayer/use-cases/GetCakeDetailsUseCase';
import { GetSimilarCakesUseCase } from './applicationLayer/use-cases/GetSimilarCakes.usecase';
import { StoreModel } from '../stores/applicationLayer/repositories/store.schema';
import { CAKE_REPOSITORY } from './applicationLayer/tokens/cakeRepository.token';
import { CAKE_CATEGORY_REPOSITORY } from './applicationLayer/tokens/cakeCategoryRepository.token';
import { CakecategoryRepositoryImp } from './infrastructureLayer/ExternalImplimentations/CakecategoryRepositoty.implimentations';
import { GETSTORE } from './applicationLayer/tokens/getstoreusecase.token';
import { GetStoreUsecaseImp } from './infrastructureLayer/ExternalImplimentations/Getstoreusecase.implimentation';
import { I_GET_CAKE_DETAILS_USECASE } from './applicationLayer/tokens/getcakedetailsusecase';
import { IGetCakeDetailsUseCaseImp } from '../orders/infrastructureLayer/ExternalUseCaseImplimentation/GetCakeDetailsUseCase.implimentation';
import { StoreModule } from '../stores/store.module';
import { CakeCategoryModule } from '../cakecategories/cakecategories.module';
import { UpdateKnownFor } from './applicationLayer/use-cases/UpdateKnownFor.usecase';
/**
 * module declatation
 */
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Cakes', schema: CakeSchema },
      { name: 'CakeCategories', schema: CakeCategoryModel },
      { name: 'Stores', schema: StoreModel },
    ]),
    MulterModule.register({
      dest: './uploads',
    }),
    forwardRef(() =>StoreModule),
    CakeCategoryModule,
  ],
  controllers: [CakeController],
  providers: [
    SearchForCakesUseCase,
    CreateCakeUseCase,
    FindCakeUseCase,
    UpdateKnownFor,
    GetCakeDetailsUseCase,
    GetSimilarCakesUseCase,
    {
      provide: CAKE_REPOSITORY, // string token for interface
      useClass: CakeRepositoryImp,
    },
    {
      provide: CAKE_CATEGORY_REPOSITORY, // string token for interface
      useClass: CakecategoryRepositoryImp,
    },
    {
      provide: GETSTORE, // string token for interface
      useClass: GetStoreUsecaseImp,
    },
    {
      provide: GETSTORE, // string token for interface
      useClass: GetStoreUsecaseImp,
    },
    {
      provide: I_GET_CAKE_DETAILS_USECASE,
      useClass: IGetCakeDetailsUseCaseImp,
    },
  ],
  exports: [GetCakeDetailsUseCase, UpdateKnownFor],
})
export class CakeModule {}
