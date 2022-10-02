import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Box } from 'common/components/Box'
import { Button } from 'common/components/Button'
import { FieldError } from 'common/components/FieldError'
import { FormErrorMessage } from 'common/components/FormErrorMessage'
import { Input } from 'common/components/Input'
import { Label } from 'common/components/Label'
import { styled } from 'core/theme/config'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { z } from 'zod'

const LoginButton = styled(Button, {
  width: '100%',
  '@xl': {
    width: '50%',
  },
})

const schema = z.object({
  email: z.string().email('Please provide valid email'),
  password: z.string().min(5, 'Minimum password length is 5 characters'),
})

type FormValues = z.infer<typeof schema>

export function LoginForm() {
  const navigate = useNavigate()
  const auth = useMutation(
    ({ email, password }: { email: string; password: string }) =>
      Promise.resolve({ email, password }),
    {
      onSuccess: () => {
        navigate('/')
      },
    },
  )
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
  })

  const onSubmit: SubmitHandler<FormValues> = data => {
    const { email, password } = data
    auth.mutate({ email, password })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        css={{
          marginBottom: '3rem',
        }}
      >
        <Box
          css={{
            marginBottom: '1.5rem',
          }}
        >
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
        </Box>

        <Box
          css={{
            marginBottom: '1.5rem',
          }}
        >
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
        </Box>

        {auth.isError && (
          <FormErrorMessage>
            The email/password combination used was not found on the system.
          </FormErrorMessage>
        )}
      </Box>

      <LoginButton
        aria-label="Login button"
        color="primary"
        type="submit"
        disabled={auth.isLoading}
        data-testid="login-form-button"
      >
        Log in
      </LoginButton>
    </form>
  )
}
