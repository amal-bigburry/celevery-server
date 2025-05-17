/**
 * Importing Required Packages
 */
import { Inject, Injectable } from '@nestjs/common'; /**
 * Returns and injectable cake category
 */
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { IGetOrdersToAnalyse } from '../interfaces/IGetOrdersToAnalyse.interface';
import { IGetCakeDetailsUseCase } from 'src/modules/orders/applicationLayer/interfaces/GetCakeDetailsusecase.interface';
import { GETORDERANALYSE } from '../../tokens/GetOrdersToAnalyse.token';
import { CakeEntity } from 'src/modules/cakes/domainLayer/entities/cake.entity';
import { CAKEREPOSITORY } from '../../tokens/cake_Repository.token';
import { OrderDto } from 'src/modules/orders/dtos/Order.dto';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class GetPopularProductsUseCase {
  private orders: OrderDto[];
  private cake_occurences = {};
  private occurenceInArray: [string, number][];
  private ordersAboveTTV: [string, number][];
  constructor(
    @Inject(GETORDERANALYSE)
    private readonly getOrdersToAnalyse: IGetOrdersToAnalyse,
    @Inject(CAKEREPOSITORY)
    private readonly IGetCakeDetailsUseCase: IGetCakeDetailsUseCase,
    private readonly configService: ConfigService,
  ) {}
  /**
   * function that execute the logic
   */
  async execute(page, limit): Promise<PaginationDto> {
    /**
     * trying level 1
     */
    this.orders = await this.getOrdersToAnalyse.execute(0);
    this.orders.forEach((order) => {
      this.cake_occurences[order.cake_id] =
        (this.cake_occurences[order.cake_id] || 0) + 1;
    });
    this.occurenceInArray = Object.entries(this.cake_occurences);
    return await this.respond(this.occurenceInArray, page, limit);
  }

  async respond(orders, page, limit): Promise<PaginationDto> {
    // console.log(orders)
    const sortedCakes = orders.sort((a, b) => b[1] - a[1]);
    let topCakeObject = sortedCakes.slice(
      0,
      parseInt(this.configService.get<string>('PLC') || '0'),
    );
    const topCakeDetails: CakeEntity[] = await Promise.all(
      topCakeObject.map((cakeobj) =>
        this.IGetCakeDetailsUseCase.execute(cakeobj[0]),
      ),
    );
    const total = topCakeDetails.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedData = topCakeDetails.slice(start, end);
    return {
      data: paginatedData,
      total,
      page,
      limit,
      totalPages,
    };
  }
}
