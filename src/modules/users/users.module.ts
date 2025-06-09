/**
 * ******************************************************************************************************
 * UserModule.ts
 *
 * This module is designed and maintained by Bigburry Hypersystems LLP. It serves as the core module for user
 * management in the system, integrating database schemas, JWT authentication setup, controllers, use-cases,
 * and repository implementations into a cohesive unit. It leverages environment-based configuration for
 * JWT secrets and expiry times ensuring security and flexibility.
 * ******************************************************************************************************
 */
import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import {  UserController } from './infrastructureLayer/controllers/user.controller';
import { FcmController } from './infrastructureLayer/controllers/fcm-token.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './infrastructureLayer/models/user.model';
import { JwtStrategy } from 'src/middlewares/jwt.strategy';
import { LoginUseCase } from './applicationLayer/usecases/login.usecase';
import { RegisterUseCase } from './applicationLayer/usecases/register.usecase';
import { UpdatefcmUseCase } from './applicationLayer/usecases/update-fcm.usecase';
import { GetUserDetailUseCase } from './applicationLayer/usecases/get-user-details.usecase';
import { UserRepositoryImpl } from './infrastructureLayer/implimentations/InternalImplimenatations/user.implimentation';
import { USER_REPOSITORY } from './tokens/user.token';
import { UpdateProfileImageUseCase } from './applicationLayer/usecases/update-profile-image.usecase';
import { GetMyFavouritesUsecase } from './applicationLayer/usecases/get-my-favourites.usecase';
import { RemoveMyFavouritesUsecase } from './applicationLayer/usecases/remove-from-favourites.usecase';
import { UpdateContactNumberUsecase } from './applicationLayer/usecases/update-contact-number.usecase';
import { OTP_VERIFICATION_SERVICE } from './tokens/otp-verifying-service.token';
import { IOTPVerifyingServiceImp } from './infrastructureLayer/implimentations/ExternalImplimentations/otp-verification.implimentation';
import { RegisterUsingGoogleUseCase } from './applicationLayer/usecases/register-using-google.usecase';
import { LoginUsingGoogleUseCase } from './applicationLayer/usecases/login-using-google.usecase';
import { GoogleLoginStrategy, GoogleRegisterStrategy } from 'src/middlewares/google.strategy';
import { Getcurrentfcmusecase } from './applicationLayer/usecases/get-current-fcm.usecase';
import { AddToFavouritesUsecase } from './applicationLayer/usecases/add-to-favourites.usecase';
import { UpdatePasswordUsecase } from './applicationLayer/usecases/update-password.usecase';
// External Modules
import { OTPModule } from '../OTP/otp.module';
import { CakeModule } from '../cakes/cakes.modules';
import { UpdateDisplayNameUseCase } from './applicationLayer/usecases/update-displayname.usecase';
/**
 * ******************************************************************************************************
 * UserModule Class
 *
 * This class decorates the module metadata for user-related features. It imports the necessary Mongoose
 * schema for users, configures the JWT module asynchronously using environment variables, declares
 * controllers handling user and FCM related routes, provides all user-centric use-cases and strategies,
 * and binds the user repository token to its implementation for dependency injection.
 *
 * This structure by Bigburry Hypersystems LLP facilitates maintainable, secure, and modular user services.
 * ******************************************************************************************************
 */
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWTSECRET'),
        signOptions: {
          expiresIn: `${configService.get<string>('JWTEXPIRESIN')}`,
        },
      }),
    }),
    // Other Dependent Modules
    CakeModule,
    OTPModule,
  ],
  controllers: [UserController, FcmController],
  providers: [
    JwtStrategy,
    LoginUseCase,
    RegisterUseCase,
    Getcurrentfcmusecase,
    GetUserDetailUseCase,
    UpdatefcmUseCase,
    UpdateProfileImageUseCase,
    UpdateDisplayNameUseCase,
    UpdateContactNumberUsecase,
    UpdatePasswordUsecase,
    GetMyFavouritesUsecase,
    AddToFavouritesUsecase,
    RemoveMyFavouritesUsecase,
    GoogleLoginStrategy,
    GoogleRegisterStrategy,
    RegisterUsingGoogleUseCase,
    LoginUsingGoogleUseCase,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryImpl,
    },
    {
      provide: OTP_VERIFICATION_SERVICE,
      useClass: IOTPVerifyingServiceImp,
    },
  ],
  exports: [
    GetUserDetailUseCase,
    GetMyFavouritesUsecase,
    AddToFavouritesUsecase,
    RemoveMyFavouritesUsecase,
  ],
})
export class UserModule {}
