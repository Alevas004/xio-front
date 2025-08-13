"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePost } from "@/hooks/usePost";
import { useDispatch } from "react-redux";
import { login } from "@/redux/slices/authSlice";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.string().email(""),
  password: z.string(),
});

type LoginSchema = z.infer<typeof loginSchema>;

type Inputs = LoginSchema;

const LoginForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  //* USE POST
  const { data, error, loading, postData } = usePost<LoginSchema>(
    "/xio//users/login",
    {
      withAuth: false,
    }
  );

  //* USE FORM
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    postData(formData);
  };

  useEffect(() => {
    if (data) {
      Cookies.set("token", data.token, { expires: 7 });
      Cookies.set("user", JSON.stringify(data.user), { expires: 7 });
      dispatch(login(data));
      reset();
      router.push("/");
    }
  }, [data, dispatch]);

  return (
    <div className="w-full h-100 flex flex-col items-center justify-center">
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <>
            <span className="text-red-500 text-xs">{error}</span>
          </>
        )}
        {loading && (
          <>
            <span className="text-blue-500 text-xs">Loading...</span>
          </>
        )}
        <section className="space-y-4 border-verde-oscuro border-2 rounded-2xl p-5">
          <div className="flex flex-col items-start space-y-2 ">
            <Label htmlFor="email">Correo Electronico:</Label>
            <Input
              type="text"
              id="email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <span className="text-red-500 text-xs">
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="flex flex-col items-start space-y-2">
            <Label htmlFor="password">Contraseña:</Label>
            <Input type="password" id="password" {...register("password")} />
            {errors.password && (
              <span className="text-red-500 text-xs">
                {errors.password.message}
              </span>
            )}
          </div>
          <Button
            type="submit"
            variant="outline"
            className="w-2/3 text-lg font-bold cursor-pointer text-piel-blanco bg-gradient-2 hover:bg-gradient-1 hover:text-verde-oscuro"
          >
            Acceder
          </Button>
          <p className="text-sm text-center mt-3">
            No tienes una cuenta?{" "}
            <Link
              href="/xio-auth/register"
              className="text-piel-oscuro hover:underline"
            >
              Regístrate aquí
            </Link>
          </p>
        </section>
      </form>
    </div>
  );
};

export default LoginForm;
