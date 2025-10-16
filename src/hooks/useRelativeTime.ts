import { useEffect, useMemo, useState } from 'react';
import { FormatTimeUtils } from '@/utils/formatTimeUtils';

/**
 * Returns a UX-friendly relative time string (e.g., "42 minutes ago")
 * that updates on an appropriate interval based on the age of the date.
 */
export function useRelativeTime(date: Date | string | number) {
  const targetDate = useMemo(() => new Date(date), [date]);
  const [text, setText] = useState(() => FormatTimeUtils.toUXFriendlyFormat(targetDate));

  useEffect(() => {
    function update() {
      setText(FormatTimeUtils.toUXFriendlyFormat(targetDate));
    }

    update();

    // Choose interval based on age to reduce updates
    const now = Date.now();
    const diffMs = Math.abs(now - targetDate.getTime());

    let intervalMs: number;
    if (diffMs < 60_000)
      intervalMs = 1_000; // update each second for < 1 min
    else if (diffMs < 60 * 60_000)
      intervalMs = 30_000; // every 30s for < 1 hour
    else if (diffMs < 24 * 60 * 60_000)
      intervalMs = 5 * 60_000; // every 5 min for < 1 day
    else intervalMs = 60 * 60_000; // hourly for older

    const id = setInterval(update, intervalMs);
    return () => clearInterval(id);
  }, [targetDate]);

  return text;
}
