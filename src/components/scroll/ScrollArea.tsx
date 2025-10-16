import { Box, BoxProps } from '@mui/material';

export function ScrollArea(props: BoxProps) {
  return (
    <Box
      {...props}
      sx={{
        overflow: 'auto',
        scrollbarGutter: 'stable',
        scrollbarWidth: 'thin',
        scrollbarColor: '#1997eb #eee',
        '&::-webkit-scrollbar': { width: 8, height: 8 },
        '&::-webkit-scrollbar-track': { background: '#eee', borderRadius: 8 },
        '&::-webkit-scrollbar-thumb': { background: '#9e9e9e', borderRadius: 8 },
        '&::-webkit-scrollbar-thumb:hover': { background: '#757575' },
        ...props.sx,
      }}
    />
  );
}
