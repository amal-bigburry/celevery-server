/**
 * IMports all the required packages into the system
 */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CREATE_SELLER_TOKEN } from './tokens/CreateSupportIDforSellerToken';
import { ISellerRepositoryImp } from './infrastructerLayer/implimentations/ISellerRepository.implementation';
import { SellerSupportModel } from './applicationLayer/repository/seller.support.schema';
import { SellerSupportController } from './infrastructerLayer/controllers/seller.support.controller';
import { CreateSupportIDforSellerUsecase } from './applicationLayer/usecases/CreateSupportIDforSeller.usecase';
import { CREATE_BUYER_TOKEN } from './tokens/CreateSupportIDforBuyerToken';
import { IBuyerRepositoryImp } from './infrastructerLayer/implimentations/IBuyerRepository.implimentation';
import { CreateSupportIDforBuyerUsecase } from './applicationLayer/usecases/CreateSupportIDforBuyer.usecase';
import { BuyerSupportController } from './infrastructerLayer/controllers/buyer.support.controller';
import { BuyerSupportModel } from './applicationLayer/repository/buyer.support.schema';
import { AddMessageToBuyerSupportUsecase } from './applicationLayer/usecases/AddMessageToBuyerSupport.usecase';
import { AddMessageToSellerSupportUsecase } from './applicationLayer/usecases/AddMessageToSellerSupport.usecase';
import { FetchMessageFromBuyerSupportUsecase } from './applicationLayer/usecases/FetchMessageFromBuyerSupport.usecase';
import { FetchMessageFromSellerSupportUsecase } from './applicationLayer/usecases/FetchMessageFromSellerSupport.usecase';
import { FetchAllSupportIdsForSellerUseCase } from './applicationLayer/usecases/FetchAllSupportIdsForSeller.usecase';
import { FetchAllSupportIdsForBuyerUseCase } from './applicationLayer/usecases/FetchAllSupportIdsForBuyer.usecase';
import { NOTIFY } from './tokens/Notity.token';
import { NotifyImp } from './infrastructerLayer/implimentations/Notify.implimentation';
import { MqttModule } from '../mqtt/mqtt.module';
/**
 * module
 */
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'sellerSupport', schema: SellerSupportModel }]),
    MongooseModule.forFeature([{ name: 'buyerSupport', schema: BuyerSupportModel }]),
    MqttModule
  ],
  controllers: [SellerSupportController, BuyerSupportController],
  providers: [
    CreateSupportIDforSellerUsecase,
    CreateSupportIDforBuyerUsecase,
    AddMessageToBuyerSupportUsecase,
    AddMessageToSellerSupportUsecase,
    FetchMessageFromBuyerSupportUsecase,
    FetchMessageFromSellerSupportUsecase,
    FetchAllSupportIdsForSellerUseCase,
    FetchAllSupportIdsForBuyerUseCase,
    {
      provide: CREATE_SELLER_TOKEN, // ✅ token-based provider
      useClass: ISellerRepositoryImp,
    },
    {
      provide: CREATE_BUYER_TOKEN, // ✅ token-based provider
      useClass: IBuyerRepositoryImp,
    },
    {
      provide: NOTIFY, // ✅ token-based provider
      useClass: NotifyImp,
    },
  ],
  exports: [],
})
export class SellerSupportModule {}
