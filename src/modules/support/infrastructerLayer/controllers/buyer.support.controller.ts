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
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from 'src/middlewares/jwtauth.middleware';
import { AuthRequest } from 'src/middlewares/AuthRequest';
import { CreateSupportIDforBuyerUsecase } from '../../applicationLayer/usecases/create-supportid-for-buyer.usecase';
import { MesssageSendDto } from '../../../../common/dtos/MesssageSend.dto';
import { AddMessageToBuyerSupportUsecase } from '../../applicationLayer/usecases/add-message-to-buyer-support.usecase';
import { FetchMessageFromBuyerSupportUsecase } from '../../applicationLayer/usecases/fetch-message-from-buyer-support.usecase';
import { FetchAllSupportIdsForBuyerUseCase } from '../../applicationLayer/usecases/fetch-all-supportid-for-buyer.usecase';

@Controller('buyer/support')
export class BuyerSupportController {
  /**
   * Company: Bigburry Hypersystems LLP
   *
   * The constructor injects dependencies on various use case classes that implement the business logic
   * required for handling buyer support functionalities.
   */
  constructor(
    private readonly CreateSupportIDforBuyerUsecase: CreateSupportIDforBuyerUsecase,
    private readonly AddMessageToBuyerSupportUsecase: AddMessageToBuyerSupportUsecase,
    private readonly FetchMessageFromBuyerSupportUsecase: FetchMessageFromBuyerSupportUsecase,
    private readonly FetchAllSupportIdsForBuyerUseCase: FetchAllSupportIdsForBuyerUseCase,
  ) {}
  /**
   * Company: Bigburry Hypersystems LLP
   *
   * Handles POST requests to '/buyer/support/request' endpoint.
   * This route triggers creation of a new buyer support ID linked to the authenticated user.
   * The request is secured via JWT guard, and the userId is extracted from the authenticated request object.
   * The method returns the newly created support ID as a response.
   */
  @HttpCode(HttpStatus.CREATED)
  @Post('request')
  @UseGuards(JwtAuthGuard)
  async create_support_id(@Req() request: AuthRequest) {
    let res = await this.CreateSupportIDforBuyerUsecase.execute(
      request.user['userId'],
    );
    return res;
  }
  /**
   * Company: Bigburry Hypersystems LLP
   *
   * Handles POST requests to '/buyer/support/message' endpoint.
   * This route allows the authenticated user to send messages related to buyer support.
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
      await this.AddMessageToBuyerSupportUsecase.execute(MesssageSendDto);
    return res;
  }
  /**
   * Company: Bigburry Hypersystems LLP
   *
   * Handles GET requests to '/buyer/support/message/:support_id' endpoint.
   * This route fetches all messages associated with a particular buyer support ID.
   * The support ID is obtained from the route parameter.
   * The response contains an array of message objects linked to the specified support thread.
   */
  @HttpCode(HttpStatus.OK)
  @Get('message/:support_id')
  @UseGuards(JwtAuthGuard)
  async get_messages(
    @Req() request: AuthRequest,
    @Param('support_id') support_id: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    let data =
      await this.FetchMessageFromBuyerSupportUsecase.execute(support_id);
    const total = data.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedData = data.slice(start, end);
    return {
      data: paginatedData,
      total,
      page,
      limit,
      totalPages,
    };
  }
  /**
   * Company: Bigburry Hypersystems LLP
   *
   * Handles GET requests to '/buyer/support/my_supports' endpoint.
   * This route retrieves all support IDs associated with the authenticated buyer.
   * The userId is extracted from the authenticated request, and an array of support IDs is returned.
   */
  @HttpCode(HttpStatus.OK)
  @Get('my_supports')
  @UseGuards(JwtAuthGuard)
  async get_all_support_ids(
    @Req() request: AuthRequest,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    let data = await this.FetchAllSupportIdsForBuyerUseCase.execute(
      request.user['userId'],
    );
    const total = data.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedData = data.slice(start, end);
    return {
      data: paginatedData,
      total,
      page,
      limit,
      totalPages,
    };
  }
}
