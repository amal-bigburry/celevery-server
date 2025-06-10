import { OrderDto } from "src/common/dtos/Order.dto";
export interface GetAllOrdersInterface {
    getallorders(): Promise<OrderDto[]>;
}