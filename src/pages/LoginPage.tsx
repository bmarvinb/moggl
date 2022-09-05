import {LoginForm} from 'features/login-form/LoginForm'
import {AuthLayout} from 'layout/AuthLayout'
import styled from 'styled-components'

const Container = styled.div`
  width: 100%;
`

export function LoginPage() {
  return (
    <AuthLayout>
      <Container>
        <h2>Log in to your account</h2>
        <LoginForm />
      </Container>
    </AuthLayout>
  )
}
