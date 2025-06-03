/**
 * OrderModule is responsible for handling all order-related operations.
 * This includes creating, updating, and retrieving orders, as well as interacting with other modules
 * (like Cake, Store, User, Notification, and MQTT) to provide a comprehensive system for managing orders.
 *
 * The module imports various features such as Mongoose (for database connectivity), and integrates with
 * other modules like UserModule, CakeModule, StoreModule, NotificationModule, and MqttModule.
 * It also provides controllers and use cases that are responsible for managing business logic related to orders.
 *
 * The OrderModule serves as a crucial part of the system and contains various services that help to:
 * - Create and manage orders.
 * - Retrieve orders placed by buyers and received by sellers.
 * - Change the status of orders.
 * - Handle payment statuses, order analysis, and much more.
 *
 * Dependencies:
 * - MongooseModule: For interacting with MongoDB.
 * - UserModule: For user-related operations.
 * - CakeModule: For cake-related functionality.
 * - StoreModule: For store-related functionality.
 * - NotificationModule: For handling notifications.
 * - MqttModule: For managing MQTT communication.
 */
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order } from './domainLayer/entities.ts/order.entity';
import { OrderSchema } from './infrastructureLayer/models/order.schema';
import { OrderRepositoryImp } from './infrastructureLayer/implimentations/orders/order.repository.imp';
import { GetAllOrdersReceivedUseCase } from './applicationLayer/use-cases/get_all_orders_received.usecase';
import { GetAllOrdersPlacedUseCase } from './applicationLayer/use-cases/get_all_orders_placed.usecase';
import { RequestOrderUseCase } from './applicationLayer/use-cases/request_order.usercase';
import { UserModule } from '../users/users.module';
import { JwtService } from '@nestjs/jwt';
import { CakeModule } from '../cakes/cakes.modules';
import { ChangeOrderStatus } from './infrastructureLayer/controllers/change_order_status.controller';
import { ChangeOrderStatusUseCase } from './applicationLayer/use-cases/change_order_status.usecase';
import { StoreModule } from '../stores/store.module';
import { ORDER_REPOSITORY } from './tokens/orderRepository.token';
import { GET_CAKE_DETAILS } from './tokens/get_cake_details.token';
import { GET_STORE_DETAILS } from './tokens/get_store_details.token';
import { GET_USER_DETAILS } from './tokens/get_user_details.token';
import { IGetCakeDetailsUseCaseImp } from './infrastructureLayer/ExternalUseCaseImplimentation/GetCakeDetailsUseCase.implimentation';
import { IGetStoreUseCaseImp } from './infrastructureLayer/ExternalUseCaseImplimentation/GetStoreUseCase.implimentation';
import { IGetUserDetailsUsecaseImp } from './infrastructureLayer/ExternalUseCaseImplimentation/GetUserDetailsUsecase.implimentations';
import { NOTIFICATION_USECASE } from './tokens/notificationusecase.token';
import { INotificationUseCaseImp } from './infrastructureLayer/ExternalUseCaseImplimentation/NotificationUsecase.implimentations';
import { MQTTTOKEN } from './tokens/mqtt.token';
import { IMqttServiceImp } from './infrastructureLayer/ExternalUseCaseImplimentation/MqttService.implimentations';
import { NotificationModule } from '../Notifications/notification.module';
import { MqttModule } from '../mqtt/mqtt.module';
import { GetOrdersToAnalyse } from './applicationLayer/use-cases/getOrderToAnalyse.usecase';
import { OrderController } from './infrastructureLayer/controllers/orders.controller';
import { GetOrderDetailsUseCase } from './applicationLayer/use-cases/get_order_details.usecase';
import { GetAllPaymentWaitingOrdersUseCase } from './applicationLayer/use-cases/get_all_payment_waiting_orders.usecase';
import { GET_ORDERS_OFCAKE } from './tokens/get_orders_with_cakeid.token';
import { GetOrdersWithCakeIdImp } from './infrastructureLayer/implimentations/orders/get_orders_withcakeid.implimentation';
import { UPDATE_KNOWN_FOR_IN_CAKE } from './tokens/update_known_for_in_cake.token';
import { UpdateKnownForOfCakeUseCaseImp } from './infrastructureLayer/implimentations/orders/UpdateKnownForOfCakeUseCase.implimentation';
import { GetAllOrdersUseCase } from './applicationLayer/use-cases/get_all_orders.usecase';
/**
 * Imports external modules required for the OrderModule.
 * - MongooseModule: To connect to MongoDB and handle order documents.
 * - UserModule: Provides user-related functionality.
 * - CakeModule: Handles cake-related operations.
 * - StoreModule: Handles store-related operations.
 * - NotificationModule: Provides notification services.
 * - MqttModule: Manages MQTT communication for real-time updates.
 */
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    // Other Dependent Modules
    forwardRef(() => UserModule),
    forwardRef(() => CakeModule),
    StoreModule,
    NotificationModule,
    MqttModule,
  ],
  controllers: [OrderController, ChangeOrderStatus],
  providers: [
    RequestOrderUseCase,
    JwtService,
    ChangeOrderStatusUseCase,
    GetAllOrdersReceivedUseCase,
    GetAllOrdersPlacedUseCase,
    GetOrdersToAnalyse,
    GetOrderDetailsUseCase,
    GetAllOrdersUseCase,
    GetAllPaymentWaitingOrdersUseCase,
    {
      provide: ORDER_REPOSITORY, 
      useClass: OrderRepositoryImp,
    },
    {
      provide: GET_CAKE_DETAILS, 
      useClass: IGetCakeDetailsUseCaseImp,
    },
    {
      provide: GET_STORE_DETAILS,
      useClass: IGetStoreUseCaseImp,
    },
    {
      provide: GET_USER_DETAILS, 
      useClass: IGetUserDetailsUsecaseImp,
    },
    {
      provide: NOTIFICATION_USECASE, 
      useClass: INotificationUseCaseImp,
    },
    {
      provide: GET_ORDERS_OFCAKE,
      useClass: GetOrdersWithCakeIdImp,
    },
    {
      provide: MQTTTOKEN, 
      useClass: IMqttServiceImp,
    },
    {
      provide: UPDATE_KNOWN_FOR_IN_CAKE, 
      useClass: UpdateKnownForOfCakeUseCaseImp,
    },
  ],
  exports: [
    ChangeOrderStatusUseCase,
    GetOrdersToAnalyse,
    GetOrderDetailsUseCase,
    GetAllOrdersUseCase,
    GetAllPaymentWaitingOrdersUseCase,
  ],
})
export class OrderModule {}
