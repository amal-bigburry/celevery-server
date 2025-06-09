/**
 * Company License: Bigburry Hypersystems LLP
 * 
 * This file defines the implementation of the IGetCakeDetailsUseCase interface.
 * It acts as a service layer that interacts with the GetCakeDetailsUseCase to fetch the details of a cake.
 * The IGetCakeDetailsUseCaseImp class is injected with the GetCakeDetailsUseCase, which encapsulates the business logic.
 * The execute method is responsible for invoking the logic to retrieve cake details based on the provided cake_id.
 * This class serves as a bridge between the application layer and the domain layer.
 * 
 * Dependencies:
 * - GetCakeDetailsUseCase: Handles the core business logic for fetching cake details.
 * - IGetCakeDetailsUseCase: Interface defining the contract for getting cake details.
 * - CakeEntity: Represents the entity/model for cake details.
 */
import { GetCakeDetailsUseCase } from "src/modules/cakes/applicationLayer/use-cases/get-cake-details.usecase";
import { IGetCakeDetailsUseCase } from "../../applicationLayer/interfaces/get-cake-details.interface";
import { CakeEntity } from "src/modules/cakes/domainLayer/entities/cake.entity";
import { Injectable } from "@nestjs/common";

/**
 * IGetCakeDetailsUseCaseImp class implements the IGetCakeDetailsUseCase interface.
 * It provides an implementation for fetching cake details using GetCakeDetailsUseCase.
 */
@Injectable()
export class IGetCakeDetailsUseCaseImp implements  IGetCakeDetailsUseCase {

    /**
     * Constructor to inject the GetCakeDetailsUseCase.
     * The injected GetCakeDetailsUseCase is used to handle the business logic for retrieving cake details.
     */
    constructor(private readonly getCakeDetailsUseCase: GetCakeDetailsUseCase) {
        // console.log('Injected GetCakeDetailsUseCase:', getCakeDetailsUseCase)
    }
    
    /**
     * Execute method that calls the GetCakeDetailsUseCase to fetch cake details by cake_id.
     * This method returns a CakeEntity object containing the details of the cake.
     * 
     * @param cake_id The ID of the cake to retrieve details for.
     * @returns A promise that resolves to a CakeEntity object.
     */
    async execute(cake_id: string): Promise<CakeEntity> {
        // console.log('Fetching cake details for cake_id:', cake_id)
        /**
         * Calls the execute method of GetCakeDetailsUseCase to fetch the cake details.
         */
        return await this.getCakeDetailsUseCase.execute(cake_id);
    }
}
