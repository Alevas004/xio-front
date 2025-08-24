"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePost } from "@/hooks/usePost";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const registerSchema = z
  .object({
    first_name: z.string().min(2, "El nombre es obligatorio").max(50),
    last_name: z.string().min(2, "El apellido es obligatorio").max(100),
    phone: z.string().min(10, "El teléfono es obligatorio y unico").max(15),
    email: z
      .string()
      .email("El correo electrónico no es válido")
      .min(2, "El correo electrónico es obligatorio y único")
      .max(100),
    password: z
      .string()
      .min(6, "La contraseña es obligatoria y debe tener al menos 6 caracteres")
      .max(100),
    confirmPassword: z
      .string()
      .min(
        6,
        "La confirmación de contraseña es obligatoria y debe tener al menos 6 caracteres"
      )
      .max(100),
    vat: z.string().min(2, "La cédula es obligatoria").max(100),
    gender: z.enum(["male", "female", "other"]),
    profile_picture: z.string().optional(),
    country: z.string().min(2, "El país es obligatorio").max(100),
    city: z.string().min(2, "La ciudad es obligatoria").max(100),
    address: z.string().min(2, "La dirección es obligatoria").max(100),
    date_of_birth: z
      .string()
      .min(10)
      .max(10)
      .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato invalido, se espera YYYY-MM-DD"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

type RegisterFormInputs = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const [success, setSuccess] = useState(false);
  //? POST DATA

  const { postData, data, error, loading } = usePost("/xio/users/register", {
    withAuth: false,
  });

  //? Form Handling
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      vat: "",
      gender: "other",
      profile_picture: "",
      country: "",
      city: "",
      address: "",
      date_of_birth: "",
    },
  });

  const onSubmit = (formData: RegisterFormInputs) => {
    console.log("data enviada", formData);
    postData(formData);
  };

  useEffect(() => {
    if (data) {
      reset();
      setSuccess(true);
    }
  }, [data, reset]);

  return (
    <div>
      {success ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-verde-oscuro mb-2">
            ¡Registro Exitoso!
          </h3>
          <p className="text-gray-600 mb-4">
            Tu cuenta ha sido creada correctamente
          </p>
          <Link
            href="/xio-auth/users/login"
            className="inline-flex items-center bg-gradient-2 text-white px-6 py-2 rounded-xl font-medium hover:shadow-lg transition-all duration-300"
          >
            Iniciar Sesión
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
              <span className="text-red-600 text-sm">{error}</span>
            </div>
          )}
          {loading && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <span className="text-blue-600 text-sm">
                Procesando registro...
              </span>
            </div>
          )}
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-verde-oscuro italic mb-2">
              Crear Cuenta
            </h1>
            <p className="text-gray-600">
              Únete a nuestra comunidad de bienestar
            </p>
          </div>
          <div className="space-y-4 grid grid-cols-2 gap-x-4">
            <div className="flex flex-col space-y-1">
              <Label
                htmlFor="first_name"
                className="text-sm font-medium text-verde-oscuro"
              >
                Nombre
              </Label>
              <Input
                type="text"
                id="first_name"
                {...register("first_name")}
                className="text-verde-oscuro"
              />
              {errors.first_name && (
                <span className="text-red-500 text-xs">
                  {errors.first_name.message}
                </span>
              )}
            </div>
            <div className="flex flex-col space-y-1">
              <Label
                htmlFor="last_name"
                className="text-sm font-medium text-verde-oscuro"
              >
                Apellido
              </Label>
              <Input
                type="text"
                id="last_name"
                {...register("last_name")}
                className="text-verde-oscuro"
              />
              {errors.last_name && (
                <span className="text-red-500 text-xs">
                  {errors.last_name.message}
                </span>
              )}
            </div>
            <div className="flex flex-col space-y-1">
              <Label
                htmlFor="phone"
                className="text-sm font-medium text-verde-oscuro"
              >
                Celular
              </Label>
              <Input
                type="text"
                id="phone"
                {...register("phone")}
                className="text-verde-oscuro"
              />
              {errors.phone && (
                <span className="text-red-500 text-xs">
                  {errors.phone.message}
                </span>
              )}
            </div>
            <div className="flex flex-col space-y-1">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-verde-oscuro"
              >
                Correo Electrónico
              </Label>
              <Input
                type="text"
                id="email"
                {...register("email")}
                className="text-verde-oscuro"
              />
              {errors.email && (
                <span className="text-red-500 text-xs">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="flex flex-col items-start space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-verde-oscuro"
              >
                Contraseña:
              </Label>
              <Input
                type="password"
                id="password"
                {...register("password")}
                className="text-verde-oscuro"
              />
              {errors.password && (
                <span className="text-red-500 text-xs">
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="flex flex-col items-start space-y-2">
              <Label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-verde-oscuro"
              >
                Confirmar Contraseña:
              </Label>
              <Input
                type="password"
                id="confirmPassword"
                {...register("confirmPassword")}
                className="text-verde-oscuro"
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-xs">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
            <div className="flex flex-col items-start space-y-2 ">
              <Label
                htmlFor="vat"
                className="text-sm font-medium text-verde-oscuro"
              >
                Numero de cedula:
              </Label>
              <Input
                type="text"
                id="vat"
                {...register("vat")}
                className="text-verde-oscuro"
              />
              {errors.vat && (
                <span className="text-red-500 text-xs">
                  {errors.vat.message}
                </span>
              )}
            </div>
            <div className="flex flex-col items-start space-y-2 ">
              <Label
                htmlFor="gender"
                className="text-sm font-medium text-verde-oscuro"
              >
                Genero:
              </Label>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value || ""}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="w-full text-verde-oscuro">
                      <SelectValue placeholder="Género" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="male">Hombre</SelectItem>
                      <SelectItem value="female">Mujer</SelectItem>
                      <SelectItem value="other">Otro</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.gender && (
                <span className="text-red-500 text-xs">
                  {errors.gender.message}
                </span>
              )}
            </div>
            <div className="flex flex-col items-start space-y-2 ">
              <Label
                htmlFor="country"
                className="text-sm font-medium text-verde-oscuro"
              >
                Pais:
              </Label>
              <Input
                type="text"
                id="country"
                {...register("country")}
                className="text-verde-oscuro"
              />
              {errors.country && (
                <span className="text-red-500 text-xs">
                  {errors.country.message}
                </span>
              )}
            </div>
            <div className="flex flex-col items-start space-y-2 ">
              <Label
                htmlFor="city"
                className="text-sm font-medium text-verde-oscuro"
              >
                Ciudad:
              </Label>
              <Input
                type="text"
                id="city"
                {...register("city")}
                className="text-verde-oscuro"
              />
              {errors.city && (
                <span className="text-red-500 text-xs">
                  {errors.city.message}
                </span>
              )}
            </div>
            <div className="flex flex-col items-start space-y-2 ">
              <Label
                htmlFor="address"
                className="text-sm font-medium text-verde-oscuro"
              >
                Dirección:
              </Label>
              <Input
                type="text"
                id="address"
                {...register("address")}
                className="text-verde-oscuro"
              />
              {errors.address && (
                <span className="text-red-500 text-xs">
                  {errors.address.message}
                </span>
              )}
            </div>
            <div className="flex flex-col items-start space-y-2 ">
              <Label
                htmlFor="date_of_birth"
                className="text-sm font-medium text-verde-oscuro"
              >
                Fecha de nacimiento:
              </Label>
              <Input
                type="text"
                id="date_of_birth"
                {...register("date_of_birth")}
                placeholder="YYYY/MM/DD"
                className="text-verde-oscuro"
              />
              {errors.date_of_birth && (
                <span className="text-red-500 text-xs">
                  {errors.date_of_birth.message}
                </span>
              )}
            </div>
            <div className="flex flex-col items-start space-y-2 ">
              <Label
                htmlFor="profile_picture"
                className="text-sm font-medium text-verde-oscuro"
              >
                Foto:
              </Label>
              <Input
                type="text"
                id="profile_picture"
                {...register("profile_picture")}
                className="text-verde-oscuro"
              />
              {errors.profile_picture && (
                <span className="text-red-500 text-xs">
                  {errors.profile_picture.message}
                </span>
              )}
            </div>
          </div>
          <div className="pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-2 hover:shadow-lg hover:bg-transparent text-white h-11 rounded-xl font-medium transition-all duration-300"
            >
              {loading ? "Creando cuenta..." : "Crear Cuenta"}
            </Button>
          </div>

          <div className="text-center text-sm text-gray-600 mt-4">
            ¿Ya tienes cuenta?{" "}
            <Link
              href="/xio-auth/users/login"
              className="text-piel-oscuro hover:text-verde-oscuro font-medium transition-colors"
            >
              Iniciar Sesión
            </Link>
          </div>
        </form>
      )}
    </div>
  );
};

export default RegisterForm;
