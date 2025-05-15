import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order } from './domainLayer/entities.ts/order.entity';
import { OrderSchema } from './applicationLayer/repositories/order.schema';
import { OrderRepositoryImp } from './infrastructureLayer/repositories/orders/order.repository.imp';
import { GetAllOrdersReceivedUseCase } from './applicationLayer/use-cases/get_all_orders_received.usecase';
import { GetAllOrdersPlacedUseCase } from './applicationLayer/use-cases/get_all_orders_placed.usecase';
import { RequestOrderUseCase } from './applicationLayer/use-cases/request_order.usercase';
import { UserModule } from '../users/users.module';
import { JwtService } from '@nestjs/jwt';
import { CakeModule } from '../cakes/cakes.modules';
import { ChangeOrderStatus } from './infrastructureLayer/controllers/change_order_status.controller';
import { ChangeOrderStatusUseCase } from './applicationLayer/use-cases/change_order_status.usecase';
import { StoreModule } from '../stores/store.module';
import { ORDER_REPOSITORY } from './applicationLayer/tokens/orderRepository.token';
import { GET_CAKE_DETAILS } from './applicationLayer/tokens/get_cake_details.token';
import { GET_STORE_DETAILS } from './applicationLayer/tokens/get_store_details.token';
import { GET_USER_DETAILS } from './applicationLayer/tokens/get_user_details.token';
import { IGetCakeDetailsUseCaseImp } from './infrastructureLayer/ExternalUseCaseImplimentation/GetCakeDetailsUseCase.implimentation';
import { IGetStoreUseCaseImp } from './infrastructureLayer/ExternalUseCaseImplimentation/GetStoreUseCase.implimentation';
import { IGetUserDetailsUsecaseImp } from './infrastructureLayer/ExternalUseCaseImplimentation/GetUserDetailsUsecase.implimentations';
import { NOTIFICATION_USECASE } from './applicationLayer/tokens/notificationusecase.token';
import { INotificationUseCaseImp } from './infrastructureLayer/ExternalUseCaseImplimentation/NotificationUsecase.implimentations';
import { MQTTTOKEN } from './applicationLayer/tokens/mqtt.token';
import { IMqttServiceImp } from './infrastructureLayer/ExternalUseCaseImplimentation/MqttService.implimentations';
import { NotificationModule } from '../Notifications/notification.module';
import { MqttModule } from '../mqtt/mqtt.module';
import { GetOrdersToAnalyse } from './applicationLayer/use-cases/getOrderToAnalyse.usecase';
import { OrderController } from './infrastructureLayer/controllers/orders.controller';
import { RequestOrderController } from './infrastructureLayer/controllers/request_order.controller';
import { GetOrderDetailsUseCase } from './applicationLayer/use-cases/get_order_details.usecase';
import { GetAllPaymentWaitingOrdersUseCase } from './applicationLayer/use-cases/get_all_payment_waiting_orders.usecase';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    UserModule,
    CakeModule,
    StoreModule,
    NotificationModule,
    MqttModule,
  ],
  controllers: [
    OrderController,
    ChangeOrderStatus,
    RequestOrderController,
  ],
  providers: [
    RequestOrderUseCase,
    JwtService,
    ChangeOrderStatusUseCase,
    GetAllOrdersReceivedUseCase,
    GetAllOrdersPlacedUseCase,
    GetOrdersToAnalyse,
    GetOrderDetailsUseCase,
    GetAllPaymentWaitingOrdersUseCase,
    // GetCakeDetailsUseCase,
    // GetUserDetailUseCase,
    {
      provide: ORDER_REPOSITORY, // string token for interface
      useClass: OrderRepositoryImp,
    },
    {
      provide: GET_CAKE_DETAILS, // string token for interface
      useClass: IGetCakeDetailsUseCaseImp,
    },
    {
      provide: GET_STORE_DETAILS, // string token for interface
      useClass: IGetStoreUseCaseImp,
    },
    {
      provide: GET_USER_DETAILS, // string token for interface
      useClass: IGetUserDetailsUsecaseImp,
    },
    {
      provide: NOTIFICATION_USECASE, // string token for interface
      useClass: INotificationUseCaseImp,
    },
    {
      provide: MQTTTOKEN, // string token for interface
      useClass: IMqttServiceImp,
    },
  ],
  exports: [ChangeOrderStatusUseCase, GetOrdersToAnalyse, GetOrderDetailsUseCase,GetAllPaymentWaitingOrdersUseCase],
})
export class OrderModule {}
