import { AuthLayout, LoginForm } from 'features/auth';
import { Box } from 'common/components/Box';

export function LoginPage() {
  return (
    <AuthLayout>
      <Box
        css={{
          width: '100%',
        }}
      >
        <h2>Log in to your account</h2>
        <LoginForm />
      </Box>
    </AuthLayout>
  );
}
