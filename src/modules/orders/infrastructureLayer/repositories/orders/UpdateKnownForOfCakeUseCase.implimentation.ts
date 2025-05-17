import { Injectable } from '@nestjs/common';
import { UpdateKnownFor } from 'src/modules/cakes/applicationLayer/use-cases/UpdateKnownFor.usecase';
import { UpdateKnownForOfCakeUseCase } from 'src/modules/orders/applicationLayer/interfaces/UpdateKnownForOfCakeUseCase.interface';

@Injectable()
export class UpdateKnownForOfCakeUseCaseImp
  implements UpdateKnownForOfCakeUseCase
{
  constructor(private readonly updateKnownFor: UpdateKnownFor) {}
  async execute(cake_id: string, known_for: string): Promise<string> {
    await this.updateKnownFor.execute(cake_id, known_for);
    return 'updated knownfor'
  }
}
