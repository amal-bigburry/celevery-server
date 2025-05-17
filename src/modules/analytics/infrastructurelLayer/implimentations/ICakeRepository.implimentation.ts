/**
 * Licensed to Bigburry Hypersystems LLP
 * All rights reserved. Unauthorized copying, redistribution or modification of this file, 
 * via any medium is strictly prohibited. Proprietary and confidential.
 */
/**
 * Importing the required packages
 * Importing interface, use case, entity and Injectable decorator
 */
import { ICakeRepositoryUseCase } from '../../applicationLayer/interfaces/ICakeRepositoryUseCase.interface';
import { GetCakeDetailsUseCase } from 'src/modules/cakes/applicationLayer/use-cases/GetCakeDetailsUseCase';
import { CakeEntity } from 'src/modules/cakes/domainLayer/entities/cake.entity';
import { Injectable } from '@nestjs/common';
/**
 * An injectable implementation of ICakeRepositoryUseCase interface
 * Delegates execution to GetCakeDetailsUseCase to fetch cake details by ID
 */
@Injectable()
export class ICakeRepositoryUseCaseImp implements ICakeRepositoryUseCase {
  /**
   * Constructor injects GetCakeDetailsUseCase dependency
   * @param GetCakeDetailsUseCase - Use case to get cake details
   */
  constructor(private readonly GetCakeDetailsUseCase: GetCakeDetailsUseCase) {}
  /**
   * Execute method calls GetCakeDetailsUseCase execute method with cake_id
   * @param cake_id - ID of the cake to fetch details for
   * @returns Promise resolving to CakeEntity details
   */
  async execute(cake_id: string): Promise<CakeEntity> {
    return await this.GetCakeDetailsUseCase.execute(cake_id);
  }
}
