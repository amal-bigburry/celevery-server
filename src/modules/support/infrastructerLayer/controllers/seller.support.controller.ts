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
import { CreateSupportIDforSellerUsecase } from '../../applicationLayer/usecases/CreateSupportIDforSeller.usecase';
import { FetchMessageFromSellerSupportUsecase } from '../../applicationLayer/usecases/FetchMessageFromSellerSupport.usecase';
import { AddMessageToSellerSupportUsecase } from '../../applicationLayer/usecases/AddMessageToSellerSupport.usecase';
import { MesssageSendDto } from '../../dtos/MesssageSend.dto';
import { FetchAllSupportIdsForSellerUseCase } from '../../applicationLayer/usecases/FetchAllSupportIdsForSeller.usecase';
/**
 * routes get request to /request_order
 */
@Controller('seller/support')
export class SellerSupportController {
  constructor(
    private readonly CreateSupportIDforSellerUsecase: CreateSupportIDforSellerUsecase,
    private readonly AddMessageToSellerSupportUsecase: AddMessageToSellerSupportUsecase,
    private readonly FetchMessageFromSellerSupportUsecase: FetchMessageFromSellerSupportUsecase,
    private readonly FetchAllSupportIdsForSellerUseCase: FetchAllSupportIdsForSellerUseCase,
  ) {}
  /**
   * routes post request to  /request_order
   */
  @Post('request')
  @UseGuards(JwtAuthGuard)
  async create_support_id(@Req() request: AuthRequest) {
    let res = await this.CreateSupportIDforSellerUsecase.execute(
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
      await this.AddMessageToSellerSupportUsecase.execute(MesssageSendDto);
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
      await this.FetchMessageFromSellerSupportUsecase.execute(support_id);
    return res;
  }
  /**
   * routes post request to  /request_order
   */
  @Get('my_supports')
  @UseGuards(JwtAuthGuard)
  async get_all_support_ids(
    @Req() request: AuthRequest,
    @Param('support_id') support_id: string,
  ) {
    let res = await this.FetchAllSupportIdsForSellerUseCase.execute(
      request.user['userId'],
    );
    return res;
  }
}
