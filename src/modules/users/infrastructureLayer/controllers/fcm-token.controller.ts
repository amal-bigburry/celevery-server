/**
 * ******************************************************************************************************
 * FcmController.ts
 *
 * This controller, developed by Bigburry Hypersystems LLP, manages routing and handling of Firebase Cloud
 * Messaging (FCM) related HTTP requests within the system. It leverages NestJS decorators and middleware to
 * secure and structure endpoints for retrieving and updating FCM tokens.
 *
 * The class utilizes dependency injection to access the UpdatefcmUseCase and Getcurrentfcmusecase, delegating
 * business logic appropriately while maintaining clean controller responsibilities.
 * ******************************************************************************************************
 */

import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/middlewares/jwtauth.middleware';
import { AuthRequest } from 'src/middlewares/AuthRequest';
import { UpdatefcmUseCase } from '../../applicationLayer/usecases/update-fcm.usecase';
import { TokenDto } from '../../../../common/dtos/token.dto';
import { Getcurrentfcmusecase } from '../../applicationLayer/usecases/get-current-fcm.usecase';

/**
 * ******************************************************************************************************
 * FcmController Class
 *
 * Handles HTTP GET and PUT requests related to FCM tokens, ensuring authorized access through JWT authentication
 * middleware. Routes requests to respective use cases to perform the core business operations.
 * ******************************************************************************************************
 */
@Controller('fcm')
export class FcmController {
  constructor(
    private readonly updatefcmUseCase: UpdatefcmUseCase,
    private readonly getcurrentfcmusecase: Getcurrentfcmusecase,
  ) {}

  /**
   * **************************************************************************************************
   * getfcm Method
   *
   * Handles HTTP GET requests to retrieve the current FCM token for the authenticated user. Extracts user ID
   * from the JWT-authenticated request and delegates retrieval to the use case.
   *
   * @param request - Authenticated request containing user information.
   * @returns Promise<string> - The current FCM token for the user.
   * **************************************************************************************************
   */
  @Get()
  @UseGuards(JwtAuthGuard)
  async getfcm(@Req() request: AuthRequest): Promise<string> {
    return this.getcurrentfcmusecase.execute(request.user['userId']);
  }

  /**
   * **************************************************************************************************
   * updatefcm Method
   *
   * Handles HTTP PUT requests to update the FCM token for the authenticated user. Accepts the new token in
   * the request body and uses the user ID from the JWT-authenticated request to perform the update via use case.
   *
   * @param token - TokenDto containing the new FCM token.
   * @param request - Authenticated request containing user information.
   * @returns Promise<string> - Status message of the update operation.
   * **************************************************************************************************
   */
  @Put()
  @UseGuards(JwtAuthGuard)
  async updatefcm(
    @Body() token: TokenDto,
    @Req() request: AuthRequest,
  ): Promise<string> {
    return this.updatefcmUseCase.execute(request.user['userId'], token);
  }
}
