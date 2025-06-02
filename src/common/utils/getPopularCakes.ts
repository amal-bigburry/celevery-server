import { CakeEntity } from 'src/modules/cakes/domainLayer/entities/cake.entity';
import { OrderDto } from 'src/modules/orders/dtos/Order.dto';

export async function GetPopularCakes(
  cakes: CakeEntity[],
  orders: OrderDto[],
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

  const sortedByPopularity = Object.entries(cakeOccurrences).sort(
    (a, b) => b[1] - a[1],
  );

  const topCakes = sortedByPopularity.slice(0, 10);

  const topCakeDetails: CakeEntity[] = await Promise.all(
    topCakes.map(async ([cakeId]) => {
      return cakes.find(cake => cake.id.toString() === cakeId.toString())!;
    })
  );

  return topCakeDetails;
}
