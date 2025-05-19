/**
 * © Bigburry Hypersystems LLP. All rights reserved.
 * This source code is confidential and intended only for internal use.
 * Unauthorized copying, modification, distribution, or disclosure is prohibited.
 */
/**
 * importing the required packages
 */
import { Module } from '@nestjs/common';
import { FavouritesController } from './infrastructureLayer/controllers/favourites.controller';
import { UserModule } from '../users/users.module';
import { AddToFavouritesUsecase } from './applicationLayer/usecases/AddToFavourites.usecase';
import { FAVOURITES_TOKEN } from './tokens/favoritesRepository.token';
import { FavouritesRepositoryImp } from './infrastructureLayer/implimentations/favouritesRepository.implimentation';
import { GetMyFavouritesUsecase } from './applicationLayer/usecases/GetMyFavourites.usecase';
import { RemoveMyFavouritesUsecase } from './applicationLayer/usecases/RemoveMyFavourites.usecase';
/**
 * module definition for mqtt handling
 */
@Module({
  imports: [
    UserModule
  ],
  controllers: [FavouritesController],
  providers: [
    AddToFavouritesUsecase,
    GetMyFavouritesUsecase,
    RemoveMyFavouritesUsecase,
    {
      provide: FAVOURITES_TOKEN, // Interface to concrete UpdateKnownForOfCakeUseCase implementation
      useClass: FavouritesRepositoryImp,
    },
  ],
})
export class FavouritesModule  {}
