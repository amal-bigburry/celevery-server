/**
 * Company License: Bigburry Hypersystems LLP
 * 
 * This file defines the implementation of the UpdateKnownForOfCakeUseCase interface. 
 * It provides a method to update the "known for" attribute of a cake, which is a description or 
 * a characteristic that identifies the cake (e.g., a famous flavor, style, or special feature).
 * 
 * The UpdateKnownForOfCakeUseCaseImp class interacts with the UpdateKnownFor use case to perform
 * the update operation and returns a confirmation message once the update is successful.
 * 
 * Dependencies:
 * - UpdateKnownFor: A use case responsible for updating the known-for attribute of a cake in the database.
 * 
 * The execute method in this class accepts a cake ID and a new "known for" string, 
 * invoking the update operation and returning a success message.
 */
import { Injectable } from '@nestjs/common';
import { UpdateKnownFor } from 'src/modules/cakes/applicationLayer/use-cases/update-knownfor.usecase';
import { UpdateKnownForInterface } from 'src/modules/orders/applicationLayer/interfaces/update-knownfor.interface';
@Injectable()
export class UpdateKnownForOfCakeUseCaseImp
  implements UpdateKnownForInterface
{
  /**
   * Constructor to inject the UpdateKnownFor use case.
   * This class depends on the UpdateKnownFor use case to update the "known for" attribute of cakes.
   */
  constructor(private readonly updateKnownFor: UpdateKnownFor) {}
  /**
   * Executes the update operation for a cake's "known for" attribute.
   * 
   * @param cake_id The ID of the cake to be updated.
   * @param known_for A string representing the new description of the cake's "known for".
   * @returns A success message indicating that the update operation was successful.
   */
  async execute(cake_id: string, known_for: string): Promise<string> {
    // Calls the UpdateKnownFor use case to perform the update operation
    await this.updateKnownFor.execute(cake_id, known_for);
    // Returns a success message once the update is completed
    return 'updated knownfor';
  }
}
