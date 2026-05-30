import { useForm } from "react-hook-form";
import { useLogin } from "../../hooks/useAuth";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const mutation = useLogin();

  return (
    <form
      onSubmit={handleSubmit((data: any) => mutation.mutate(data))}
      className="max-w-sm mx-auto mt-20"
    >
      <input {...register("email")} placeholder="Email" className="input" />
      <input {...register("password")} placeholder="Password" className="input" />

      <button type="submit">Login</button>
    </form>
  );
}