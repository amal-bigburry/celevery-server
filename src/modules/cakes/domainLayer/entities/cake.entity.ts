/**
 * importing the required packages
 */
import {
  CakeVariant,
} from '../../applicationLayer/repositories/cake.schema';
/**
 * cake entity
 */
export class CakeEntity {
  static id(
    id: any,
  ): (
    target: typeof import('../../infrastructureLayer/repositories/cake.repository.imp').CakeRepositoryImp,
    propertyKey: undefined,
    parameterIndex: 0,
  ) => void {
    throw new Error('Method not implemented.');
  }
  constructor(
    public readonly id: string,
    public cake_name: string,
    public cake_description: string,
    public cake_image_urls: Array<string>,
    public known_for: Array<string>,
    public cake_variants: CakeVariant[],
    public store_id: string,
    public cake_category_ids: Array<string>,
    public cake_rating: number,
  ) {}
}
