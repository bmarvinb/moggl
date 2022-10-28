import { AuthLayout, LoginForm } from 'features/auth';

export function LoginPage() {
  return (
    <AuthLayout>
      <div className="w-full">
        <h2>Log in to your account</h2>
        <LoginForm />
      </div>
    </AuthLayout>
  );
}
