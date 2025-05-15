/**
 * importing all the required packages
 */
import { UserEntity } from '../../domainLayer/entities.ts/user.entity';
import { RegisterDto } from '../../UserDtos/Register.dto';
import { TokenDto } from '../../UserDtos/token.dto';
/**
 * interface to get the user repository
 */
export interface UserRepository {
  findByEmail(email: string): Promise<UserEntity | null>;
  createUser(RegisterDto: RegisterDto): Promise<UserEntity | null>;
  updatefcm(userid: string, token: TokenDto): Promise<string>;
  getfcm(userid: string): Promise<string>;
  findById(userid: string): Promise<UserEntity | null>;
}
