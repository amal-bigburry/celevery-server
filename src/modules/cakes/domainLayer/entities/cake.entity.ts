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
  constructor(
    public _id: string,
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
