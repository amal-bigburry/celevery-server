/**
 * Order entity
 */
export class Order {
  constructor(
    public readonly payment_tracking_id: string,
    public cake_id: string,
    public cake_varient_id: string,
    public order_status: string,
    public need_before: string,
    public buyer_id: string,
    public quantity: number,
  ) {}
}
