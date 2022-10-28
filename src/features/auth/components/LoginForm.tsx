import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Box } from 'shared/components/Box';
import { Button } from 'shared/components/Button';
import { FieldError } from 'shared/components/FieldError';
import { FormErrorMessage } from 'shared/components/FormErrorMessage';
import { FormField } from 'shared/components/FormField';
import { Input } from 'shared/components/Input';
import { Label } from 'shared/components/Label';
import { styled } from 'theme/config';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Please provide valid email'),
  password: z.string().min(5, 'Minimum password length is 5 characters'),
});

type FormValues = z.infer<typeof schema>;

export function LoginForm() {
  const navigate = useNavigate();
  const auth = useMutation(
    ({ email, password }: { email: string; password: string }) =>
      Promise.resolve({ email, password }),
    {
      onSuccess: () => {
        navigate('/');
      },
    },
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: 'dmoisieiev@readdle.com',
      password: 'SrkniwYRB23s2Z',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = data => {
    const { email, password } = data;
    auth.mutate({ email, password });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-10">
        <FormField>
          <Label htmlFor="email">Email:</Label>
          <Input
            aria-label="Email input"
            type="text"
            id="email"
            autoComplete="email"
            aria-invalid={errors.email?.message ? 'true' : 'false'}
            placeholder="Enter email"
            data-testid="login-form-email"
            {...register('email')}
          />
          <FieldError>{errors.email?.message}</FieldError>
        </FormField>

        <FormField>
          <Label htmlFor="password">Password:</Label>
          <Input
            aria-label="Password input"
            type="password"
            id="password"
            autoComplete="current-password"
            aria-invalid={errors.password?.message ? 'true' : 'false'}
            placeholder="Type password"
            data-testid="login-form-password"
            {...register('password')}
          />
          <FieldError>{errors.password?.message}</FieldError>
        </FormField>

        {auth.isError && (
          <FormErrorMessage>
            The email/password combination used was not found on the system.
          </FormErrorMessage>
        )}
      </div>

      <Button
        aria-label="Login button"
        color="primary"
        type="submit"
        disabled={auth.isLoading}
        data-testid="login-form-button"
      >
        Log in
      </Button>
    </form>
  );
}
