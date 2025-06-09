/**
 * Company License: Bigburry Hypersystems LLP
 * 
 * This file defines the implementation of the IGetStoreUsecase interface.
 * The IGetStoreUseCaseImp class is responsible for fetching store details based on a provided store_id.
 * It interacts with the getStoreUsecase, which contains the business logic for retrieving store details.
 * This class is part of the service layer, bridging between the application layer and the domain layer.
 * 
 * Dependencies:
 * - getStoreUsecase: Handles the business logic to fetch store details.
 * - IGetStoreUsecase: Interface that defines the contract for getting store details.
 * - StoreEntity: Represents the entity/model for store details.
 * - StoreDto: Data transfer object for the store details.
 */
import { GetStoreUsecase } from "src/modules/stores/applicationLayer/usercases/get-store-details.usecase";
import { StoreDto } from "src/common/dtos/store.dto";
import { Injectable } from "@nestjs/common";
import { GetstoreInterface } from "src/modules/orders/applicationLayer/interfaces/get-store.interface";
/**
 * IGetStoreUseCaseImp class implements the IGetStoreUsecase interface.
 * It provides an implementation for fetching store details using getStoreUsecase.
 */
@Injectable()
export class IGetStoreUseCaseImp implements  GetstoreInterface {
    /**
     * Constructor to inject the getStoreUsecase.
     * This use case is responsible for the logic that retrieves store details.
     */
    constructor(private readonly getStoreUsecase: GetStoreUsecase) {}
    /**
     * Execute method that calls the getStoreUsecase to fetch store details by store_id.
     * This method returns a StoreDto object containing the details of the store.
     * 
     * @param store_id The ID of the store to retrieve details for.
     * @returns A promise that resolves to a StoreDto object.
     */
    async getstore(store_id: string): Promise<StoreDto> {
        /**
         * Calls the execute method of getStoreUsecase to fetch store details.
         * It returns the StoreDto that contains the store's information.
         */
        return await this.getStoreUsecase.execute(store_id);
    }
}
