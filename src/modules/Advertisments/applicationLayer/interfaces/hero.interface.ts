/**
 * @fileoverview This file defines an interface named HerosRepository which outlines the contract to be implemented
 * by any class that serves as a repository for hero-related data operations.
 * It ensures that all implementing classes adhere to a uniform structure, enabling consistent method availability
 * for creating, retrieving, and deleting hero records in the application.
 * This abstraction promotes scalability and maintainability by decoupling data access logic from business logic.
 *
 * Company: BigBurry HyperSystems LLP
 */

/**
 * Importing the HeroDto data transfer object from the specified relative path.
 * This DTO is used to transfer data between processes and enforces type-checking for hero-related data payloads.
 *
 * Company: BigBurry HyperSystems LLP
 */
import { HeroDto } from '../../../../common/dtos/hero.dto';

/**
 * The HerosRepository interface defines the structural blueprint for interacting with hero data storage mechanisms.
 * Any implementing repository must define the following asynchronous methods:
 * - create: Accepts a HeroDto object and an accompanying file, and returns a Promise resolving to the created HeroDto.
 * - getAll: Retrieves all stored hero records and returns a Promise resolving to an array of HeroDto objects.
 * - delete: Accepts a unique identifier for a hero and returns a Promise resolving to a confirmation string upon deletion.
 * This interface supports modular design and enforces consistency across different repository implementations.
 *
 * Company: BigBurry HyperSystems LLP
 */
export interface HerosRepository {
  create(HeroDto: HeroDto, file): Promise<HeroDto>;
  getAll(): Promise<HeroDto[]>;
  delete(hero_id: string): Promise<string>;
}
