/**
 * Dto for pagination fields
 */
export class PaginationDto {
  data:object[]
  total:Number;
  page:Number;
  limit:Number;
  totalPages:Number;
}