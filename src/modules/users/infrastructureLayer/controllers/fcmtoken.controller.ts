/**
 * importing required packages
 */
import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/middlewares/jwtauth.middleware';
import { AuthRequest } from 'src/middlewares/AuthRequest';
import { UpdatefcmUseCase } from '../../applicationLayer/use-cases/updatefcm.usecase';
import { Getcurrentfcmusecase } from '../../applicationLayer/use-cases/getcurrentfcm.usecase';
import { TokenDto } from '../../UserDtos/token.dto';
/**
 * controller to reoute the fcm routes
 */
@Controller('fcm')
export class FcmController {
  constructor(
    private readonly updatefcmUseCase: UpdatefcmUseCase,
    private readonly getcurrentfcmusecase: Getcurrentfcmusecase,
  ) {}
  /**
   * get  request
   */
  @Get()
  @UseGuards(JwtAuthGuard)
  async getfcm(@Req() request: AuthRequest) {
    return this.getcurrentfcmusecase.execute(request.user['userId']);
  }
  /**
   * handles the put request
   */
  @Put()
  @UseGuards(JwtAuthGuard)
  async updatefcm(@Body() token: TokenDto, @Req() request: AuthRequest) {
    return this.updatefcmUseCase.execute(request.user['userId'], token);
  }
}
