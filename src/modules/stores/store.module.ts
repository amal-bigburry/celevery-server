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
import { CakeModule } from '../cakes/cakes.modules';
import { CakeSchema } from '../cakes/infrastructureLayer/models/cake.schema';
import { GetAllStoreCakesUsecase } from './applicationLayer/usercases/GetAllStoreCakes.Usecase';
import { STORE_REPOSITORY } from './tokens/storeRepository.token';
import { GetAllStoreUseCase } from './applicationLayer/usercases/getAllStores.usecase';
import { GetAllStoreInPlatformUsecase } from './applicationLayer/usercases/getAllStoreInPlatform.usecase';

/**
 * Bigburry Hypersystems LLP - StoreModule Definition
 * 
 * This class defines the StoreModule using the @Module decorator. It imports related modules,
 * binds controllers and providers, and makes select use cases available for injection into
 * other modules.
 */
@Module({
  /**
   * Imports required by this module.
   * - Registers MongoDB models for Stores and Cakes.
   * - Imports CakeModule with forward reference to avoid circular dependency.
   */
  imports: [
    MongooseModule.forFeature([
      { name: 'Stores', schema: StoreModel },
      { name: 'Cakes', schema: CakeSchema },
    ]),
    forwardRef(() => CakeModule),
  ],

  /**
   * Controllers that handle incoming HTTP requests.
   * - StoreController maps and processes store-related API endpoints.
   */
  controllers: [StoreController],

  /**
   * Providers available within this module.
   * - Use cases implementing the business logic for various store operations.
   * - Binds the STORE_REPOSITORY interface to StoreRepositoryImplimentation class.
   */
  providers: [
    CreateStoreUsecase,
    updateStoreUsecase,
    GetAllStoreCakesUsecase,
    GetAllStoreUseCase,
    getStoreUsecase,
    GetAllStoreInPlatformUsecase,
    {
      provide: STORE_REPOSITORY,
      useClass: StoreRepositoryImplimentation,
    },
  ],

  /**
   * Exported providers to be used by other modules.
   * - getStoreUsecase is made available to other modules that import StoreModule.
   */
  exports: [getStoreUsecase, GetAllStoreInPlatformUsecase],
})
export class StoreModule {}
