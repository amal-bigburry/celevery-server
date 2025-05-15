/**
 * importing the user entity
 */
import { UserEntity } from 'src/modules/users/domainLayer/entities.ts/user.entity';
/**
 * interface to get the user details
 */
export interface IGetUserDetailUseCase {
  execute(userid: string): Promise<UserEntity>;
}
