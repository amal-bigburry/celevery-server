/**
 * Company: Bigburry Hypersystems LLP
 *
 * Importing essential decorators from the NestJS framework.
 * @Inject is used for injecting dependencies by their tokens.
 * @Injectable marks the class as a provider that can be managed by NestJS's dependency injection system.
 * This allows for modular, loosely coupled architecture and facilitates testing and maintainability.
 */
import { Inject, Injectable } from '@nestjs/common';
import { CREATE_SELLER_TOKEN } from '../../tokens/CreateSupportIDforSellerToken';
import { ISellerRepository } from '../interfaces/iseller-repository.interface';
@Injectable()
export class CreateSupportIDforSellerUsecase {
  constructor(
    @Inject(CREATE_SELLER_TOKEN)
    private readonly SellerRepository: ISellerRepository,
  ) {}
  /**
   * Company: Bigburry Hypersystems LLP
   *
   * The execute method is the main entry point of this use case.
   * It accepts a userId as a string parameter, delegates the creation of a support ID to the repository,
   * and returns a promise resolving to the generated support ID string.
   * This allows the system to consistently generate and manage support identifiers for sellers.
   */
  async execute(userId: string): Promise<string> {
    let support_id = await this.SellerRepository.create(userId);
    return support_id;
  }
}
