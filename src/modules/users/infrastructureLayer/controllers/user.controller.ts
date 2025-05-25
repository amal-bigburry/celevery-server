/**
 * ******************************************************************************************************
 * AuthController.ts
 *
 * This controller by Bigburry Hypersystems LLP handles user-related HTTP routes including login, registration,
 * and fetching user details. It organizes endpoints using NestJS decorators and secures protected routes with
 * JWT authentication middleware to ensure only authorized access.
 *
 * The controller delegates business logic to injected use cases for login, registration, and user detail retrieval,
 * maintaining a clear separation between routing and application logic.
 * ******************************************************************************************************
 */
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LoginDto } from '../../UserDtos/Login.dto';
import { RegisterDto } from '../../UserDtos/Register.dto';
import { LoginUseCase } from '../../applicationLayer/use-cases/login.usecase';
import { RegisterUseCase } from '../../applicationLayer/use-cases/register.usecase';
import { GetUserDetailUseCase } from '../../applicationLayer/use-cases/getUserDetail.usecase';
import { JwtAuthGuard } from 'src/middlewares/jwtauth.middleware';
import { AuthRequest } from 'src/middlewares/AuthRequest';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateProfileImageUseCase } from '../../applicationLayer/use-cases/updateProfileImage.usecase';
import { UpdateContactNumberUsecase } from '../../applicationLayer/use-cases/updateContactNumber.usecase';
import { Update_passwordUsecase } from '../../applicationLayer/use-cases/Update_password.usecase';
import { ResetPasswordDto } from '../../UserDtos/ResetPassword.dto';
import { UpdateContactNumberDto } from '../../UserDtos/UpdateContactNumber.dto';
/**
 * ******************************************************************************************************
 * AuthController Class
 *
 * Manages authentication and user management routes under the 'user' path. Routes include login, register,
 * and fetching authenticated user details. Applies JWT guard to protect sensitive data retrieval endpoints.
 * ******************************************************************************************************
 */
@Controller('user')
export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
    private readonly getUserDetailUseCase: GetUserDetailUseCase,
    private readonly UpdateProfileImageUseCase: UpdateProfileImageUseCase,
    private readonly UpdateContactNumberUsecase: UpdateContactNumberUsecase,
    private readonly update_passwordUsecase: Update_passwordUsecase,
  ) {}
  /**
   * **************************************************************************************************
   * login Method
   *
   * Handles POST requests to 'user/login', accepts login credentials in LoginDto format, and delegates
   * authentication logic to the login use case, returning an access token on success.
   * **************************************************************************************************
   */
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.loginUseCase.execute(loginDto);
  }
  /**
   * **************************************************************************************************
   * getUserDetails Method
   *
   * Handles GET requests to 'user' endpoint, protected by JWT guard to ensure only authenticated users can
   * access their user details. Retrieves user ID from the request and delegates fetching to the appropriate use case.
   * **************************************************************************************************
   */
  @Get()
  @UseGuards(JwtAuthGuard)
  async getUserDetails(@Req() request: AuthRequest) {
    return this.getUserDetailUseCase.execute(request.user['userId']);
  }
  /**
   * **************************************************************************************************
   * register Method
   *
   * Handles POST requests to 'user/register', accepts user registration details in RegisterDto format, and
   * delegates creation logic to the register use case, returning the created user information.
   * **************************************************************************************************
   */


  @Post('register')
  async register(@Body() RegisterDto: RegisterDto) {
    return this.registerUseCase.execute(RegisterDto);
  }

  @Put('password')
  async update_password(
    @Body() ResetPasswordDto: ResetPasswordDto,
  ) {

    let res = await this.update_passwordUsecase.execute(
      ResetPasswordDto,
    );
    return res;
  }

  @Put('profileimg')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async update_profileimage(
    @UploadedFile() file: Express.Multer.File,
    @Req() request: AuthRequest,
  ) {
    if (!file) {
      throw new BadRequestException(
        'Please upload the profile image with the key as file',
      );
    }
    return await this.UpdateProfileImageUseCase.execute(
      request.user['userId'],
      file,
    );
  }

  @Put('contact_number')
  @UseGuards(JwtAuthGuard)
  async update_contact_number(
    @Req() request: AuthRequest,
    @Body() UpdateContactNumberDto: UpdateContactNumberDto,
  ) {

    let res =  await this.UpdateContactNumberUsecase.execute(
      request.user['userId'],
      UpdateContactNumberDto,
    );

    return res
  }
}
