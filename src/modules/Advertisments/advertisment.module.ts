/**
 * @module AdvertismentModule
 * @description
 * This module is part of the Bigburry Hypersystems LLP codebase, designed to encapsulate
 * the functionality related to hero entities within the system. It imports necessary
 * dependencies such as Mongoose schemas, controllers, and use cases to properly organize
 * and manage the hero-related operations. This module ensures separation of concerns by
 * clearly defining the controller layer, use case services, and repository implementations.
 *
 * Company: Bigburry Hypersystems LLP
 * All rights reserved © Bigburry Hypersystems LLP
 */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HeroController } from './InfrastructureLayer/controllers/hero.controller';
import { CreateHerosUseCase } from './applicationLayer/usecases/create-hero.usecase';
import { DeleteHerosUseCase } from './applicationLayer/usecases/delete-hero.usecase';
import { GetHerosUseCase } from './applicationLayer/usecases/get-hero.usecase';
import { HerosRepositoryImp } from './InfrastructureLayer/implimentations/InternalImplimentations/hero.implimentation';
import { HEROINTERFACETOKEN } from './tokens/HeroRepository.token';
import { HeroSchema } from 'src/common/databaseModels/hero.model';

/**
 * @description
 * The @Module decorator organizes the module by defining imports, controllers,
 * providers, and exports. This facilitates dependency injection and modular
 * architecture in the NestJS framework.
 *
 * @imports
 * - MongooseModule: Integrates MongoDB schemas specifically for Hero entities,
 *   allowing the application to interact with the database using defined schema structures.
 *
 * @controllers
 * - HeroController: Responsible for managing incoming HTTP requests related to heroes,
 *   forwarding them to appropriate service layers, and returning responses.
 *
 * @providers
 * - CreateHerosUseCase: Encapsulates business logic for creating new hero records.
 * - DeleteHerosUseCase: Contains logic to delete hero records from the database.
 * - GetHerosUseCase: Implements the retrieval of hero records according to various criteria.
 * - HerosRepositoryImp: Concrete repository implementation that provides data persistence
 *   methods fulfilling the HERO_REPOSITORY interface contract.
 *
 * @exports
 * - Currently, no services are exported from this module, implying internal usage.
 *
 * Company: Bigburry Hypersystems LLP
 * All rights reserved © Bigburry Hypersystems LLP
 */
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'HeroRepository', schema: HeroSchema }]),
  ],
  controllers: [HeroController],
  providers: [
    CreateHerosUseCase,
    DeleteHerosUseCase,
    GetHerosUseCase,
    {
      provide: HEROINTERFACETOKEN,
      useClass: HerosRepositoryImp,
    },
  ],
  exports: [],
})
export class AdvertismentModule {}
