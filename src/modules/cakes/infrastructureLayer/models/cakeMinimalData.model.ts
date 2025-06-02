import { CakeEntity } from '../../domainLayer/entities/cake.entity';
import { IGetStoreUseCase } from '../../applicationLayer/interfaces/getStoreUsecase.interface';
import getDistanceFromLatLonInKm from 'src/common/utils/getDistanceFromLatLonInKm';

export class CakeMinimalModel {
  constructor(
    private readonly cakes: CakeEntity[],
    private readonly getStoreUseCase: IGetStoreUseCase,
    private readonly lat: number,
    private readonly log: number,
  ) {}

  async toJson() {
    return await Promise.all(
      this.cakes.map(async (cake) => {
        const store = await this.getStoreUseCase.execute(cake.store_id);
        const distance = getDistanceFromLatLonInKm(store?.lat, store?.log, this.lat, this.log);

        return {
          _id: cake.id.toString(),
          cake_name: cake.cake_name,
          cake_description: cake.cake_description,
          cake_image_urls: cake.cake_image_urls,
          cake_mrp: cake.cake_variants[0]?.cake_mrp,
          cake_price: cake.cake_variants[0]?.cake_price,
          distance,
          store_name: store.store_name,
          store_location: [store.lat, store.log],
          known_for: cake.known_for,
        };
      }),
    );
  }
  
}
