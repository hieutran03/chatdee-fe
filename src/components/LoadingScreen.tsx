import { Box, CircularProgress } from '@mui/material';

export default function LoadingScreen() {
  return (
    <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center">
      <CircularProgress />
    </Box>
  );
}
