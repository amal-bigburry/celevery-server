import { Inject, Injectable } from "@nestjs/common";
import { CakeEntity } from "../../domainLayer/entities/cake.entity";
import getDistanceFromLatLonInKm from "src/common/utils/getDistanceFromLatLonInKm";
import { GetStoreInterface } from "../interfaces/get-store.interface";
import { GETSTORE } from "../../tokens/get-store.token";
@Injectable()
export class CakeMinimalModel {
  constructor(
    @Inject(GETSTORE)
    private readonly getstoreUsecase: GetStoreInterface) {}
  async toJson(cakes: CakeEntity[], lat: number, log: number) {
    return await Promise.all(
      cakes.map(async (cake) => {
        // console.log(cake)
        const store = await this.getstoreUsecase.getstore(cake.store_id);
        const distance = getDistanceFromLatLonInKm(store?.lat, store?.log, lat, log);
        return {
          _id: cake._id,
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
