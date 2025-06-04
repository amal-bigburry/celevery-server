import { CakeEntity } from 'src/modules/cakes/domainLayer/entities/cake.entity';
import { OrderDto } from 'src/common/dtos/Order.dto';

export async function GetPopularCakes(
  cakes: CakeEntity[],
  orders: OrderDto[],
  orderby: string,
): Promise<CakeEntity[]> {
  // Normalize IDs to strings
  const validCakeIds = new Set(cakes.map((c) => c.id.toString()));

  const cakeOccurrences: Record<string, number> = {};
  for (const order of orders) {
    const cakeId = order.cake_id?.toString();
    if (cakeId && validCakeIds.has(cakeId)) {
      cakeOccurrences[cakeId] = (cakeOccurrences[cakeId] || 0) + 1;
    }
  }
  let topCakeDetails: CakeEntity[] = [];
  if (orderby === 'asc') {
    let sortedByPopularity = Object.entries(cakeOccurrences).sort(
      (a, b) => b[1] - a[1],
    );
    topCakeDetails = await Promise.all(
      sortedByPopularity.map(async ([cakeId]) => {
        return cakes.find((cake) => cake.id.toString() === cakeId.toString())!;
      }),
    );
  } else {
    let sortedByPopularity = Object.entries(cakeOccurrences).sort(
      (a, b) => a[1] - b[1],
    );
    topCakeDetails = await Promise.all(
      sortedByPopularity.map(async ([cakeId]) => {
        return cakes.find((cake) => cake.id.toString() === cakeId.toString())!;
      }),
    );
  }


  return topCakeDetails;
}
