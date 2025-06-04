/**
 * Company License: Bigburry Hypersystems LLP
 * All rights reserved © Bigburry Hypersystems LLP
 */

/**
 * @fileoverview This file defines the GetHerosUseCase class, which encapsulates the logic
 * for retrieving all hero records from the underlying data store.
 * It follows the principles of clean architecture by keeping business logic separate from infrastructure concerns.
 * The use of a repository interface ensures the class remains loosely coupled and highly testable.
 *
 * Company: Bigburry Hypersystems LLP
 */

/**
 * Importing essential modules required for this use case class.
 * The Inject decorator from NestJS is used for injecting dependencies via constructor.
 * HerosRepository is the interface contract which the data source implementation must fulfill.
 * HeroDto is imported to define the structure of data being transferred, although not directly used in this file.
 * The HERO_REPOSITORY token uniquely identifies the implementation of the repository to be injected.
 *
 * Company: Bigburry Hypersystems LLP
 */
import { Inject } from '@nestjs/common';
import { HerosRepository } from '../interfaces/HeroRepository.interface';
import { HERO_REPOSITORY } from '../../tokens/HeroRepository.token';

/**
 * The GetHerosUseCase class is responsible for orchestrating the retrieval of all hero records.
 * It serves as the application layer's entry point for fetching data from the repository.
 * This design isolates retrieval logic from the rest of the application, improving maintainability and testability.
 * Dependency injection ensures that the class can operate independently of specific repository implementations.
 *
 * Company: Bigburry Hypersystems LLP
 */
export class GetHerosUseCase {
  constructor(
    @Inject(HERO_REPOSITORY)
    private readonly HerosRepository: HerosRepository,
  ) {}

  /**
   * Executes the operation to fetch all hero records from the repository.
   * This method returns a promise that resolves to an array of HeroDto objects.
   * It delegates the actual data retrieval logic to the injected HerosRepository, ensuring adherence to abstraction principles.
   *
   * Company: Bigburry Hypersystems LLP
   */
  async execute() {
    return await this.HerosRepository.getAll();
  }
}
