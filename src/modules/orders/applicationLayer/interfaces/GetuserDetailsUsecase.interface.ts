import { UserEntity } from "src/modules/users/domainLayer/entities.ts/user.entity";

export interface IGetUserDetailUseCase {
  execute(userid:string): Promise<UserEntity>;
}