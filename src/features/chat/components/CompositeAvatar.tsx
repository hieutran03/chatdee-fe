import { Avatar, Box } from '@mui/material';
import { Member } from '../types';

type CompositeAvatarProps = {
  members?: Member[];
  size?: number; // container size in px
};

function getInitials(name?: string) {
  if (!name) return '?';
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((p) => p[0]?.toUpperCase() ?? '').join('') || '?';
}

export function CompositeAvatar({ members = [], size = 44 }: CompositeAvatarProps) {
  const radius = size;
  const itemSize = Math.round(size * 0.62); // each avatar size
  const overlap = Math.round(itemSize * 0.35);
  const show = members.slice(0, 3);

  // Layout presets for up to 3 avatars
  const positions = [
    { top: 0, left: 0 },
    { top: 0, left: radius - itemSize },
    { top: radius - itemSize, left: Math.round((radius - itemSize) / 2) },
  ];

  return (
    <Box sx={{ position: 'relative', width: radius, height: radius }}>
      {show.length === 0 && <Avatar sx={{ width: radius, height: radius }}>?</Avatar>}
      {show.map((m, idx) => (
        <Avatar
          key={m.id ?? idx}
          src={m.avatar}
          sx={{
            position: 'absolute',
            width: itemSize,
            height: itemSize,
            border: '2px solid #fff',
            boxSizing: 'content-box',
            top: positions[idx]?.top ?? 0,
            left: positions[idx]?.left ?? 0,
          }}
        >
          {!m.avatar ? getInitials(m.name) : undefined}
        </Avatar>
      ))}
    </Box>
  );
}
