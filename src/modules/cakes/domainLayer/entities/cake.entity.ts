/*
 * Company License: Bigburry Hypersystems LLP
 * All rights reserved © Bigburry Hypersystems LLP
 */
/**
 * Importing required CakeVariant type from schema file
 */
/**
 * Entity class representing the Cake domain model
 */
export class CakeVariant {
  constructor(
    public _id: string,
    public preparation_time: number,
    public weight: number,
    public cake_mrp: number,
    public cake_price: number,
  ) {}
}

export class CakeEntity {
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
