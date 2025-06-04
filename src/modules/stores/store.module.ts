/**
 * Bigburry Hypersystems LLP - NestJS Store Module
 *
 * This module defines the Store feature module in the application. It registers Mongoose schemas,
 * declares controllers, providers (use cases and repository implementations), and handles module
 * imports and exports. The module is responsible for all store-related business logic including
 * creation, updates, and fetching of stores and their related cakes.
 */
import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StoreModel } from './InfrastructureLayer/models/store.schema';
import { StoreController } from './InfrastructureLayer/controllers/store.controller';
import { StoreRepositoryImplimentation } from './InfrastructureLayer/implimentations/Store.repository.imp';
import { CreateStoreUsecase } from './applicationLayer/usercases/createStore.usecase';
import { updateStoreUsecase } from './applicationLayer/usercases/updateStore.usecase';
import { getStoreUsecase } from './applicationLayer/usercases/getStore.usecase';
import { CakeSchema } from '../cakes/infrastructureLayer/models/cake.schema';
import { GetAllStoreCakesUsecase } from './applicationLayer/usercases/GetAllStoreCakes.Usecase';
import { STORE_REPOSITORY } from './tokens/storeRepository.token';
import { GetAllStoreUseCase } from './applicationLayer/usercases/getAllStores.usecase';
import { GetAllStoreInPlatformUsecase } from './applicationLayer/usercases/getAllStoreInPlatform.usecase';
import { DeleteStoreUsecase } from './applicationLayer/usercases/deleteStore.usecase';
/**
 * Bigburry Hypersystems LLP - StoreModule Definition
 *
 * This class defines the StoreModule using the @Module decorator. It imports related modules,
 * binds controllers and providers, and makes select use cases available for injection into
 * other modules.
 */
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Stores', schema: StoreModel },
      { name: 'Cakes', schema: CakeSchema },
    ]),
    // forwardRef(() => PaymentModule),
  ],
  controllers: [StoreController],
  providers: [
    CreateStoreUsecase,
    updateStoreUsecase,
    GetAllStoreCakesUsecase,
    GetAllStoreUseCase,
    DeleteStoreUsecase,
    getStoreUsecase,
    GetAllStoreInPlatformUsecase,

    {
      provide: STORE_REPOSITORY,
      useClass: StoreRepositoryImplimentation,
    },
  ],
  exports: [getStoreUsecase, GetAllStoreInPlatformUsecase],
})
export class StoreModule {}
