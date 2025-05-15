/**
 * importing the required packages
 */
import { GetCakeDetailsUseCase } from 'src/modules/cakes/applicationLayer/use-cases/GetCakeDetailsUseCase';
import { IGetCakeDetailsUseCase } from '../../applicationLayer/interfaces/GetCakeDetailsusecase.interface';
import { CakeEntity } from 'src/modules/cakes/domainLayer/entities/cake.entity';
import { Injectable } from '@nestjs/common';
/**
 * inijectable
 */
@Injectable()
export class IGetCakeDetailsUseCaseImp implements IGetCakeDetailsUseCase {
  constructor(private readonly getCakeDetailsUseCase: GetCakeDetailsUseCase) {}
  execute(cake_id: string): Promise<CakeEntity> {
    return this.getCakeDetailsUseCase.execute(cake_id);
  }
}
