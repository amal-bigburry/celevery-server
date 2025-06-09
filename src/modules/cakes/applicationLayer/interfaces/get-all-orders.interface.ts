import { OrderDto } from "src/common/dtos/Order.dto";
import { StoreDto } from "src/common/dtos/store.dto";

export interface IGetAllOrdersInterface {
    getallorders(): Promise<OrderDto[]>;
}