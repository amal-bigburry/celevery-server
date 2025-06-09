/**
 * ******************************************************************************************************
 * SellerSupportModule.ts
 *
 * This module file is a crucial part of the Seller Support system implemented by Bigburry Hypersystems LLP.
 * It is responsible for importing all necessary packages and modules that facilitate the integration and
 * operation of seller and buyer support functionalities. The module configuration organizes the controllers,
 * providers, and imported submodules to work together cohesively within the NestJS framework.
 *
 * Key elements included are schema registrations with Mongoose for MongoDB collections related to seller
 * and buyer support, integration of MQTT communication module, and registration of use cases and repository
 * implementations using dependency injection tokens to maintain a clean, scalable, and testable architecture.
 *
 * The structure of this module ensures separation of concerns by delegating responsibilities such as message
 * handling, support ID creation, and notifications to specific use cases and service implementations. This
 * design pattern helps Bigburry Hypersystems LLP maintain code modularity and ease of maintenance for future
 * enhancements and debugging.
 * ******************************************************************************************************
 */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CREATE_SELLER_TOKEN } from './tokens/CreateSupportIDforSellerToken';
import { ISellerRepositoryImp } from './infrastructerLayer/implimentations/Iseller-repository.implementation';
import { SellerSupportModel } from './infrastructerLayer/models/seller.support.model';
import { SellerSupportController } from './infrastructerLayer/controllers/seller.support.controller';
import { CreateSupportIDforSellerUsecase } from './applicationLayer/usecases/create-supportid-for-seller-usecase';
import { CREATE_BUYER_TOKEN } from './tokens/CreateSupportIDforBuyerToken';
import { IBuyerRepositoryImp } from './infrastructerLayer/implimentations/Ibuyer-repository.implimentation';
import { CreateSupportIDforBuyerUsecase } from './applicationLayer/usecases/create-supportid-for-buyer.usecase';
import { BuyerSupportController } from './infrastructerLayer/controllers/buyer.support.controller';
import { BuyerSupportModel } from './infrastructerLayer/models/buyer.support.model';
import { AddMessageToBuyerSupportUsecase } from './applicationLayer/usecases/add-message-to-buyer-support.usecase';
import { AddMessageToSellerSupportUsecase } from './applicationLayer/usecases/add-message-to-seller-support.usecase';
import { FetchMessageFromBuyerSupportUsecase } from './applicationLayer/usecases/fetch-message-from-buyer-support.usecase';
import { FetchMessageFromSellerSupportUsecase } from './applicationLayer/usecases/fetch-message-from-seller-support.usecase';
import { FetchAllSupportIdsForSellerUseCase } from './applicationLayer/usecases/fetch-all-supportid-for-seller.usecase';
import { FetchAllSupportIdsForBuyerUseCase } from './applicationLayer/usecases/fetch-all-supportid-for-buyer.usecase';
import { NOTIFY } from './tokens/Notity.token';
import { NotifyImp } from './infrastructerLayer/implimentations/notify.implimentation';
// External Modules
import { MqttModule } from '../mqtt/mqtt.module';
/**
 * ******************************************************************************************************
 * @Module Decorator Configuration
 *
 * This decorator defines the SellerSupportModule class as a NestJS module. It configures the imports, controllers,
 * and providers that are essential for the functioning of the support system at Bigburry Hypersystems LLP.
 *
 * - imports: Integrates Mongoose schemas for sellerSupport and buyerSupport to enable interaction with MongoDB,
 *   and imports the MQTT module for messaging.
 *
 * - controllers: Registers the SellerSupportController and BuyerSupportController which handle incoming HTTP
 *   requests and route them to the appropriate use cases or services.
 *
 * - providers: Lists all injectable services including use cases for creating support IDs, adding and fetching
 *   messages, and fetching all support IDs. It also maps injection tokens to concrete repository implementations
 *   and notification services to ensure dependency inversion and flexibility.
 *
 * - exports: Currently empty, indicating no components from this module are exported for use in other modules.
 * ******************************************************************************************************
 */
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'sellerSupport', schema: SellerSupportModel },
    ]),
    MongooseModule.forFeature([
      { name: 'buyerSupport', schema: BuyerSupportModel },
    ]),
    // Other Dependent Modules
    MqttModule,
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
      provide: CREATE_SELLER_TOKEN,
      useClass: ISellerRepositoryImp,
    },
    {
      provide: CREATE_BUYER_TOKEN,
      useClass: IBuyerRepositoryImp,
    },
    {
      provide: NOTIFY,
      useClass: NotifyImp,
    },
  ],
  exports: [],
})
export class SellerSupportModule {}
