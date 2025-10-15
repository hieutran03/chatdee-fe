export type OffsetBasedMeta = {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
};

export type OffsetBasedPagination<T> = {
  items: T[];
  meta: OffsetBasedMeta;
};
