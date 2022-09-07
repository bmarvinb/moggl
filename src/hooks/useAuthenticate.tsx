import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router'

export function useAuthenticate() {
  const navigate = useNavigate()
  return useMutation(
    ({ email, password }: { email: string; password: string }) =>
      Promise.resolve({ email, password }),
    {
      onSuccess: () => {
        navigate('/')
      },
    },
  )
}
