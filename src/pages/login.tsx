import { useNavigate } from "react-router";
import { useAuth } from "../context/auth-context";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Please provide valid email"),
  password: z.string().min(5, "Minimum password length is 5 characters"),
});

type FormValues = z.infer<typeof schema>;

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "dmoisieiev@readdle.com",
      password: "SrkniwYRB23s2Z",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const { email, password } = data;
    login(email, password, true)
      .then(() => navigate("/"))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            autoComplete="email"
            required
            {...register("email")}
          />
          <p>{errors.email?.message}</p>
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            autoComplete="current-password"
            {...register("password")}
          />
          <p>{errors.password?.message}</p>
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
