import { AuthLayout } from 'components/AuthLayout'
import { LoginForm } from 'components/LoginForm'
import 'styled-components/macro'

export function LoginPage() {
  return (
    <AuthLayout>
      <div
        css={`
          width: 100%;
        `}
      >
        <h2>Log in to your account</h2>
        <LoginForm />
      </div>
    </AuthLayout>
  )
}
