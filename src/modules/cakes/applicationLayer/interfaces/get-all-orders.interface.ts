import { OrderDto } from "src/common/dtos/Order.dto";
export interface IGetAllOrdersInterface {
    getallorders(): Promise<OrderDto[]>;
}