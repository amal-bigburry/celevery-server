/*
 * Company License: Bigburry Hypersystems LLP
 * All rights reserved © Bigburry Hypersystems LLP
 */
/**
 * Entity representing a Cake Category
 */
export class CakeCategoryEntity {
  /**
   * Constructs a new CakeCategoryEntity instance
   * @param id - Unique identifier of the cake category
   * @param category_image_url - URL of the category image
   * @param category_name - Name of the cake category
   */
  constructor(
    public readonly id: string,
    public category_image_url: string,
    public category_name: string,
  ) {}
}
