/**
 * importing required packages
 */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; /**
 * modules
 */
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
@Module({
  imports: [ConfigModule, CakeModule, OrderModule],
  providers: [
    GetPopularProductsUseCase,
    GetTrendingProductsUseCase,
    {
      provide: ORDER_REPOSITORY, // string token for interface
      useClass: IOrderRepositoryImp,
    },
    {
      provide: CAKEREPOSITORY, // string token for interface
      useClass: ICakeRepositoryUseCaseImp,
    },
    {
      provide: GETORDERANALYSE, // string token for interface
      useClass: IGetOrdersToAnalyseImp,
    },
  ],
  controllers: [AnalyticsController],
  exports: [],
})
export class AnalyticsModule {}
