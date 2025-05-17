/**
 * imports required packages
 */
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/middlewares/jwtauth.middleware';
import { AuthRequest } from 'src/middlewares/AuthRequest';
import { CreateSupportIDforBuyerUsecase } from '../../applicationLayer/usecases/CreateSupportIDforBuyer.usecase';
import { MesssageSendDto } from '../../dtos/MesssageSend.dto';
import { AddMessageToBuyerSupportUsecase } from '../../applicationLayer/usecases/AddMessageToBuyerSupport.usecase';
import { FetchMessageFromBuyerSupportUsecase } from '../../applicationLayer/usecases/FetchMessageFromBuyerSupport.usecase';
import { FetchAllSupportIdsForBuyerUseCase } from '../../applicationLayer/usecases/FetchAllSupportIdsForBuyer.usecase';
/**
 * routes get request to /request_order
 */
@Controller('buyer/support')
export class BuyerSupportController {
  constructor(
    private readonly CreateSupportIDforBuyerUsecase: CreateSupportIDforBuyerUsecase,
    private readonly AddMessageToBuyerSupportUsecase: AddMessageToBuyerSupportUsecase,
    private readonly FetchMessageFromBuyerSupportUsecase: FetchMessageFromBuyerSupportUsecase,
    private readonly FetchAllSupportIdsForBuyerUseCase: FetchAllSupportIdsForBuyerUseCase,
  ) {}
  /**
   * routes post request to  /request_order
   */
  @Post('request')
  @UseGuards(JwtAuthGuard)
  async create_support_id(@Req() request: AuthRequest) {
    let res = await this.CreateSupportIDforBuyerUsecase.execute(
      request.user['userId'],
    );
    return res;
  }
  /**
   * routes post request to  /request_order
   */
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
   * routes post request to  /request_order
   */
  @Get('message/:support_id')
  @UseGuards(JwtAuthGuard)
  async get_messages(
    @Req() request: AuthRequest,
    @Param('support_id') support_id: string,
  ) {
    let res =
      await this.FetchMessageFromBuyerSupportUsecase.execute(support_id);
    return res;
  }
  /**
   * routes post request to  /request_order
   */
  @Get('my_supports')
  @UseGuards(JwtAuthGuard)
  async get_all_support_ids(
    @Req() request: AuthRequest,
  ) {
    let res = await this.FetchAllSupportIdsForBuyerUseCase.execute(
      request.user['userId'],
    );
    return res;
  }
}
