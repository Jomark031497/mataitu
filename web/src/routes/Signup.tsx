import { Container, Input } from "@/components/ui";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpInputs, SignUpSchema } from "@/features/auth/auth.schema";
import useAuth from "@/hooks/useAuth";
import { Link } from "react-router-dom";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SignUpInputs>({
    resolver: zodResolver(SignUpSchema),
  });

  const { handleSignup } = useAuth();

  const onSubmit: SubmitHandler<SignUpInputs> = async (values) => {
    try {
      await handleSignup(values);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-2 rounded bg-white p-6 shadow-md">
        <p className="mb-6 text-center text-4xl font-bold">Sign Up</p>

        <div className="mb-4">
          <Input
            label="Username"
            placeholder="ex: johndoe"
            formError={errors.username}
            {...register("username", { required: true })}
          />
        </div>
        <div className="mb-4">
          <Input
            label="email"
            type="email"
            placeholder="ex: johndoe@example.com"
            formError={errors.email}
            {...register("email", { required: true })}
          />
        </div>
        <div className="mb-6">
          <Input
            label="Password"
            placeholder="******"
            type="password"
            formError={errors.password}
            {...register("password", { required: true })}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={isSubmitting}
            className="focus:shadow-outline rounded bg-primary-main py-2 px-4 font-bold text-white transition-all hover:bg-primary-dark focus:outline-none"
          >
            Sign In
          </button>
        </div>
        <div className="my-4 text-center">
          <p className="text-sm">
            Already have an account?{" "}
            <Link className="font-bold text-blue-500 hover:text-blue-800" to="/login">
              Login
            </Link>
          </p>
        </div>
      </form>
    </Container>
  );
};

export default Signup;
