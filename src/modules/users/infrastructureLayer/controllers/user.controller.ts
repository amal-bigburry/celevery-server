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
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LoginDto } from '../../dtos/Login.dto';
import { RegisterDto } from '../../dtos/Register.dto';
import { LoginUseCase } from '../../applicationLayer/use-cases/login.usecase';
import { RegisterUseCase } from '../../applicationLayer/use-cases/register.usecase';
import { GetUserDetailUseCase } from '../../applicationLayer/use-cases/getUserDetail.usecase';
import { JwtAuthGuard } from 'src/middlewares/jwtauth.middleware';
import { AuthRequest } from 'src/middlewares/AuthRequest';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateProfileImageUseCase } from '../../applicationLayer/use-cases/updateProfileImage.usecase';
import { UpdateContactNumberUsecase } from '../../applicationLayer/use-cases/updateContactNumber.usecase';
import { Update_passwordUsecase } from '../../applicationLayer/use-cases/Update_password.usecase';
import { ResetPasswordDto } from '../../dtos/ResetPassword.dto';
import { UpdateContactNumberDto } from '../../dtos/UpdateContactNumber.dto';
import { AuthGuard } from '@nestjs/passport';
import { RegisterUsingGoogleUseCase } from '../../applicationLayer/use-cases/RegisterUsingGoogle.usecase';
import { LoginUsingGoogleUseCase } from '../../applicationLayer/use-cases/loginUsingGoogle.usecase';
import { Types } from 'mongoose';
import { GetMyFavouritesUsecase } from '../../applicationLayer/use-cases/GetMyFavourites.usecase';
import { AddToFavouritesUsecase } from '../../applicationLayer/use-cases/AddToFavourites.usecase';
import { RemoveMyFavouritesUsecase } from '../../applicationLayer/use-cases/RemoveMyFavourites.usecase';
/**
 * ******************************************************************************************************
 * AuthController Class
 *
 * Manages authentication and user management routes under the 'user' path. Routes include login, register,
 * and fetching authenticated user details. Applies JWT guard to protect sensitive data retrieval endpoints.
 * ******************************************************************************************************
 */
@Controller('user')
export class UserController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
    private readonly getUserDetailUseCase: GetUserDetailUseCase,
    private readonly UpdateProfileImageUseCase: UpdateProfileImageUseCase,
    private readonly UpdateContactNumberUsecase: UpdateContactNumberUsecase,
    private readonly update_passwordUsecase: Update_passwordUsecase,
    private readonly loginUsingGoogleUseCase: LoginUsingGoogleUseCase,
    private readonly registerUsingGoogleUseCase: RegisterUsingGoogleUseCase,
    private readonly GetMyFavouritesUsecase: GetMyFavouritesUsecase,
    private readonly AddToFavouritesUsecase: AddToFavouritesUsecase,
    private readonly RemoveMyFavouritesUsecase: RemoveMyFavouritesUsecase,
  ) {}
  /**
   * **************************************************************************************************
   * login Method
   *
   * Handles POST requests to 'user/login', accepts login credentials in LoginDto format, and delegates
   * authentication logic to the login use case, returning an access token on success.
   * **************************************************************************************************
   */
  @HttpCode(HttpStatus.CREATED)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.loginUseCase.execute(loginDto);
  }

  @HttpCode(HttpStatus.CREATED)
  @Get('login/google')
  @UseGuards(AuthGuard('login'))
  async googleAuthLogin(@Req() req) {
    // initiates the Google OAuth2 login flow
  }

  @HttpCode(HttpStatus.CREATED)
  @Get('login/google/redirect')
  @UseGuards(AuthGuard('login'))
  async googleAuthLoginRedirect(@Req() req) {
    // return req.user['email']
    let data = {
      email: req.user['email'],
    };
    return await this.loginUsingGoogleUseCase.execute(data); // or redirect, store user in DB, etc.
    // initiates the Google OAuth2 login flow
  }
  /**
   * **************************************************************************************************
   * register Method
   *
   * Handles POST requests to 'user/register', accepts user registration details in RegisterDto format, and
   * delegates creation logic to the register use case, returning the created user information.
   * **************************************************************************************************
   */
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() RegisterDto: RegisterDto) {
    return this.registerUseCase.execute(RegisterDto);
  }

  @Get('register/google')
  @UseGuards(AuthGuard('register'))
  async googleAuthregister(@Req() req) {
    // initiates the Google OAuth2 login flow
  }

  @Get('register/google/redirect')
  @UseGuards(AuthGuard('register'))
  async googleAuthRegisterRedirect(@Req() req) {
    // return req.user['email']
    let data = {
      email: req.user['email'],
      display_name: req.user['display_name'],
      profile_url: req.user['picture'],
    };
    return await this.registerUsingGoogleUseCase.execute(data); // or redirect, store user in DB, etc.
  }

  /**
   * **************************************************************************************************
   * getUserDetails Method
   *
   * Handles GET requests to 'user' endpoint, protected by JWT guard to ensure only authenticated users can
   * access their user details. Retrieves user ID from the request and delegates fetching to the appropriate use case.
   * **************************************************************************************************
   */
  @HttpCode(HttpStatus.OK)
  @Get()
  @UseGuards(JwtAuthGuard)
  async getUserDetails(@Req() request: AuthRequest) {
    return this.getUserDetailUseCase.execute(request.user['userId']);
  }

  @HttpCode(HttpStatus.OK)
  @Put('password')
  async update_password(@Body() ResetPasswordDto: ResetPasswordDto) {
    let res = await this.update_passwordUsecase.execute(ResetPasswordDto);
    return res;
  }

  @HttpCode(HttpStatus.OK)
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

  @HttpCode(HttpStatus.OK)
  @Put('contact_number')
  @UseGuards(JwtAuthGuard)
  async update_contact_number(
    @Req() request: AuthRequest,
    @Body() UpdateContactNumberDto: UpdateContactNumberDto,
  ) {
    let res = await this.UpdateContactNumberUsecase.execute(
      request.user['userId'],
      UpdateContactNumberDto,
    );
    return res;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('favourites')
  @UseGuards(JwtAuthGuard)
  async add_to_favourites(
    @Body() cake_id: { cake_id: string },
    @Req() request: AuthRequest,
  ) {
    if (!cake_id) {
      throw new BadRequestException('Body needs cake_id');
    }
    const isValidObjectId = Types.ObjectId.isValid(cake_id.cake_id);
    if (!isValidObjectId) {
      throw new BadRequestException('Invalid MongoDB ObjectId');
    }
    await this.AddToFavouritesUsecase.execute(
      request.user['userId'],
      cake_id.cake_id,
    );
    return 'added';
  }
  /**
   * post request to send message
   */

  @HttpCode(HttpStatus.OK)
  @Get('favourites')
  @UseGuards(JwtAuthGuard)
  async get_favourites(@Body() cake_id: string, @Req() request: AuthRequest) {
    let res = await this.GetMyFavouritesUsecase.execute(request.user['userId']);
    return res;
  }
  /**
   * post request to send message
   */

  @HttpCode(HttpStatus.OK)
  @Delete('favourites')
  @UseGuards(JwtAuthGuard)
  async delete_favourites(
    @Body() cake: { cake_id: string },
    @Req() request: AuthRequest,
  ) {
    if (!cake) {
      throw new BadRequestException('Body needs cake_id');
    }
    let res = await this.RemoveMyFavouritesUsecase.execute(
      request.user['userId'],
      cake.cake_id,
    );
    return res;
  }
}
