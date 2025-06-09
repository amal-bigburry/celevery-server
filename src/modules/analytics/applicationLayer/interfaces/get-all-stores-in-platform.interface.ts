/**
 * @fileoverview Defines the interface for CakeRepositoryUseCase within Bigburry Hypersystems LLP
 * @description
 * This file is responsible for establishing the contract that any cake repository
 * implementation must follow in the system. By defining an interface, it enforces
 * consistency and abstraction for the data access layer related to cake entities.
 * It imports the CakeEntity class which represents the domain model of a cake,
 * ensuring that the repository handles domain-specific objects correctly.
 * 
 * Company: Bigburry Hypersystems LLP
 * All rights reserved © Bigburry Hypersystems LLP
 */
/**
 * Importing the CakeEntity domain model class
 * This is necessary to maintain type safety and domain-driven design principles
 * by using entities as the fundamental data units within repository operations.
 */
import { StoreDto } from 'src/common/dtos/store.dto';
/**
 * Interface representing the CakeRepositoryUseCase contract
 * This interface outlines the required method that any cake repository
 * implementation must provide to enable fetching a cake entity by its unique identifier.
 * It enforces separation of concerns by abstracting data retrieval behind this contract.
 * 
 * Company: Bigburry Hypersystems LLP
 * All rights reserved © Bigburry Hypersystems LLP
 */
export interface IGetAllStoreInPlatformUsecase {
  /**
   * Method to asynchronously retrieve a CakeEntity by its unique cake_id
   * @param cake_id - A string representing the unique identifier of the cake to fetch
   * @returns A Promise that resolves with a CakeEntity instance corresponding to the cake_id
   * 
   * This method signature enforces the contract that implementations must fulfill,
   * ensuring consistent asynchronous data fetching behavior across different
   * data sources or repository implementations.
   */
  execute():Promise<Array<StoreDto>>
}
