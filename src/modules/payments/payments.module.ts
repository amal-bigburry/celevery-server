/**
 * importing required packages
 */
import { Module } from '@nestjs/common';
import { PaymentController } from './infrastructureLayer/controllers/payment.controller';
import { RefundUsecase } from './applicationLayer/use-cases/refund.usecase';
import { TransferAmountUsecase } from './applicationLayer/use-cases/tranfer.usecase';
import { CashFreePaymentGatewayImp } from './infrastructureLayer/repository/cashfree.implimentation';
import { GetSessionIdUseCase } from './applicationLayer/use-cases/getSessionId.UseCase';
import { PAYMENTTOKEN } from './applicationLayer/tokens/payment.token';
import { GETPAYMENTWAITINGORDERS } from './applicationLayer/tokens/getallpaymentwaiting.token';
import { CHANGEORDERSTATUS } from './applicationLayer/tokens/changeorderstatus.token';
import { IGetAllPaymentWaitingOrdersUsecaseImp } from './infrastructureLayer/ExternalUseCaseImplimentations/IGetAllPaymentWaitingOrdersUsecase.implimentation';
import { IChangeOrderStatusUseCaseImp } from './infrastructureLayer/ExternalUseCaseImplimentations/IChangeOrderStatusUseCase.implimentation';
import { GETUSERDETAILS } from './applicationLayer/tokens/getuserdetails.token';
import { GETCAKEDETAILS } from './applicationLayer/tokens/getcakedetails.token';
import { IGetCakeDetailsUseCaseImp } from './infrastructureLayer/ExternalUseCaseImplimentations/GetCakeDetailsUseCase.implimentation';
import { IGetUserDetailsUsecaseImp } from './infrastructureLayer/ExternalUseCaseImplimentations/GetUserDetailsUsecase.implimentations';
import { OrderModule } from '../orders/orders.module';
import { IGetOrderDetailsUseCaeseImp } from './infrastructureLayer/ExternalUseCaseImplimentations/IGetOrderDetailsUseCaese.implimentation';
import { GETORDERDETAILS } from './applicationLayer/tokens/getOrderDetails.token';
import { CakeModule } from '../cakes/cakes.modules';
import { UserModule } from '../users/users.module';
/**
 * modules
 */
@Module({
  imports: [OrderModule, CakeModule, UserModule],
  controllers: [PaymentController],
  providers: [
    GetSessionIdUseCase,
    RefundUsecase,
    TransferAmountUsecase,
    {
      provide: PAYMENTTOKEN, // ✅ token-based provider
      useClass: CashFreePaymentGatewayImp,
    },
    {
      provide: GETPAYMENTWAITINGORDERS, // ✅ token-based provider
      useClass: IGetAllPaymentWaitingOrdersUsecaseImp,
    },
    {
      provide: CHANGEORDERSTATUS, // ✅ token-based provider
      useClass: IChangeOrderStatusUseCaseImp,
    },
    {
      provide: GETUSERDETAILS, // ✅ token-based provider
      useClass: IGetUserDetailsUsecaseImp,
    },
    {
      provide: GETCAKEDETAILS, // ✅ token-based provider
      useClass: IGetCakeDetailsUseCaseImp,
    },
    {
      provide: GETORDERDETAILS, // ✅ token-based provider
      useClass: IGetOrderDetailsUseCaeseImp,
    },
  ],
})
export class PaymentModule {}
