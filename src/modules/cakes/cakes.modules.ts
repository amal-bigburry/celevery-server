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
import { SearchForCakesUseCase } from './applicationLayer/use-cases/searchcakes.usecase';
import { GetCakeDetailsUseCase } from './applicationLayer/use-cases/GetCakeDetailsUseCase';
import { GetSimilarCakesUseCase } from './applicationLayer/use-cases/GetSimilarCakes.usecase';
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
import { OrderModule } from '../orders/orders.module';
import { GET_ALL_ORDERS } from './tokens/getAllOrder.token';
import { IGetAllOrdersUseCaseImp } from './infrastructureLayer/ExternalImplimentations/getAllOrders.implimentations';
import { GetCakesInStoreUsecase } from './applicationLayer/use-cases/getCakesInStore.usecase';
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
      useClass: GetStoreUsecaseImp,
    },
    {
      provide: GET_ALL_ORDERS,
      useClass: IGetAllOrdersUseCaseImp,
    },
    {
      provide: I_GET_CAKE_DETAILS_USECASE,
      useClass: IGetCakeDetailsUseCaseImp,
    },
  ],
  exports: [GetCakeDetailsUseCase, UpdateKnownFor],
})
export class CakeModule {}
