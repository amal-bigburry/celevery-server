import { Expose, Transform } from 'class-transformer';
export class OrderDetailDto {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  cake_id: string;
  payment_tracking_id: string;
  // _id: string;
  order_status: string;
  cake_variant_id: string;
  variant_weight: number;
  need_before: string;
  quantity: number;
  buyer_id: string;
  text_on_cake: string;
  known_for: string;
  seller_id: string;
  seller_name: string;
  buyer_name: string;
  seller_contact_number: string;
  buyer_contact_number: string;
  cake_name: string;
  cake_image: string;
  cake_price: number;
  cake_description: string;
  cancelled_by: string;
  cancellation_reason: string;
  session_id:string;
}
