import { useRelativeTime } from '@/hooks/useRelativeTime';

export function RelativeTime({ date }: { date: Date | string | number }) {
  const text = useRelativeTime(date);
  return <span title={new Date(date).toLocaleString()}>{text}</span>;
}
