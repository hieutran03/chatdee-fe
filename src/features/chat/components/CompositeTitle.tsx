import { Typography } from '@mui/material';
import { Member } from '../types';

type CompositeTitleProps = {
  members?: Member[];
  ownerName?: string; // optional owner to emphasize first
  maxNames?: number; // how many names to show before 'and N more'
};

export function CompositeTitle({ members = [], ownerName, maxNames = 2 }: CompositeTitleProps) {
  const names = members.map((m) => m.name).filter(Boolean);
  const uniqueNames = Array.from(new Set([ownerName, ...names].filter(Boolean))) as string[];
  const visible = uniqueNames.slice(0, maxNames);
  const remaining = uniqueNames.length - visible.length;

  const text = remaining > 0 ? `${visible.join(', ')} and ${remaining} more` : visible.join(', ');

  return (
    <Typography variant="subtitle1" noWrap component="span">
      {text || 'Unnamed conversation'}
    </Typography>
  );
}
