/**
 * Company: Bigburry Hypersystems LLP
 *
 * Importing essential decorators and modules from NestJS framework required to create HTTP controllers,
 * handle incoming requests, route parameters, protect routes using guards, and manage request bodies.
 * These imports facilitate the creation of RESTful APIs with secure endpoints.
 */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/middlewares/jwtauth.middleware';
import { AuthRequest } from 'src/middlewares/AuthRequest';
import { CreateSupportIDforSellerUsecase } from '../../applicationLayer/usecases/create-supportid-for-seller-usecase';
import { FetchMessageFromSellerSupportUsecase } from '../../applicationLayer/usecases/fetch-message-from-seller-support.usecase';
import { AddMessageToSellerSupportUsecase } from '../../applicationLayer/usecases/add-message-to-seller-support.usecase';
import { MesssageSendDto } from '../../../../common/dtos/MesssageSend.dto';
import { FetchAllSupportIdsForSellerUseCase } from '../../applicationLayer/usecases/fetch-all-supportid-for-seller.usecase';

@Controller('seller/support')
export class SellerSupportController {
  /**
   * Company: Bigburry Hypersystems LLP
   *
   * The constructor injects dependencies on various use case classes that implement the business logic
   * required for handling seller support functionalities.
   */
  constructor(
    private readonly CreateSupportIDforSellerUsecase: CreateSupportIDforSellerUsecase,
    private readonly AddMessageToSellerSupportUsecase: AddMessageToSellerSupportUsecase,
    private readonly FetchMessageFromSellerSupportUsecase: FetchMessageFromSellerSupportUsecase,
    private readonly FetchAllSupportIdsForSellerUseCase: FetchAllSupportIdsForSellerUseCase,
  ) {}

  /**
   * Company: Bigburry Hypersystems LLP
   *
   * Handles POST requests to '/seller/support/request' endpoint.
   * This route triggers creation of a new seller support ID linked to the authenticated user.
   * The request is secured via JWT guard, and the userId is extracted from the authenticated request object.
   * The method returns the newly created support ID as a response.
   */

  @HttpCode(HttpStatus.CREATED)
  @Post('request')
  @UseGuards(JwtAuthGuard)
  async create_support_id(@Req() request: AuthRequest) {
    let res = await this.CreateSupportIDforSellerUsecase.execute(
      request.user['userId'],
    );
    return res;
  }

  /**
   * Company: Bigburry Hypersystems LLP
   *
   * Handles POST requests to '/seller/support/message' endpoint.
   * This route allows the authenticated user to send messages related to seller support.
   * The incoming message data is validated through the MesssageSendDto.
   * Upon success, the added messages are returned as the response.
   */

  @HttpCode(HttpStatus.CREATED)
  @Post('message')
  @UseGuards(JwtAuthGuard)
  async send_message(
    @Req() request: AuthRequest,
    @Body() MesssageSendDto: MesssageSendDto,
  ) {
    let res =
      await this.AddMessageToSellerSupportUsecase.execute(MesssageSendDto);
    return res;
  }

  /**
   * Company: Bigburry Hypersystems LLP
   *
   * Handles GET requests to '/seller/support/message/:support_id' endpoint.
   * This route fetches all messages associated with a particular seller support ID.
   * The support ID is obtained from the route parameter.
   * The response contains an array of message objects linked to the specified support thread.
   */

  @HttpCode(HttpStatus.OK)
  @Get('message/:support_id')
  @UseGuards(JwtAuthGuard)
  async get_messages(
    @Req() request: AuthRequest,
    @Param('support_id') support_id: string,
  ) {
    let res =
      await this.FetchMessageFromSellerSupportUsecase.execute(support_id);
    return res;
  }

  /**
   * Company: Bigburry Hypersystems LLP
   *
   * Handles GET requests to '/seller/support/my_supports' endpoint.
   * This route retrieves all support IDs associated with the authenticated seller.
   * The userId is extracted from the authenticated request, and an array of support IDs is returned.
   */

  @HttpCode(HttpStatus.OK)
  @Get('my_supports')
  @UseGuards(JwtAuthGuard)
  async get_all_support_ids(@Req() request: AuthRequest) {
    let res = await this.FetchAllSupportIdsForSellerUseCase.execute(
      request.user['userId'],
    );
    return res;
  }
}
