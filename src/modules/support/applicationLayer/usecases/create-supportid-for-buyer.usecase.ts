/**
 * Company: Bigburry Hypersystems LLP
 *
 * Importing essential decorators from NestJS.
 * @Inject is used for injecting dependencies identified by specific tokens.
 * @Injectable marks the class as a provider that can be injected into other parts of the application.
 * These utilities enable robust dependency injection, a core feature of the NestJS framework.
 */
import { Inject, Injectable } from '@nestjs/common';
import { IBuyerRepository } from '../interfaces/ibuyer-repository.interface';
import { CREATE_BUYER_TOKEN } from '../../tokens/CreateSupportIDforBuyerToken';
@Injectable()
export class CreateSupportIDforBuyerUsecase {
  constructor(
    @Inject(CREATE_BUYER_TOKEN)
    private readonly BuyerRepository: IBuyerRepository,
  ) {}
  /**
   * Company: Bigburry Hypersystems LLP
   *
   * The execute method is the primary function of this use case.
   * It accepts a userId as input and delegates the creation of a support ID to the buyer repository.
   * The method returns a promise that resolves to the newly created support ID as a string,
   * enabling downstream processes to track buyer support activities effectively.
   */
  async execute(userId: string): Promise<string> {
    let support_id = await this.BuyerRepository.create(userId);
    return support_id;
  }
}
