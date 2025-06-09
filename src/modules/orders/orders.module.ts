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
import { OrderSchema } from './infrastructureLayer/models/order.model';
import { OrderRepositoryImp } from './infrastructureLayer/implimentations/InternalImplimentations/order.implimenation';
import { GetAllOrdersReceivedUseCase } from './applicationLayer/use-cases/get-all-orders-received.usecase';
import { GetAllOrdersPlacedUseCase } from './applicationLayer/use-cases/get-all-orders-placed.usecase';
import { RequestOrderUseCase } from './applicationLayer/use-cases/request-order.usercase';
import { UserModule } from '../users/users.module';
import { JwtService } from '@nestjs/jwt';
import { CakeModule } from '../cakes/cakes.modules';
import { ChangeOrderStatus } from './infrastructureLayer/controllers/change-order-status.controller';
import { ChangeOrderStatusUseCase } from './applicationLayer/use-cases/change-order-status.usecase';
import { StoreModule } from '../stores/store.module';
import { ORDERINTERFACETOKEN } from './tokens/orderRepository.token';
import { GET_CAKE_DETAILS } from './tokens/get_cake_details.token';
import { GET_STORE_DETAILS } from './tokens/get_store_details.token';
import { GET_USER_DETAILS } from './tokens/get_user_details.token';
import { IGetCakeDetailsUseCaseImp } from './infrastructureLayer/implimentations/ExternalImplimentations/get-cake-details.implimentation';
import { IGetStoreUseCaseImp } from './infrastructureLayer/implimentations/ExternalImplimentations/get-store.implimentation';
import { IGetUserDetailsUsecaseImp } from './infrastructureLayer/implimentations/ExternalImplimentations/get-user-detatils.implimentation';
import { NOTIFICATION_USECASE } from './tokens/notificationusecase.token';
import { INotificationUseCaseImp } from './infrastructureLayer/implimentations/ExternalImplimentations/notification.implimentation';
import { MQTTTOKEN } from './tokens/mqtt.token';
import { IMqttServiceImp } from './infrastructureLayer/implimentations/ExternalImplimentations/mqtt-service.implimentation';
import { NotificationModule } from '../Notifications/notification.module';
import { MqttModule } from '../mqtt/mqtt.module';
import { GetOrdersToAnalyse } from './applicationLayer/use-cases/get-order-to-analys.usecase';
import { OrderController } from './infrastructureLayer/controllers/orders.controller';
import { GetOrderDetailsUseCase } from './applicationLayer/use-cases/get_order_details.usecase';
import { GetAllPaymentWaitingOrdersUseCase } from './applicationLayer/use-cases/get-all-payment-waiting-orders.usecase';
import { GET_ORDERS_OFCAKE } from './tokens/get_orders_with_cakeid.token';
import { GetOrdersWithCakeIdImp } from './infrastructureLayer/implimentations/InternalImplimentations/get-orders-with-cakeid.implimentation';
import { UPDATE_KNOWN_FOR_IN_CAKE } from './tokens/update_known_for_in_cake.token';
import { UpdateKnownForOfCakeUseCaseImp } from './infrastructureLayer/implimentations/InternalImplimentations/update-knownfor.implimentation';
import { GetAllOrdersUseCase } from './applicationLayer/use-cases/get_all_orders.usecase';
import { AutoCancelWorker } from './applicationLayer/use-cases/auto-cancel.usecase';
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
    forwardRef(()=>UserModule),
    forwardRef(() => CakeModule),
    StoreModule,
    NotificationModule,
    MqttModule,
  ],
  controllers: [OrderController, ChangeOrderStatus],
  providers: [
    AutoCancelWorker,
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
      provide: ORDERINTERFACETOKEN,
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
