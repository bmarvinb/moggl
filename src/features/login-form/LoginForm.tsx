import {zodResolver} from '@hookform/resolvers/zod'
import {useMutation} from '@tanstack/react-query'
import {Button, FieldError, Input, Label} from 'components/common'
import {useAuth} from 'context/auth-context'
import {SubmitHandler, useForm} from 'react-hook-form'
import {useNavigate} from 'react-router'
import theme from 'theme/index'
import {z} from 'zod'

function useAuthenticate() {
  const {login} = useAuth()
  const navigate = useNavigate()
  return useMutation(
    ({email, password}: {email: string; password: string}) =>
      login(email, password),
    {
      onSuccess: () => {
        navigate('/')
      },
    },
  )
}

const schema = z.object({
  email: z.string().email('Please provide valid email'),
  password: z.string().min(5, 'Minimum password length is 5 characters'),
})

type FormValues = z.infer<typeof schema>

export function LoginForm() {
  const auth = useAuthenticate()
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: 'dmoisieiev@readdle.com',
      password: 'SrkniwYRB23s2Z',
    },
  })

  const onSubmit: SubmitHandler<FormValues> = data => {
    const {email, password} = data
    auth.mutate({email, password})
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{marginBottom: '3rem'}}>
        <div style={{marginBottom: '1.5rem'}}>
          <Label htmlFor="email">Email:</Label>
          <Input
            aria-label="Email input"
            type="text"
            id="email"
            autoComplete="email"
            error={!!errors.email?.message}
            placeholder="Enter email"
            {...register('email')}
          />
          <FieldError>{errors.email?.message}</FieldError>
        </div>

        <div style={{marginBottom: '1.5rem'}}>
          <Label htmlFor="password">Password:</Label>
          <Input
            aria-label="Password input"
            type="password"
            id="password"
            autoComplete="current-password"
            error={!!errors.password?.message}
            placeholder="Type password"
            {...register('password')}
          />
          <FieldError>{errors.password?.message}</FieldError>
        </div>

        {auth.isError && (
          <div style={{color: theme.pallete.red4}}>
            The email/password combination used was not found on the system.
          </div>
        )}
      </div>

      <Button
        style={{width: '100%'}}
        aria-label="Login button"
        type="submit"
        disabled={auth.isLoading}
      >
        Log in
      </Button>
    </form>
  )
}
