import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
/**
 * Schema for cakevariant field
 */
@Schema()
export class CakeVariant {
  @Prop() preparation_time: number;
  @Prop() weight: number;
  @Prop() cake_mrp: number;
  @Prop() cake_price: number;
}
/**
 * schema for cake document
 */
@Schema()
export class Cake extends Document {
  /**
   * stores name of the cake
   */
  @Prop({ required: true })
  cake_name: string;
  /**
   * stores the description of the cake
   */
  @Prop()
  cake_description: string;
  /**
   * save the images urls of uploaded cake images
   */
  @Prop({ required: true })
  cake_image_urls: Array<string>;
  /**
   * this says what the cake is famouse of like birthday
   */
  @Prop({ required: true })
  known_for: string;

  @Prop({ type: [CakeVariant], required: true }) // ✅ Correct way to embed nested object
  cake_varients: CakeVariant[];

  @Prop()
  store_id: string;

  @Prop({ required: true })
  cake_category_ids: Array<string>;

  @Prop()
  cake_rating: number;
}

export const CakeSchema = SchemaFactory.createForClass(Cake);
