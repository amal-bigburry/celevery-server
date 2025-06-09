/**
 * importing required packages
 *
 * This section imports necessary modules and components required for the payment system.
 * The `Module` from `@nestjs/common` is used to define the module in the NestJS framework. The `PaymentController`
 * handles the incoming HTTP requests related to payments. Various use cases such as `RefundUsecase`, `TransferAmountUsecase`,
 * and `GetSessionIdUseCase` represent the core business logic for processing refunds, transferring amounts,
 * and getting session IDs for payments, respectively. The `CashFreePaymentGatewayImp` class is the implementation
 * for interacting with the CashFree API to manage payments. Tokens like `PAYMENTTOKEN`, `GETPAYMENTWAITINGORDERS`,
 * and others are used for dependency injection throughout the application, ensuring that the correct services
 * and implementations are provided where needed. The `OrderModule`, `CakeModule`, and `UserModule`
 * are imported to integrate the necessary modules for handling orders, cakes, and users.
 *
 * Company: BigBurry Hypersystems LLP
 */
import { forwardRef, Module } from '@nestjs/common';
import { PaymentController } from './infrastructureLayer/controllers/payment.controller';
import { RefundUsecase } from './applicationLayer/use-cases/refund.usecase';
import { CashFreePaymentGatewayImp } from './infrastructureLayer/implimentations/cashfree.implimentation';
import { GetSessionIdUseCase } from './applicationLayer/use-cases/get-sessionid.usecase';
import { PAYMENTTOKEN } from './tokens/payment.token';
import { GETPAYMENTWAITINGORDERS } from './tokens/getallpaymentwaiting.token';
import { CHANGEORDERSTATUS } from './tokens/changeorderstatus.token';
import { IGetAllPaymentWaitingOrdersUsecaseImp } from './infrastructureLayer/ExternalUseCaseImplimentations/get-orders-waiting-to-pay.implimentation';
import { IChangeOrderStatusUseCaseImp } from './infrastructureLayer/ExternalUseCaseImplimentations/change-order-status.implimentation';
import { GETUSERDETAILS } from './tokens/getuserdetails.token';
import { GETCAKEDETAILS } from './tokens/getcakedetails.token';
import { IGetCakeDetailsUseCaseImp } from './infrastructureLayer/ExternalUseCaseImplimentations/get-cake-details.implimentation';
import { IGetUserDetailsUsecaseImp } from './infrastructureLayer/ExternalUseCaseImplimentations/get-user-details.implimentation';
import { OrderModule } from '../orders/orders.module';
import { IGetOrderDetailsUseCaeseImp } from './infrastructureLayer/ExternalUseCaseImplimentations/get-order-details.implimentation';
import { GETORDERDETAILS } from './tokens/getOrderDetails.token';
import { CakeModule } from '../cakes/cakes.modules';
import { UserModule } from '../users/users.module';
/**
 * The `PaymentModule` defines the core business logic and services related to payments, including processing
 * payments, refunds, and interacting with external payment gateways like CashFree. It serves as a central module
 * for handling payment-related functionality in the application.
 *
 * The `PaymentModule` imports other relevant modules, such as the `OrderModule`, `CakeModule`, and `UserModule`,
 * to facilitate interactions between these entities during payment processing.
 * These imports ensure that the payment system can retrieve necessary details about orders, cakes, and users.
 *
 * The `PaymentController` is responsible for exposing the API endpoints related to payment operations. It acts as
 * the interface for external clients to interact with the payment service.
 *
 * Providers are declared to inject the necessary services into the module. Each provider corresponds to a specific
 * use case or service implementation. For example:
 * - `CashFreePaymentGatewayImp` handles interactions with the CashFree API and is provided via the `PAYMENTTOKEN` token.
 * - `IGetAllPaymentWaitingOrdersUsecaseImp` provides the functionality to retrieve all orders waiting for payment,
 *   and it is provided via the `GETPAYMENTWAITINGORDERS` token.
 * - Other services such as `IChangeOrderStatusUseCaseImp`, `IGetUserDetailsUsecaseImp`, `IGetCakeDetailsUseCaseImp`,
 *   and `IGetOrderDetailsUseCaeseImp` are provided through respective tokens to ensure that the correct implementation
 *   is injected when needed.
 *
 * Overall, the `PaymentModule` encapsulates all functionality related to payment processing, offering a clean structure
 * for managing dependencies and business logic.
 *
 * Company: BigBurry Hypersystems LLP
 */
@Module({
  imports: [
    // Other Dependent Modules
    forwardRef(() => OrderModule),
    forwardRef(() => CakeModule),
    forwardRef(() => UserModule),
  ],
  controllers: [PaymentController],
  providers: [
    GetSessionIdUseCase,
    RefundUsecase,
    {
      provide: PAYMENTTOKEN,
      useClass: CashFreePaymentGatewayImp,
    },
    {
      provide: GETPAYMENTWAITINGORDERS,
      useClass: IGetAllPaymentWaitingOrdersUsecaseImp,
    },
    {
      provide: CHANGEORDERSTATUS,
      useClass: IChangeOrderStatusUseCaseImp,
    },
    {
      provide: GETUSERDETAILS,
      useClass: IGetUserDetailsUsecaseImp,
    },
    {
      provide: GETCAKEDETAILS,
      useClass: IGetCakeDetailsUseCaseImp,
    },
    {
      provide: GETORDERDETAILS,
      useClass: IGetOrderDetailsUseCaeseImp,
    },
  ],
  exports: [
    GetSessionIdUseCase,
    RefundUsecase,
  ],
})
export class PaymentModule {}
