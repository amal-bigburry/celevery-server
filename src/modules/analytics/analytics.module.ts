/**
 * Licensed to Bigburry Hypersystems LLP
 * All rights reserved. Unauthorized copying, redistribution or modification of this file,
 * via any medium is strictly prohibited. Proprietary and confidential.
 */
/**
 * Importing required packages and modules
 * Importing NestJS Module, ConfigModule, controllers, use cases, tokens, implementations and related modules
 */
/**
 * AnalyticsModule is the main module for analytics functionality
 * Imports configuration, cake, and order modules
 * Provides use cases and repository implementations with dependency injection tokens
 * Registers AnalyticsController for handling routes
 */
import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AnalyticsController } from './infrastructurelLayer/controllers/analytics.controller';
import { GetPopularProductsUseCase } from './applicationLayer/usecases/GetPopularProducts.usecase';
import { GetTrendingProductsUseCase } from './applicationLayer/usecases/GetTrendingProducts.usecase';
import { ORDER_REPOSITORY } from './tokens/orderRepositor.token';
import { IOrderRepositoryImp } from './infrastructurelLayer/implimentations/IOrderRepository.implimentation';
import { CakeModule } from '../cakes/cakes.modules';
import { CAKEREPOSITORY } from './tokens/cake_Repository.token';
import { ICakeRepositoryUseCaseImp } from './infrastructurelLayer/implimentations/ICakeRepository.implimentation';
import { OrderModule } from '../orders/orders.module';
import { GETORDERANALYSE } from './tokens/GetOrdersToAnalyse.token';
import { IGetOrdersToAnalyseImp } from './infrastructurelLayer/implimentations/IGetOrdersToAnalyse.implimentation';
import { GetStoreLocationsUsecase } from './applicationLayer/usecases/GetStoreLocations.usecase';
import { StoreModule } from '../stores/store.module';
import { IGetAllStoreInPlatformUsecaseImp } from './infrastructurelLayer/implimentations/IGetAllStoreInPlatform.implimentation';
import { GETALLSTOREINPLATFORM } from './tokens/Getallstorelocation.token';
@Module({
  imports: [
    ConfigModule,
    forwardRef(()=>CakeModule),
    OrderModule,
    StoreModule,
  ],
  providers: [
    GetPopularProductsUseCase,
    GetTrendingProductsUseCase,
    GetStoreLocationsUsecase,
    {
      provide: ORDER_REPOSITORY, // Token for order repository interface
      useClass: IOrderRepositoryImp, // Implementation class for order repository
    },
    {
      provide: CAKEREPOSITORY, // Token for cake repository interface
      useClass: ICakeRepositoryUseCaseImp, // Implementation class for cake repository
    },
    {
      provide: GETORDERANALYSE, // Token for order analysis data provider
      useClass: IGetOrdersToAnalyseImp, // Implementation class for orders to analyse
    },
    {
      provide: GETALLSTOREINPLATFORM, // Token for order analysis data provider
      useClass: IGetAllStoreInPlatformUsecaseImp, // Implementation class for orders to analyse
    },
  ],
  controllers: [AnalyticsController], // Controller handling analytics routes
  exports: [GetPopularProductsUseCase, GetTrendingProductsUseCase,GetStoreLocationsUsecase], // No exports defined for this module
})
export class AnalyticsModule {}
