import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <Box
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap={2}
    >
      <Typography variant="h3">404</Typography>
      <Typography variant="body1">Trang không tồn tại</Typography>
      <Button variant="contained" onClick={() => navigate('/')}>
        Về trang chủ
      </Button>
    </Box>
  );
}
