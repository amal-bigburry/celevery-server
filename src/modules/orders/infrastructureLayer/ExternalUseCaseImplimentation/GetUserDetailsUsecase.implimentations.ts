import { Injectable } from '@nestjs/common';
import { IGetUserDetailUseCase } from '../../applicationLayer/interfaces/GetuserDetailsUsecase.interface';
import { GetUserDetailUseCase } from 'src/modules/users/applicationLayer/use-cases/getUserDetail.usecase';
import { UserEntity } from 'src/modules/users/domainLayer/entities.ts/user.entity';

@Injectable()
export class IGetUserDetailsUsecaseImp implements IGetUserDetailUseCase {
  constructor(private readonly getUserDetailUseCase: GetUserDetailUseCase) {}
  async execute(user_id: string): Promise<UserEntity> {
    return await this.getUserDetailUseCase.execute(user_id);
  }
}
