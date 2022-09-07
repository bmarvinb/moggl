import { useMutation } from '@tanstack/react-query'
import { useAuth } from 'context/auth-context'
import { useNavigate } from 'react-router'

export function useAuthenticate() {
  const { login } = useAuth()
  const navigate = useNavigate()
  return useMutation(
    ({ email, password }: { email: string; password: string }) =>
      login(email, password),
    {
      onSuccess: () => {
        navigate('/')
      },
    },
  )
}
