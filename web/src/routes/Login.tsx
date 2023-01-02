import { Container, Input } from "@/components/ui";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginInputs, LoginSchema } from "@/features/auth/auth.schema";
import useAuth from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [formError, setFormError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<LoginInputs>({
    resolver: zodResolver(LoginSchema),
  });

  const { handleLogin } = useAuth();

  const onSubmit: SubmitHandler<LoginInputs> = async (values) => {
    try {
      await handleLogin(values);
    } catch (error) {
      if (typeof error === "string") {
        return setFormError(error);
      }
      throw new Error("Something went wrong", { cause: error });
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-2 rounded bg-white p-6 shadow-md">
        <p className="mb-6 text-center text-4xl font-bold">Login</p>
        <div className="mb-4">
          <Input
            label="Username"
            placeholder="ex: johndoe"
            formError={errors.username}
            {...register("username", { required: true })}
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

        {formError && <p className="font-sm my-4 text-center text-red-500">{formError}</p>}

        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`focus:shadow-outline min-w-[100px] rounded py-2 px-4 font-bold text-white transition-all focus:outline-none
               ${
                 isSubmitting
                   ? "bg-gray-400 text-white"
                   : "bg-primary-main text-white hover:bg-primary-dark"
               }
            `}
          >
            {isSubmitting ? "Loading" : "Login"}
          </button>
        </div>

        <div className="my-4 text-center">
          <p className="text-sm">
            No account yet?{" "}
            <Link className="font-bold text-blue-500 hover:text-blue-800" to="/signup">
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </Container>
  );
};

export default Login;
