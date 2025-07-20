import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Button, Paper, Stack, TextField, Typography, Alert } from '@mui/material';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const schema = yup.object({
  email: yup.string().email('Must be a valid email').required('Email is required'),
  password: yup.string().min(4, 'Password must be at least 4 characters').required('Password is required'),
});

interface FormValues {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: yupResolver(schema), defaultValues: { email: 'demo@user.com', password: 'password' } });

  const onSubmit = async (data: FormValues) => {
    try {
      setError(null);
      await login(data.email, data.password);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <Box display="grid" justifyContent={'center'} alignItems="center" height={"100%"}>
      <Paper sx={{ p: 4, width: '100%', maxWidth: 380 }}>
        <Typography variant="h5" mb={2} component="h1" align="center">
          Sign in
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center" mb={3}>
          Use `demo@user.com` and any password.
        </Typography>
        <Stack component="form" spacing={3} onSubmit={handleSubmit(onSubmit)} noValidate>
          {error && <Alert severity="error">{error}</Alert>}
          <TextField
            label="Email"
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
          />
          <Button type="submit" variant="contained" fullWidth disabled={isSubmitting} size="large">
            {isSubmitting ? 'Signing in…' : 'Login'}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}