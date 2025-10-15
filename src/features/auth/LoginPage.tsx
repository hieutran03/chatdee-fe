import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLoginMutation, useLazyMeQuery } from '@/app/services/auth.service';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setMe, setToken } from './auth.slice';
import { storage } from '@/libs/storage';
import { useEffect } from 'react';

const schema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

type Form = z.infer<typeof schema>;

export default function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = storage.get('accessToken');
    if (token) {
      navigate('/');
    }
  }, [navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Form>({ resolver: zodResolver(schema) });
  const [login] = useLoginMutation();
  const [fetchMe] = useLazyMeQuery();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: Form) => {
    const res = await login(data).unwrap();
    dispatch(setToken(res.data.accessToken));
    storage.set('accessToken', res.data.accessToken);

    const prof = await fetchMe().unwrap();
    storage.set('me', prof.data);

    dispatch(setMe(prof.data));

    navigate('/');
  };

  return (
    <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center" p={2}>
      <Card sx={{ width: 380 }}>
        <CardContent sx={{ display: 'grid', gap: 5 }}>
          <Typography variant="h5" mb={2} textAlign="center">
            Đăng nhập
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} display="grid" gap={3}>
            <TextField
              label="Email"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              label="Mật khẩu"
              type="password"
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Button type="submit" disabled={isSubmitting} variant="contained">
              Sign in
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
