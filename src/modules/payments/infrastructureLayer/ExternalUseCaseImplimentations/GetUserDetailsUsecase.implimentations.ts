/**
 * importing required packages
 */
import { GetUserDetailUseCase } from 'src/modules/users/applicationLayer/use-cases/getUserDetail.usecase';
import { UserEntity } from 'src/modules/users/domainLayer/entities.ts/user.entity';
import { IGetUserDetailUseCase } from '../../applicationLayer/interfaces/GetuserDetailsUsecase.interface';
import { Injectable } from '@nestjs/common';
/**
 * injectable file
 */
@Injectable()
export class IGetUserDetailsUsecaseImp implements IGetUserDetailUseCase {
  constructor(private readonly getUserDetailUseCase: GetUserDetailUseCase) {}
  execute(user_id: string): Promise<UserEntity> {
    return this.getUserDetailUseCase.execute(user_id);
  }
}
