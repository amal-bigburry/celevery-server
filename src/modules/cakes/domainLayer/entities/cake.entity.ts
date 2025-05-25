/*
 * Company License: Bigburry Hypersystems LLP
 * All rights reserved © Bigburry Hypersystems LLP
 */
/**
 * Importing required CakeVariant type from schema file
 */
import {
  CakeVariant,
} from '../../infrastructureLayer/models/cake.schema';
/**
 * Entity class representing the Cake domain model
 */
export class CakeEntity {
  /**
   * Placeholder static method (not implemented)
   * @param id - identifier parameter
   */
  static id(
    id: any,
  ): (
    target: typeof import('../../infrastructureLayer/implimentations/cake.repository.imp').CakeRepositoryImp,
    propertyKey: undefined,
    parameterIndex: 0,
  ) => void {
    throw new Error('Method not implemented.');
  }
  /**
   * Constructor to initialize CakeEntity with all relevant properties
   * @param id - unique identifier of the cake
   * @param cake_name - name of the cake
   * @param cake_description - description of the cake
   * @param cake_image_urls - array of image URLs representing the cake
   * @param known_for - what the cake is known for
   * @param cake_variants - array of CakeVariant objects for variants
   * @param store_id - associated store identifier
   * @param cake_category_ids - array of category IDs the cake belongs to
   * @param cake_rating - rating of the cake
   */
  constructor(
    public readonly id: string,
    public cake_name: string,
    public cake_description: string,
    public cake_image_urls: Array<string>,
    public known_for: string,
    public cake_variants: CakeVariant[],
    public store_id: string,
    public cake_category_ids: Array<string>,
    public cake_rating: number,
  ) {}
}
