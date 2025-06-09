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
import { LoginDto } from '../../../../common/dtos/Login.dto';
import { RegisterDto } from '../../../../common/dtos/Register.dto';
import { LoginUseCase } from '../../applicationLayer/usecases/login.usecase';
import { RegisterUseCase } from '../../applicationLayer/usecases/register.usecase';
import { JwtAuthGuard } from 'src/middlewares/jwtauth.middleware';
import { AuthRequest } from 'src/middlewares/AuthRequest';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateProfileImageUseCase } from '../../applicationLayer/usecases/update-profile-image.usecase';
import { UpdateContactNumberUsecase } from '../../applicationLayer/usecases/update-contact-number.usecase';
import { ResetPasswordDto } from '../../../../common/dtos/ResetPassword.dto';
import { UpdateContactNumberDto } from '../../../../common/dtos/update-contact-number.dto';
import { AuthGuard } from '@nestjs/passport';
import { RegisterUsingGoogleUseCase } from '../../applicationLayer/usecases/register-using-google.usecase';
import { LoginUsingGoogleUseCase } from '../../applicationLayer/usecases/login-using-google.usecase';
import { Types } from 'mongoose';
import { GetMyFavouritesUsecase } from '../../applicationLayer/usecases/get-my-favourites.usecase';
import { AddToFavouritesUsecase } from '../../applicationLayer/usecases/add-to-favourites.usecase';
import { RemoveMyFavouritesUsecase } from '../../applicationLayer/usecases/remove-from-favourites.usecase';
import { UpdatePasswordUsecase } from '../../applicationLayer/usecases/update-password.usecase';
import { GetUserDetailUseCase } from '../../applicationLayer/usecases/get-user-details.usecase';
import { UpdateStoreDto } from 'src/common/dtos/udpate-store.dto';
import { UpdateDisplayNameUseCase } from '../../applicationLayer/usecases/update-displayname.usecase';
import { UpdateUserDto } from 'src/common/dtos/udpate-user.dto';
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
    private readonly UpdateDisplayNameUseCase: UpdateDisplayNameUseCase,
    private readonly UpdateContactNumberUsecase: UpdateContactNumberUsecase,
    private readonly update_passwordUsecase: UpdatePasswordUsecase,
    private readonly loginUsingGoogleUseCase: LoginUsingGoogleUseCase,
    private readonly registerUsingGoogleUseCase: RegisterUsingGoogleUseCase,
    private readonly GetMyFavouritesUsecase: GetMyFavouritesUsecase,
    private readonly AddToFavouritesUsecase: AddToFavouritesUsecase,
    private readonly RemoveMyFavouritesUsecase: RemoveMyFavouritesUsecase,
  ) {}
  /**
   * Handles POST 'user/login', accepts LoginDto, delegates to loginUseCase, returns access token on success.
   */
  @HttpCode(HttpStatus.CREATED)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.loginUseCase.execute(loginDto);
  }
  /**
   * Initiates Google OAuth2 login flow.
   */
  @HttpCode(HttpStatus.CREATED)
  @Get('login/google')
  @UseGuards(AuthGuard('login'))
  async googleAuthLogin(@Req() req) {}
  /**
   * Handles Google OAuth2 login redirect, retrieves user email, and logs in via Google use case.
   */
  @HttpCode(HttpStatus.CREATED)
  @Get('login/google/redirect')
  @UseGuards(AuthGuard('login'))
  async googleAuthLoginRedirect(@Req() req) {
    let data = { email: req.user['email'] };
    return await this.loginUsingGoogleUseCase.execute(data);
  }
  /**
   * Handles user registration by accepting RegisterDto and delegating to register use case.
   */
  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async register(@Body() RegisterDto: RegisterDto) {
    return this.registerUseCase.execute(RegisterDto);
  }
  /**
   * Initiates Google OAuth2 registration flow.
   */
  @Get('register/google')
  @UseGuards(AuthGuard('register'))
  async googleAuthregister(@Req() req) {
    // initiates the Google OAuth2 login flow
  } /**
   * Handles Google OAuth2 registration redirect, extracts user info, and registers via Google use case.
   */
  @Get('register/google/redirect')
  @UseGuards(AuthGuard('register'))
  async googleAuthRegisterRedirect(@Req() req) {
    let data = {
      email: req.user['email'],
      display_name: req.user['display_name'],
      profile_url: req.user['picture'],
    };
    return await this.registerUsingGoogleUseCase.execute(data);
  }
  /**
   * Retrieves authenticated user details using JWT guard for authorization.
   */
  @HttpCode(HttpStatus.OK)
  @Get()
  @UseGuards(JwtAuthGuard)
  async getUserDetails(@Req() request: AuthRequest) {
    return this.getUserDetailUseCase.execute(request.user['userId']);
  }
  /**
   * Updates the user's password.
   * @param ResetPasswordDto - Data Transfer Object containing email and new password.
   * @returns Result message after password update.
   */
  @HttpCode(HttpStatus.OK)
  @Put('password')
  async update_password(@Body() ResetPasswordDto: ResetPasswordDto) {
    let res = await this.update_passwordUsecase.execute(ResetPasswordDto);
    return res;
  }
  /**
   * Updates the user's profile image.
   * Protected route requiring JWT authentication.
   * Accepts an uploaded file with key 'file' and updates the user's profile image URL.
   * @param file - Uploaded profile image file.
   * @param request - Authenticated request containing user info.
   * @returns Result message after profile image update.
   */
  @HttpCode(HttpStatus.OK)
  @Put()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async update_profileimage(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UpdateUserDto,
    @Req() request: AuthRequest,
  ) {
    if (!body) {
      throw new BadRequestException('Body needs user key and value');
    }
    if (body.key == 'profileimg') {
      if (!file) {
        throw new BadRequestException(
          'Please upload the profile image with the key as file',
        );
      }
      return await this.UpdateProfileImageUseCase.execute(
        request.user['userId'],
        file,
      );
    } else if (body.key == 'contact_number') {
      if (!body.value || !body.value.UUID || !body.value.OTP) {
        throw new BadRequestException(
          'Body needs value with UUID and OTP for contact number update',
        );
      }
      let res = await this.UpdateContactNumberUsecase.execute(
        request.user['userId'],
        body.value as UpdateContactNumberDto,
      );
    } else if (body.key == 'display_name') {
      if (!body.value) {
        throw new BadRequestException(
          'Body needs value for display name update',
        );
      }
      return await this.UpdateDisplayNameUseCase.execute(
        request.user['userId'],
        body.value,
      );
    }
  }

  /**
   * Adds a cake to the authenticated user's favourites list.
   * Protected route requiring JWT authentication.
   * Validates the presence and validity of cake_id before adding.
   * @param cake_id - Object containing the cake's MongoDB ObjectId.
   * @param request - Authenticated request containing user info.
   * @returns Success message upon adding the cake.
   */
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
   * Retrieves the authenticated user's favourite cakes.
   * Protected route requiring JWT authentication.
   * @param request - Authenticated request containing user info.
   * @returns Array of favourite cakes.
   */
  @HttpCode(HttpStatus.OK)
  @Get('favourites')
  @UseGuards(JwtAuthGuard)
  async get_favourites(@Req() request: AuthRequest) {
    const res = await this.GetMyFavouritesUsecase.execute(
      request.user['userId'],
    );
    return res;
  }
  /**
   * Deletes a cake from the authenticated user's favourites.
   * Protected route requiring JWT authentication.
   * @param cake - Object containing cake_id to remove.
   * @param request - Authenticated request containing user info.
   * @returns Result of the removal operation.
   */
  @HttpCode(HttpStatus.OK)
  @Delete('favourites')
  @UseGuards(JwtAuthGuard)
  async delete_favourites(
    @Body() cake: { cake_id: string },
    @Req() request: AuthRequest,
  ) {
    if (!cake || !cake.cake_id) {
      throw new BadRequestException('Body needs cake_id');
    }
    const res = await this.RemoveMyFavouritesUsecase.execute(
      request.user['userId'],
      cake.cake_id,
    );
    return res;
  }
}
