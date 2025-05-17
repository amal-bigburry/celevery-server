/**
 * DTO for pagination fields
 * Represents a standard structure used for paginated responses.
 * Typically returned by APIs that support pagination of results.
 */
export class PaginationDto {
  // An array of objects representing the paginated data items
  data: object[];
  // The total number of items across all pages
  total: Number;
  // The current page number
  page: Number;
  // The maximum number of items per page
  limit: Number;
  // The total number of pages calculated from total and limit
  totalPages: Number;
}
