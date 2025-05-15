/**
 * Entity of cake Categories
 */
export class CakeCategoryEntity {
  constructor(
    public readonly id: string,
    public category_image_url: string,
    public category_name: string,
  ) {}
}
