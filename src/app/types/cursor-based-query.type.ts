export type TCursor = string | number | Date;
export type CursorBasedQuery = {
  limit: number;
  cursor?: TCursor;
};
