import { CakeEntity } from 'src/modules/cakes/domainLayer/entities/cake.entity';
import { OrderDto } from 'src/common/dtos/Order.dto';

export const GetTrendingCakes = async (
  cakes: CakeEntity[],
  allorders: OrderDto[],
  orderby: string, // you can use this to sort by count, rating, etc.
): Promise<CakeEntity[]> => {
  let topCakeObject: [string, number][] = [];

  for (let level = 0; level <= 6; level++) {
    const cakeOccurrences: Record<string, number> = {};

    allorders.forEach((order) => {
      cakeOccurrences[order.cake_id] =
        (cakeOccurrences[order.cake_id] || 0) + 1;
    });

    const occurrenceInArray = Object.entries(cakeOccurrences);
    const ordersAboveTTV = occurrenceInArray.filter(([_, count]) => count >= 5);

    if (ordersAboveTTV.length > 5) {
      topCakeObject = ordersAboveTTV;
      break;
    }
  }

  let topCakeDetails: CakeEntity[] = [];

  if (orderby === 'asc') {
    // Sort trending cakes by count
    const sortedCakes = topCakeObject.sort((a, b) => b[1] - a[1]);
    
    topCakeDetails = await Promise.all(
      sortedCakes.map(async ([cakeId]) => {
        return cakes.find((cake) => cake._id.toString() === cakeId.toString())!;
      }),
    );
  } else {
    // Sort trending cakes by count
    const sortedCakes = topCakeObject.sort((a, b) => a[1] - b[1]);

    topCakeDetails = await Promise.all(
      sortedCakes.map(async ([cakeId]) => {
        return cakes.find((cake) => cake._id.toString() === cakeId.toString())!;
      }),
    );
  }

  return topCakeDetails;
};
