import { CakeEntity } from "src/modules/cakes/domainLayer/entities/cake.entity";
import { IGetStoreUsecase } from "../../applicationLayer/interfaces/GetStoreusecase.interface";
import { getStoreUsecase } from "src/modules/stores/applicationLayer/usercases/getStore.usecase";
import { StoreEntity } from "src/modules/stores/domainLayer/entities/store.entity";
import { StoreDto } from "src/modules/stores/Dtos/store.dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class IGetStoreUseCaseImp implements  IGetStoreUsecase{

    constructor(private readonly getStoreUsecase: getStoreUsecase){}
        async execute(store_id: string): Promise<StoreDto> {
        return await this.getStoreUsecase.execute(store_id)
    }
}