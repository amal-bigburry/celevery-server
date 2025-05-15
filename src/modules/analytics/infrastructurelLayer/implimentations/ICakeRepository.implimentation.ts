/**
 * importing the required packages
 */
import { ICakeRepositoryUseCase } from '../../applicationLayer/interfaces/ICakeRepositoryUseCase.interface';
import { GetCakeDetailsUseCase } from 'src/modules/cakes/applicationLayer/use-cases/GetCakeDetailsUseCase';
import { CakeEntity } from 'src/modules/cakes/domainLayer/entities/cake.entity';
import { Injectable } from '@nestjs/common';
/**
 * An injectable file
 */
@Injectable()
export class ICakeRepositoryUseCaseImp implements ICakeRepositoryUseCase {
  constructor(private readonly GetCakeDetailsUseCase: GetCakeDetailsUseCase) {}
  async execute(cake_id: string): Promise<CakeEntity> {
    return await this.GetCakeDetailsUseCase.execute(cake_id);
  }
}
