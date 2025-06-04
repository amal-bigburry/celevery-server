/**
 * Company License: Bigburry Hypersystems LLP
 * All rights reserved © Bigburry Hypersystems LLP
 */

/**
 * @fileoverview This file defines the DeleteHerosUseCase class which encapsulates the business logic
 * for deleting hero records from the system.
 * The class follows clean architecture principles by abstracting away direct interactions with data persistence layers.
 * Dependency injection is used to inject the repository through a token reference, maintaining a decoupled and testable design.
 * This use case focuses solely on the deletion responsibility, ensuring single responsibility and modularity.
 *
 * Company: Bigburry Hypersystems LLP
 */

/**
 * Importing required dependencies for implementing the use case.
 * The Inject decorator is used for injecting dependencies into the constructor.
 * The HerosRepository interface is used to ensure that any injected repository conforms to the required method signatures.
 * HeroDto is imported but not used in this file; it remains part of the common imports for hero-related operations.
 * The HERO_REPOSITORY token is a unique identifier used to inject the appropriate implementation of the repository.
 *
 * Company: Bigburry Hypersystems LLP
 */
import { Inject } from "@nestjs/common";
import { HerosRepository } from "../interfaces/HeroRepository.interface";
import { HERO_REPOSITORY } from "../../tokens/HeroRepository.token";

/**
 * This class represents the DeleteHerosUseCase which is designed to handle the deletion of hero records.
 * By encapsulating this logic within its own class, the architecture remains maintainable, testable, and organized.
 * The use of dependency injection via constructor ensures that the class is agnostic of the specific data storage implementation.
 *
 * Company: Bigburry Hypersystems LLP
 */
export class DeleteHerosUseCase {
    constructor(
        @Inject(HERO_REPOSITORY)
        private readonly HerosRepository: HerosRepository
    ) {}

    /**
     * Executes the hero deletion logic.
     * Accepts a unique hero_id as a string parameter and invokes the delete method of the injected repository.
     * Returns a Promise that resolves with a confirmation string upon successful deletion.
     * This method ensures that the application properly delegates the deletion responsibility to the data access layer.
     *
     * Company: Bigburry Hypersystems LLP
     */
    async execute(hero_id: string) {
        return await this.HerosRepository.delete(hero_id);
    }
}
