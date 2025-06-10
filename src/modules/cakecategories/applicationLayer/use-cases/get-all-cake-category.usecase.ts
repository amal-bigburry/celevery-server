/*
 * Company License: Bigburry Hypersystems LLP
 * All rights reserved © Bigburry Hypersystems LLP
 */
/**
 * Importing Required Packages
 */
import { Inject, Injectable } from '@nestjs/common';
import { CakeCategoryInterface } from '../interfaces/cake-category.interface';
import { CAKECATEGORYINTERFACETOKEN } from '../../tokens/cakeCategoryRepository.token';
/**
 * Injectable service class for finding all cake categories
 */
@Injectable()
export class FindCakeCategoryUseCase {
  /**
   * Injects the cake category repository dependency
   */
  constructor(
    @Inject(CAKECATEGORYINTERFACETOKEN)
    private readonly CakeCategoryInterface: CakeCategoryInterface,
  ) {}
  /**
   * Executes retrieval of all cake categories
   * @returns A Promise resolving to an array of cake categories
   */
  async execute(): Promise<Array<any>> {
    // Fetch all cake categories from the repository
    const cakescategories = await this.CakeCategoryInterface.findAll();
    // Return the list of cake categories
    return cakescategories;
  }
}
