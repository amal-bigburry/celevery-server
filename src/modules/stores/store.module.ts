import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StoreModal } from './applicationLayer/repositories/store.schema';
import { StoreController } from './InfrastructureLayer/controllers/store.controller';
import { StoreRepositoryImplimentation } from './InfrastructureLayer/repositories/Store.repository.imp';
import { CreateStoreUsecase } from './applicationLayer/usercases/createStore.usecase';
import { updateStoreUsecase } from './applicationLayer/usercases/updateStore.usecase';
import { getStoreUsecase } from './applicationLayer/usercases/getStore.usecase';
import { CakeModule } from '../cakes/cakes.modules';
import { CakeSchema } from '../cakes/applicationLayer/repositories/cake.schema';
import { GetAllStoreCakesUsecase } from './applicationLayer/usercases/GetAllStoreCakes.Usecase';
import { STORE_REPOSITORY } from './applicationLayer/tokens/storeRepository.token';
import { GetAllStoreUseCase } from './applicationLayer/usercases/getAllStores.usecase';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Stores', schema: StoreModal },
      { name: 'Cakes', schema: CakeSchema },
    ]),

    forwardRef(() => CakeModule),
  ],
  controllers: [StoreController],
  providers: [
    CreateStoreUsecase,
    updateStoreUsecase,
    GetAllStoreCakesUsecase,
    GetAllStoreUseCase,
    getStoreUsecase,
    {
      provide: STORE_REPOSITORY, // string token for interface
      useClass: StoreRepositoryImplimentation,
    },
  ],
  exports: [getStoreUsecase],
})
export class StoreModule {}
