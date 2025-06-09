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
import { CakeSchema } from './infrastructureLayer/models/cake.model';
import { CakeRepositoryImp } from './infrastructureLayer/implimentations/InternalImplimentations/cake.implimentation';
import { CakeController } from './infrastructureLayer/controllers/cake.controller';
import { CreateCakeUseCase } from './applicationLayer/use-cases/create-cake.usecase';
import { FindCakeUseCase } from './applicationLayer/use-cases/find-cake.usecase';
import { SearchForCakesUseCase } from './applicationLayer/use-cases/search-cakes.usecase';
import { GetCakeDetailsUseCase } from './applicationLayer/use-cases/get-cake-details.usecase';
import { GetSimilarCakesUseCase } from './applicationLayer/use-cases/get-similar-cakes.usecase';
import { CAKE_REPOSITORY } from './tokens/cake.token';
import { CAKE_CATEGORY_REPOSITORY } from './tokens/cake-category.token';
import { CakecategoryRepositoryImp } from './infrastructureLayer/implimentations/ExternalImplimentations/cake-category.implimentation';
import { GETSTORE } from './tokens/get-store.token';
import { I_GET_CAKE_DETAILS_USECASE } from './tokens/get-cake-details.token';
import { IGetCakeDetailsUseCaseImp } from '../orders/infrastructureLayer/implimentations/ExternalImplimentations/get-cake-details.implimentation';
import { StoreModule } from '../stores/store.module';
import { CakeCategoryModule } from '../cakecategories/cakecategories.module';
import { UpdateKnownFor } from './applicationLayer/use-cases/update-knownfor.usecase';
import { OrderModule } from '../orders/orders.module';
import { GET_ALL_ORDERS } from './tokens/get-all-orders.token';
import { GetCakesInStoreUsecase } from './applicationLayer/use-cases/get-cakes-in-store.usecase';
import { IGetAllOrdersImplimentation } from './infrastructureLayer/implimentations/ExternalImplimentations/get-all-orders.implimentation';
import { GetStoreImplimentation } from './infrastructureLayer/implimentations/ExternalImplimentations/get-store.implimentation';
import { IGetStoreUseCase } from './applicationLayer/use-cases/get-store.usecase';
import { CakeMinimalModel } from './applicationLayer/use-cases/cake-minimal-data.model';
/**
 * module declaration
 */
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Cakes', schema: CakeSchema }]),
    // Other Dependent Modules
    StoreModule,
    CakeCategoryModule,
    forwardRef(() => OrderModule),
  ],
  controllers: [CakeController],
  providers: [
    SearchForCakesUseCase,
    CreateCakeUseCase,
    FindCakeUseCase,
    UpdateKnownFor,
    IGetStoreUseCase,
    CakeMinimalModel,
    GetCakeDetailsUseCase,
    GetCakesInStoreUsecase,
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
      useClass: GetStoreImplimentation,
    },
    {
      provide: GET_ALL_ORDERS,
      useClass: IGetAllOrdersImplimentation,
    },
    {
      provide: I_GET_CAKE_DETAILS_USECASE,
      useClass: IGetCakeDetailsUseCaseImp,
    },
  ],
  exports: [GetCakeDetailsUseCase, UpdateKnownFor],
})
export class CakeModule {}
