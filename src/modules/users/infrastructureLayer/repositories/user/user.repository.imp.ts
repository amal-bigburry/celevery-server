/**
 * importing the requred packages
 */
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEntity } from 'src/modules/users/domainLayer/entities.ts/user.entity';
import { UserRepository } from 'src/modules/users/applicationLayer/repositories/user.repositoty';
import { RegisterDto } from 'src/modules/users/UserDtos/Register.dto';
import { TokenDto } from 'src/modules/users/UserDtos/token.dto';
import { BadRequestException } from '@nestjs/common';
/**
 * implimentation of user repository
 */
export class UserRepositoryImpl implements UserRepository {
  constructor(@InjectModel('Users') private userModel: Model<UserEntity>) {}
  /**
   * find the user by email
   */
  async findByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) return null;
    return new UserEntity(
      user._id.toString(), // id
      user.display_name, // display_name
      user.contact_number,
      user.email, // email_id
      user.password,
      user.fcm_token,
    );
  }
  /**
   * find the user by id
   */
  async findById(userid: string): Promise<UserEntity | null> {
    const user = this.userModel.findById(userid).exec();
    return user;
  }
  /**
   * create the user
   */
  async createUser(RegisterDto: RegisterDto): Promise<UserEntity> {
    const user = await this.userModel
      .findOne({ email: RegisterDto.email })
      .exec();
    if (user) throw new BadRequestException('User already exists');
    const newUser = new this.userModel(RegisterDto);
    return newUser.save();
  }
  /**
   * update the fcm
   */
  async updatefcm(userid: string, token: TokenDto): Promise<string> {
    let user = await this.userModel.findByIdAndUpdate(userid, token).exec();
    if (!user) return '';
    return 'ok';
  }
  /**
   * get the fcm
   */
  async getfcm(userid: string): Promise<string> {
    const user = await this.userModel.findById(userid).exec();
    if (!user) return '';
    return user.fcm_token;
  }
}
