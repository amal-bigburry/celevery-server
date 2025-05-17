/*
 * Company License: Bigburry Hypersystems LLP
 * All rights reserved © Bigburry Hypersystems LLP
 */
/**
 * Importing Required Packages
 */
import { Inject, Injectable } from '@nestjs/common';
import { CakeCategoryRepository } from '../repositories/cakecategory.repository';
import { CAKE_CATEGORY_REPOSITORY } from '../tokens/cakeCategoryRepository.token';
/**
 * Injectable service class for finding all cake categories
 */
@Injectable()
export class FindCakeCategoryUseCase {
  /**
   * Injects the cake category repository dependency
   */
  constructor(
    @Inject(CAKE_CATEGORY_REPOSITORY)
    private readonly cakeCategoryRepository: CakeCategoryRepository,
  ) {}
  /**
   * Executes retrieval of all cake categories
   * @returns A Promise resolving to an array of cake categories
   */
  async execute(): Promise<Array<any>> {
    // Fetch all cake categories from the repository
    const cakescategories = await this.cakeCategoryRepository.findAll();
    // Return the list of cake categories
    return cakescategories;
  }
}
