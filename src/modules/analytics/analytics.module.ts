
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
import { ORDER_REPOSITORY } from './tokens/orderRepositor.token';
import { CakeModule } from '../cakes/cakes.modules';
import { CAKEREPOSITORY } from './tokens/cake_Repository.token';
import { OrderModule } from '../orders/orders.module';
import { GETORDERANALYSE } from './tokens/GetOrdersToAnalyse.token';
import { GetStoreLocationsUsecase } from './applicationLayer/usecases/get-store-location.interface';
import { StoreModule } from '../stores/store.module';
import { IGetAllStoreInPlatformUsecaseImp } from './infrastructurelLayer/implimentations/InternalImplimentations/get-all-stores-in-platform.implimentation';
import { GETALLSTOREINPLATFORM } from './tokens/Getallstorelocation.token';
@Module({
  imports: [
    // Other Dependent Modules
    ConfigModule,
    CakeModule,
    OrderModule,
    StoreModule,
  ],
  providers: [
    GetStoreLocationsUsecase,
    {
      provide: GETALLSTOREINPLATFORM, // Token for order analysis data provider
      useClass: IGetAllStoreInPlatformUsecaseImp, // Implementation class for orders to analyse
    },
  ],
  controllers: [AnalyticsController], // Controller handling analytics routes
})
export class AnalyticsModule {}
