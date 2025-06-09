import { Injectable } from "@nestjs/common";
import { IGetStoreUseCase } from "./get-store.usecase";
import { CakeEntity } from "../../domainLayer/entities/cake.entity";
import getDistanceFromLatLonInKm from "src/common/utils/getDistanceFromLatLonInKm";
import { GetStoreUsecase } from "src/modules/stores/applicationLayer/usercases/get-store-details.usecase";

@Injectable()
export class CakeMinimalModel {
  constructor(private readonly getstoreUsecase: GetStoreUsecase) {}

  async toJson(cakes: CakeEntity[], lat: number, log: number) {
    return await Promise.all(
      cakes.map(async (cake) => {
        // console.log(cake)
        const store = await this.getstoreUsecase.execute(cake.store_id);
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
