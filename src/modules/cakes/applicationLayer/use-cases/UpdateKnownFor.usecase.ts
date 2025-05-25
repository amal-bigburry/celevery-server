/*
 * Company License: Bigburry Hypersystems LLP
 * All rights reserved © Bigburry Hypersystems LLP
 */
/**
 * Importing required packages for updating cake details
 */
import { Inject, Injectable } from '@nestjs/common';
import { CakeRepository } from '../interfaces/cake.repository';
import { CAKE_REPOSITORY } from '../../tokens/cakeRepository.token';
/**
 * Injectable service class to update the "known for" attribute of a cake
 */
@Injectable()
export class UpdateKnownFor {
  constructor(
    /**
     * Injecting CakeRepository to access cake update functionality
     */
    @Inject(CAKE_REPOSITORY) private readonly CakeRepository: CakeRepository,
  ) {}
  /**
   * Executes the update of the known_for property for a given cake
   * @param cake_id - The unique identifier of the cake to update
   * @param known_for - The new "known for" description to set
   * @returns Promise resolving to a string confirmation message
   */
  async execute(cake_id: string, known_for: string): Promise<string> {
    await this.CakeRepository.updateKnownfor(cake_id, known_for);
    return 'updated';
  }
}
