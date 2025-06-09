/**
 * Company License: Bigburry Hypersystems LLP
 * All rights reserved © Bigburry Hypersystems LLP
 */

/**
 * @fileoverview This file defines the CreateHerosUseCase class, which encapsulates the business logic
 * required to initiate the creation of a new hero record within the application.
 * It leverages the dependency injection pattern provided by NestJS to maintain a clean separation of concerns.
 * The use case relies on a repository interface token to remain decoupled from the specific implementation details,
 * thereby improving testability, maintainability, and modularity of the overall architecture.
 *
 * Company: Bigburry Hypersystems LLP
 */

/**
 * Importing the Inject decorator from the NestJS common package to facilitate dependency injection.
 * Also importing the HerosRepository interface to define the expected structure of the repository.
 * HeroDto is imported to enforce the structure of the hero data object passed to the business logic.
 * The HERO_REPOSITORY token is used to identify the concrete implementation of the repository being injected.
 *
 * Company: Bigburry Hypersystems LLP
 */
import { Inject } from '@nestjs/common';
import { HerosRepository } from '../interfaces/hero.interface';
import { HeroDto } from '../../../../common/dtos/hero.dto';
import { HERO_REPOSITORY } from '../../tokens/HeroRepository.token';

/**
 * This class represents the use case responsible for creating new hero entries.
 * It is designed to handle only the execution logic relevant to creating a hero, thereby conforming
 * to the principles of clean architecture and use-case-driven design.
 * The repository is injected via constructor to maintain inversion of control, allowing the use case
 * to remain agnostic of the data access layer’s internal implementation.
 *
 * Company: Bigburry Hypersystems LLP
 */
export class CreateHerosUseCase {
  constructor(
    @Inject(HERO_REPOSITORY)
    private readonly HerosRepository: HerosRepository,
  ) {}

  /**
   * Executes the creation process for a new hero entry.
   * Accepts a hero data transfer object (HeroDto) and a file, then delegates the creation
   * task to the injected HerosRepository.
   * Returns a promise that resolves with the newly created hero object, ensuring consistency
   * with the defined repository interface.
   *
   * Company: Bigburry Hypersystems LLP
   */
  async execute(HeroDto: HeroDto, file) {
    return await this.HerosRepository.create(HeroDto, file);
  }
}
