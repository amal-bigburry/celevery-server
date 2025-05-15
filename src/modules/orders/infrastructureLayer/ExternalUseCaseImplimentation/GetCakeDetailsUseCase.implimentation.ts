import { GetCakeDetailsUseCase } from "src/modules/cakes/applicationLayer/use-cases/GetCakeDetailsUseCase";
import { IGetCakeDetailsUseCase } from "../../applicationLayer/interfaces/GetCakeDetailsusecase.interface";
import { CakeEntity } from "src/modules/cakes/domainLayer/entities/cake.entity";
import { Injectable } from "@nestjs/common";


@Injectable()
export class IGetCakeDetailsUseCaseImp implements  IGetCakeDetailsUseCase{

    constructor(private readonly getCakeDetailsUseCase: GetCakeDetailsUseCase){
        // console.log('injected ',getCakeDetailsUseCase)
    }
    
    async execute(cake_id: string): Promise<CakeEntity> {
        // console.log('hello')
        return await this.getCakeDetailsUseCase.execute(cake_id)
    }
}