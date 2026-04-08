import { useEffect, useState } from 'react';

/**
 * Custom hook for managing cursor-based pagination state
 * @param initialCursor - Initial cursor value (optional)
 * @returns Object with cursor state and methods to manage pagination
 */
export function useCursorPagination(initialCursor?: string) {
  const [cursor, setCursor] = useState<string | undefined>(initialCursor);
  const [prevCursor, setPrevCursor] = useState<string | undefined>(undefined);

  /**
   * Load next page by setting cursor to the previous cursor value
   */
  const loadNextPage = () => {
    if (prevCursor) {
      setCursor(prevCursor);
    }
  };

  /**
   * Reset pagination to initial state
   */
  const reset = () => {
    setCursor(undefined);
    setPrevCursor(undefined);
  };

  /**
   * Update the prevCursor from API response
   */
  const updatePrevCursor = (newPrevCursor: string | undefined) => {
    setPrevCursor(newPrevCursor);
  };

  return {
    cursor,
    prevCursor,
    setCursor,
    setPrevCursor: updatePrevCursor,
    loadNextPage,
    reset,
    hasMore: !!prevCursor,
  };
}
