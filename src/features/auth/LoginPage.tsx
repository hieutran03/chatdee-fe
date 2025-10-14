import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLoginMutation, useMeQuery } from '@/app/services/auth.service'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '@/hooks/useAppDispatch'
import { setMe, setToken } from './auth.slice'

const schema = z.object({ email: z.string().email(), password: z.string().min(6) })
type Form = z.infer<typeof schema>

export default function LoginPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Form>({ resolver: zodResolver(schema) })
  const [login] = useLoginMutation()
  const me = useMeQuery(undefined, { skip: true })
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onSubmit = async (data: Form) => {
    const res = await login(data).unwrap()
    dispatch(setToken(res.accessToken))
    const prof = await me.refetch()
    dispatch(setMe(prof.data ?? null))
    navigate('/')
  }

  return (
    <Box minHeight="100vh" display="flex" alignItems="center" justifyContent="center" p={2}>
      <Card sx={{ width: 380 }}>
        <CardContent>
          <Typography variant="h5" mb={2}>Đăng nhập</Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} display="grid" gap={2}>
            <TextField label="Email" {...register('email')} error={!!errors.email} helperText={errors.email?.message}/>
            <TextField label="Mật khẩu" type="password" {...register('password')} error={!!errors.password} helperText={errors.password?.message}/>
            <Button type="submit" disabled={isSubmitting} variant="contained">Sign in</Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
