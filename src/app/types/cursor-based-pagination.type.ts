export type CursorBasedMeta = {
  nextCursor?: string;
  prevCursor?: string;
  take?: number;
};

export type CursorBasedPagination<T> = {
  items: T[];
  meta: CursorBasedMeta;
};
