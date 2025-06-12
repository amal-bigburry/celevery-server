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
import { CakeSchema } from '../../common/databaseModels/cake.model';
import { CakeRepositoryImp } from './infrastructureLayer/implimentations/cake.implimentation';
import { CakeController } from './infrastructureLayer/controllers/cake.controller';
import { CreateCakeUseCase } from './applicationLayer/use-cases/create-cake.usecase';
import { FindCakeUseCase } from './applicationLayer/use-cases/find-cake.usecase';
import { SearchForCakesUseCase } from './applicationLayer/use-cases/search-cakes.usecase';
import { GetCakeDetailsUseCase } from './applicationLayer/use-cases/get-cake-details.usecase';
import { GetSimilarCakesUseCase } from './applicationLayer/use-cases/get-similar-cakes.usecase';
import { CAKEINTERFACETOKEN } from './tokens/cake.token';
import { CAKE_CATEGORY_REPOSITORY } from './tokens/cake-category.token';
import { GETSTORE } from './tokens/get-store.token';
import { I_GET_CAKE_DETAILS_USECASE } from './tokens/get-cake-details.token';
import { StoreModule } from '../stores/store.module';
import { CakeCategoryModule } from '../cakecategories/cakecategories.module';
import { UpdateKnownFor } from './applicationLayer/use-cases/update-knownfor.usecase';
import { OrderModule } from '../orders/orders.module';
import { GETALLORDERSTOKEN } from './tokens/get-all-orders.token';
import { GetCakesInStoreUsecase } from './applicationLayer/use-cases/get-cakes-in-store.usecase';
import { IGetStoreUseCase } from './applicationLayer/use-cases/get-store.usecase';
import { CakeMinimalModel } from './applicationLayer/use-cases/cake-minimal-data.model';
import { GetAllOrdersUseCase } from '../orders/applicationLayer/use-cases/get_all_orders.usecase';
import { GetStoreUsecase } from '../stores/applicationLayer/usercases/get-store-details.usecase';
import { FindCakeCategoryByIDUseCase } from '../cakecategories/applicationLayer/use-cases/find-category-by-id.usecase';
import { UpdateCakeDetailsUseCase } from './applicationLayer/use-cases/update-cake-detail.usecase';
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
    UpdateCakeDetailsUseCase,
    CakeMinimalModel,
    GetCakeDetailsUseCase,
    GetCakesInStoreUsecase,
    GetSimilarCakesUseCase,
    {
      provide: CAKEINTERFACETOKEN,
      useClass: CakeRepositoryImp,
    },
    {
      provide: CAKE_CATEGORY_REPOSITORY,
      useClass: FindCakeCategoryByIDUseCase,
    },
    {
      provide: GETSTORE,
      useClass: GetStoreUsecase,
    },
    {
      provide: GETALLORDERSTOKEN,
      useClass: GetAllOrdersUseCase,
    },
    {
      provide: I_GET_CAKE_DETAILS_USECASE,
      useClass: GetCakeDetailsUseCase,
    },
  ],
  exports: [GetCakeDetailsUseCase, UpdateKnownFor,CAKEINTERFACETOKEN],
})
export class CakeModule {}
