import {LoginForm} from 'components/LoginForm'
import {AuthLayout} from 'components/AuthLayout'
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
