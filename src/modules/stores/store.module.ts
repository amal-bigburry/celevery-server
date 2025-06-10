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
import { StoreModel } from '../../common/databaseModels/store.model';
import { StoreController } from './InfrastructureLayer/controllers/store.controller';
import { StoreRepositoryImplimentation } from './InfrastructureLayer/implimentations/InternalImplimentations/store.implimentation';
import { CreateStoreUsecase } from './applicationLayer/usercases/create-store.usecase';
import { updateStoreUsecase } from './applicationLayer/usercases/updateStore.usecase';
import { GetStoreUsecase } from './applicationLayer/usercases/get-store-details.usecase';
import { CakeSchema } from '../../common/databaseModels/cake.model';
import { STORE_REPOSITORY } from './tokens/storeRepository.token';
import { GetAllStoreUseCase } from './applicationLayer/usercases/get-all-my-stores.usecase';
import { GetAllStoreInPlatformUsecase } from './applicationLayer/usercases/get-all-store-in-platform.usecase';
import { DeleteStoreUsecase } from './applicationLayer/usercases/delete-store.usecase';
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
    GetAllStoreUseCase,
    DeleteStoreUsecase,
    GetStoreUsecase,
    GetAllStoreInPlatformUsecase,
    {
      provide: STORE_REPOSITORY,
      useClass: StoreRepositoryImplimentation,
    },
  ],
  exports: [
    GetStoreUsecase, GetAllStoreInPlatformUsecase],
})
export class StoreModule {}
