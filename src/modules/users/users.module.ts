/**
 * IMports all the required packages into the system
 */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './infrastructureLayer/controllers/user.controller';
import { FcmController } from './infrastructureLayer/controllers/fcmtoken.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './applicationLayer/repositories/user.schema';
import { JwtStrategy } from 'src/middlewares/jwt.strategy';
import { LoginUseCase } from './applicationLayer/use-cases/login.usecase';
import { RegisterUseCase } from './applicationLayer/use-cases/register.usecase';
import { UpdatefcmUseCase } from './applicationLayer/use-cases/updatefcm.usecase';
import { Getcurrentfcmusecase } from './applicationLayer/use-cases/getcurrentfcm.usecase';
import { GetUserDetailUseCase } from './applicationLayer/use-cases/getUserDetail.usecase';
import { UserRepositoryImpl } from './infrastructureLayer/repositories/user/user.repository.imp';
import { USER_REPOSITORY } from './applicationLayer/tokens/userRepository.token';
/**
 * module
 */
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }]),
    JwtModule.registerAsync({
      imports: [ConfigModule], // ✅ import config module
      inject: [ConfigService], // ✅ inject config service
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWTSECRET'), // ✅ read from .env
        signOptions: {
          expiresIn: `${configService.get<string>('JWTEXPIRESIN')}`,
        },
      }),
    }),
  ],
  controllers: [AuthController, FcmController],
  providers: [
    JwtStrategy,
    LoginUseCase,
    RegisterUseCase,
    UpdatefcmUseCase,
    Getcurrentfcmusecase,
    GetUserDetailUseCase,
    {
      provide: USER_REPOSITORY, // ✅ token-based provider
      useClass: UserRepositoryImpl,
    },
  ],
  exports: [GetUserDetailUseCase],
})
export class UserModule {}
