/**
 * © Bigburry Hypersystems LLP. All rights reserved.
 * This source code is confidential and intended only for internal use.
 * Unauthorized copying, modification, distribution, or disclosure is prohibited.
 */
/**
 * importing required packages
 */
import { CakeEntity } from 'src/modules/cakes/domainLayer/entities/cake.entity';
import { FavouritesRepository } from '../../applicationLayer/interfaces/favouritesRepository.interface';
import { CakeDto } from 'src/modules/cakes/dtos/cake.dto';
import { AddToFavouritesUsecase } from 'src/modules/users/applicationLayer/use-cases/AddToFavourites.usecase';
import { GetMyFavouritesUsecase } from 'src/modules/users/applicationLayer/use-cases/GetMyFavourites.usecase';
import { RemoveMyFavouritesUsecase } from 'src/modules/users/applicationLayer/use-cases/RemoveMyFavourites.usecase';
import { Injectable } from '@nestjs/common';
/**
 * implementing document repository
 */
@Injectable()
export class FavouritesRepositoryImp implements FavouritesRepository {
  constructor(
    private readonly AddToFavouritesUsecase: AddToFavouritesUsecase,
    private readonly GetMyFavouritesUsecase: GetMyFavouritesUsecase,
    private readonly RemoveMyFavouritesUsecase: RemoveMyFavouritesUsecase,
  ) {}
    async add(user_id: string, cake_id: string): Promise<string> {
        let res = await this.AddToFavouritesUsecase.execute(user_id, cake_id)
        return 'done'
    }
    async remove(user_id: string, cake_id: string): Promise<string> {
        let res = await this.RemoveMyFavouritesUsecase.execute(user_id, cake_id)
        return 'done'
    }
    async get(user_id: string): Promise<Array<CakeEntity>> {
        let res = await this.GetMyFavouritesUsecase.execute(user_id)
        return res
    }
}
