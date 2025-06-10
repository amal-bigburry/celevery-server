/*
 * Company License: Bigburry Hypersystems LLP
 * All rights reserved © Bigburry Hypersystems LLP
 */
/**
 * Importing required packages for updating cake details
 */
import { Inject, Injectable } from '@nestjs/common';
import { CakeInterface } from '../interfaces/cake.interface';
import { CAKEINTERFACETOKEN } from '../../tokens/cake.token';
/**
 * Injectable service class to update the "known for" attribute of a cake
 */
@Injectable()
export class UpdateKnownFor {
  constructor(
    @Inject(CAKEINTERFACETOKEN) private readonly CakeInterface: CakeInterface,
  ) {}
  /**
   * Executes the update of the known_for property for a given cake
   * @param cake_id - The unique identifier of the cake to update
   * @param known_for - The new "known for" description to set
   * @returns Promise resolving to a string confirmation message
   */
  async execute(cake_id: string, known_for: string): Promise<string> {
    await this.CakeInterface.updateKnownfor(cake_id, known_for);
    return 'updated';
  }
}
