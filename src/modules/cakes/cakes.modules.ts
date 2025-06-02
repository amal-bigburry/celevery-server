/**
 * © Bigburry Hypersystems LLP. All rights reserved.
 * This source code is confidential and intended only for internal use.
 * Unauthorized copying, modification, distribution, or disclosure is prohibited.
 */
/**
 * importing the required packages 
 */
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CakeSchema } from './infrastructureLayer/models/cake.schema';
import { CakeRepositoryImp } from './infrastructureLayer/implimentations/cake.repository.imp';
import { CakeController } from './infrastructureLayer/controllers/cake.controller';
import { CreateCakeUseCase } from './applicationLayer/use-cases/createcake.usecase';
import { FindCakeUseCase } from './applicationLayer/use-cases/findcake.usecase';
import { CakeCategoryModel } from '../cakecategories/infrastructureLayer/models/cakecategory.model';
import { SearchForCakesUseCase } from './applicationLayer/use-cases/searchcakes.usecase';
import { MulterModule } from '@nestjs/platform-express';
import { GetCakeDetailsUseCase } from './applicationLayer/use-cases/GetCakeDetailsUseCase';
import { GetSimilarCakesUseCase } from './applicationLayer/use-cases/GetSimilarCakes.usecase';
import { StoreModel } from '../stores/InfrastructureLayer/models/store.schema';
import { CAKE_REPOSITORY } from './tokens/cakeRepository.token';
import { CAKE_CATEGORY_REPOSITORY } from './tokens/cakeCategoryRepository.token';
import { CakecategoryRepositoryImp } from './infrastructureLayer/ExternalImplimentations/CakecategoryRepositoty.implimentations';
import { GETSTORE } from './tokens/getstoreusecase.token';
import { GetStoreUsecaseImp } from './infrastructureLayer/ExternalImplimentations/Getstoreusecase.implimentation';
import { I_GET_CAKE_DETAILS_USECASE } from './tokens/getcakedetailsusecase';
import { IGetCakeDetailsUseCaseImp } from '../orders/infrastructureLayer/ExternalUseCaseImplimentation/GetCakeDetailsUseCase.implimentation';
import { StoreModule } from '../stores/store.module';
import { CakeCategoryModule } from '../cakecategories/cakecategories.module';
import { UpdateKnownFor } from './applicationLayer/use-cases/UpdateKnownFor.usecase';
import { AnalyticsModule } from '../analytics/analytics.module';
import { GET_POPULAR } from './tokens/getpopular.token';
import { IGetPopularCakesImp } from './infrastructureLayer/ExternalImplimentations/getPopularCakes.implimentations';
import { OrderModule } from '../orders/orders.module';
import { GET_TRENDING } from './tokens/gettrending.token';
import { IGetTrendingCakesImp } from './infrastructureLayer/ExternalImplimentations/getTrendingCakes.impliments';
/**
 * module declaration
 */
@Module({
  imports: [
    /**
     * registering mongoose models for cakes, cake categories, and stores
     */
    MongooseModule.forFeature([
      { name: 'Cakes', schema: CakeSchema },
      // { name: 'CakeCategories', schema: CakeCategoryModel },
      // { name: 'Stores', schema: StoreModel },
    ]),
    /**
     * configuring multer for file uploads
     */
    StoreModule,
    CakeCategoryModule,
    forwardRef(()=>OrderModule),
    // AnalyticsModule, 
    // AnalyticsModule,
    // ,
  ],
  /**
   * registering controller for cake module
   */
  controllers: [CakeController],
  /**
   * providing use cases and repository implementations
   */
  providers: [
    SearchForCakesUseCase,
    CreateCakeUseCase,
    FindCakeUseCase,
    UpdateKnownFor,
    GetCakeDetailsUseCase,
    GetSimilarCakesUseCase,
    {
      provide: CAKE_REPOSITORY,
      useClass: CakeRepositoryImp,
    },
    {
      provide: CAKE_CATEGORY_REPOSITORY,
      useClass: CakecategoryRepositoryImp,
    },
    {
      provide: GETSTORE,
      useClass: GetStoreUsecaseImp,
    },
    {
      provide: GETSTORE,
      useClass: GetStoreUsecaseImp,
    },
    {
      provide: I_GET_CAKE_DETAILS_USECASE,
      useClass: IGetCakeDetailsUseCaseImp,
    },
    {
      provide: GET_POPULAR,
      useClass: IGetPopularCakesImp,
    },
    {
      provide: GET_TRENDING,
      useClass: IGetTrendingCakesImp,
    },
  ],
  /**
   * exporting specific use cases for external usage
   */
  exports: [GetCakeDetailsUseCase, UpdateKnownFor],
})
export class CakeModule {}
