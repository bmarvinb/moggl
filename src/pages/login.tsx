/** @jsxRuntime classic */
/** @jsx jsx */

import {jsx} from '@emotion/react'
import {zodResolver} from '@hookform/resolvers/zod'
import {Button} from 'components/Button'
import {FieldError} from 'components/FieldError'
import {Input} from 'components/Input'
import {Label} from 'components/Label'
import {useLogin} from 'hooks/use-login'
import {AuthLayout} from 'layout/AuthLayout'
import {SubmitHandler, useForm} from 'react-hook-form'
import theme from 'theme/index'
import {z} from 'zod'

const schema = z.object({
  email: z.string().email('Please provide valid email'),
  password: z.string().min(5, 'Minimum password length is 5 characters'),
})

type FormValues = z.infer<typeof schema>

export function LoginPage() {
  const login = useLogin()
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
    login.mutate({email, password})
  }

  return (
    <AuthLayout>
      <div css={{width: '100%'}}>
        <h2>Log in to your account</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div css={{marginBottom: '3rem'}}>
            <div css={{marginBottom: '1.5rem'}}>
              <Label htmlFor="email">Email:</Label>
              <Input
                aria-label="Email input"
                type="text"
                id="email"
                autoComplete="email"
                required
                error={!!errors.email?.message}
                placeholder="Enter email"
                {...register('email')}
              />
              <FieldError>{errors.email?.message}</FieldError>
            </div>

            <div css={{marginBottom: '1.5rem'}}>
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

            {login.isError && (
              <div css={{color: theme.pallete.red4}}>
                The email/password combination used was not found on the system.
              </div>
            )}
          </div>

          <Button
            css={{width: '100%'}}
            aria-label="Login button"
            type="submit"
            disabled={login.isLoading}
          >
            Log in
          </Button>
        </form>
      </div>
    </AuthLayout>
  )
}
