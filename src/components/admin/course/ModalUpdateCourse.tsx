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
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import z from "zod";
import {
  GraduationCap,
  X,
  BookOpen,
  Star,
  Clock,
  User,
  Tag,
  Award,
  Link,
} from "lucide-react";
import { Academy } from "../academies/AcademyManager";
import { useGet } from "@/hooks/useGet";

const updateSchema = z
  .object({
    title: z.string().min(2, { message: "Título obligatorio" }),
    subtitle: z.string().min(2, { message: "Subtítulo obligatorio" }),
    description_short: z
      .string()
      .min(5, { message: "Descripción corta obligatoria" }),
    description_long: z
      .string()
      .min(10, { message: "Descripción larga obligatoria" }),
    url: z.string().url({ message: "Debe ser una URL válida" }),
    images: z.array(
      z.string().url({ message: "Cada link debe ser una URL válida" })
    ),
    category: z.string().min(2, { message: "Categoría obligatoria" }),
    tags: z.array(
      z.string().min(1, { message: "El tag no puede estar vacío" })
    ),
    price: z
      .number()
      .nonnegative({ message: "El precio debe ser mayor o igual a 0" }),
    is_free: z.boolean(),
    level: z
      .string()
      .min(0, "El nivel es obligatorio")
      .max(100, "El nivel no puede superar los 100 caracteres"),
    duration: z
      .number()
      .positive({ message: "La duración debe ser mayor a 0" }),
    certificate: z.boolean(),
    instructor: z.string().min(2, { message: "Instructor obligatorio" }),
    includes: z.array(
      z.string().min(2, { message: "El item no puede estar vacío" })
    ),
    is_active: z.boolean(),
    academyId: z
      .string()
      .uuid({ message: "academyId inválido" })
      .optional()
      .nullable(),
    belongsToAWorkshop: z.boolean(),
  })
  .partial();

export type UpdateFormValues = z.infer<typeof updateSchema>;

export interface CourseUpdate {
  id: string;
  title: string;
  subtitle: string;
  description_short: string;
  description_long: string;
  url: string;
  images: string[];
  category: string;
  tags: string[];
  price: number;
  is_free: boolean;
  level: "beginner" | "intermediate" | "advanced";
  duration: number;
  certificate: boolean;
  instructor: string;
  includes: string[];
  is_active: boolean;
  academyId: string;
  belongsToAWorkshop: boolean;
}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description_short: string;
  description_long: string;
  url: string;
  images: string[];
  category: string;
  tags: string[];
  price: number;
  is_free: boolean;
  level: "beginner" | "intermediate" | "advanced";
  duration: number;
  certificate: boolean;
  instructor: string;
  includes: string[];
  is_active: boolean;
  slug: string;
  createdAt: string;
  updatedAt: string;
  academyId: string;
  belongsToAWorkshop: boolean;
  academy: Academy | null;
}

interface UpdateProps {
  course: CourseUpdate;
  onClose: () => void;
  onSave: (data: CourseUpdate) => Promise<void>;
  error: string | null;
  loading: boolean;
  isOpen: boolean;
}

const ModalUpdateCourse = ({
  course,
  onClose,
  onSave,
  error,
  loading,
  isOpen,
}: UpdateProps) => {
  //* GET WORKSHOPS DISPONIBLES:
  const {
    data: workshops,
    error: workshopsError,
    loading: workshopsLoading,
    refetch,
  } = useGet("/xios-academy/event?type=workshop", { withAuth: false });

  console.log(workshops, "<- WORKSHOPS");

  const [belongsToWorkshop, setBelongsToWorkshop] = useState<boolean>(
    course.belongsToAWorkshop
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    watch,
    setValue,
  } = useForm<UpdateFormValues>({
    resolver: zodResolver(updateSchema),
    defaultValues: course,
  });

  const watchIsFree = watch("is_free");
  const watchBelongsToWorkshop = watch("belongsToAWorkshop");

  useEffect(() => {
    setBelongsToWorkshop(watchBelongsToWorkshop || false);
  }, [watchBelongsToWorkshop]);

  useEffect(() => {
    if (isOpen && course) {
      reset({
        title: course.title,
        subtitle: course.subtitle,
        description_short: course.description_short,
        description_long: course.description_long,
        url: course.url,
        images: course.images,
        category: course.category,
        tags: course.tags,
        price: course.price,
        is_free: course.is_free,
        level: course.level,
        duration: course.duration,
        certificate: course.certificate,
        instructor: course.instructor,
        includes: course.includes,
        is_active: course.is_active,
        academyId: course.academyId,
        belongsToAWorkshop: course.belongsToAWorkshop,
      });

      // Force set Select fields to ensure they update properly
      setTimeout(() => {
        setValue("category", course.category);
        setValue("level", course.level);
      }, 100);

      setBelongsToWorkshop(course.belongsToAWorkshop);
    }
  }, [course, reset, isOpen, setValue]);

  useEffect(() => {
    console.log("❌ Form errors:", errors);
  }, [errors]);

  useEffect(() => {
    refetch();
  }, [refetch, belongsToWorkshop]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b bg-gradient-to-r from-purple-600 to-indigo-600 p-6">
          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                📚 Editar Curso
              </h2>
              <p className="text-sm text-white/90">{course.title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white transition-all hover:bg-white/30 hover:scale-105"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Status Messages */}
        {(error || loading) && (
          <div className="border-b bg-purple-50 px-6 py-4">
            {error && (
              <div className="flex items-center space-x-3 text-red-600">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}
            {loading && (
              <div className="flex items-center space-x-3 text-purple-600">
                <div className="flex h-8 w-8 items-center justify-center">
                  <svg
                    className="h-5 w-5 animate-spin"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium">
                  Actualizando curso...
                </span>
              </div>
            )}
          </div>
        )}

        {/* Form Content */}
        <div className="max-h-[calc(90vh-200px)] overflow-y-auto">
          <form
            key={`course-form-${course.id}`}
            onSubmit={handleSubmit((data) => {
              console.log("🚀 Form submitted with data:", data);
              const completeData: CourseUpdate = {
                id: course.id,
                title: data.title ?? course.title,
                subtitle: data.subtitle ?? course.subtitle,
                description_short:
                  data.description_short ?? course.description_short,
                description_long:
                  data.description_long ?? course.description_long,
                url: data.url ?? course.url,
                images: data.images ?? course.images,
                category: data.category ?? course.category,
                tags: data.tags ?? course.tags,
                price: data.price ?? course.price,
                is_free: data.is_free ?? course.is_free,
                level: (data.level ?? course.level) as
                  | "beginner"
                  | "intermediate"
                  | "advanced",
                duration: data.duration ?? course.duration,
                certificate: data.certificate ?? course.certificate,
                instructor: data.instructor ?? course.instructor,
                includes: data.includes ?? course.includes,
                is_active: data.is_active ?? course.is_active,
                academyId: data.academyId ?? course.academyId,
                belongsToAWorkshop:
                  data.belongsToAWorkshop ?? course.belongsToAWorkshop,
              };
              console.log("📝 Complete data to send:", completeData);
              return onSave(completeData);
            })}
            className="p-6"
          >
            <div className="grid gap-8">
              {/* Información Básica */}
              <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 p-6 border border-purple-100">
                <h3 className="mb-6 flex items-center text-lg font-bold text-gray-800">
                  <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 text-white">
                    <span className="text-sm font-bold">1</span>
                  </div>
                  📚 Información Básica
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label
                      htmlFor="title"
                      className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                    >
                      <BookOpen className="w-4 h-4 text-purple-600" />
                      Título del Curso
                    </Label>
                    <Input
                      type="text"
                      id="title"
                      {...register("title")}
                      className="border-purple-200 focus:border-purple-500 focus:ring-purple-500 bg-white"
                      placeholder="Ej: Emprendimiento Consciente"
                    />
                    {errors.title && (
                      <p className="text-xs text-red-600 flex items-center gap-1">
                        <span>⚠️</span>
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="subtitle"
                      className="text-sm font-semibold text-gray-700"
                    >
                      📝 Subtítulo
                    </Label>
                    <Input
                      type="text"
                      id="subtitle"
                      {...register("subtitle")}
                      className="border-purple-200 focus:border-purple-500 focus:ring-purple-500 bg-white"
                      placeholder="Subtítulo descriptivo"
                    />
                    {errors.subtitle && (
                      <p className="text-xs text-red-600">
                        ⚠️ {errors.subtitle.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="category"
                      className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                    >
                      <Tag className="w-4 h-4 text-purple-600" />
                      Categoría
                    </Label>
                    <Controller
                      name="category"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="border-purple-200 focus:border-purple-500 focus:ring-purple-500 bg-white">
                            <SelectValue placeholder="Selecciona la categoría" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            <SelectItem value="entrepreneurship">
                              💼 Emprendimiento
                            </SelectItem>
                            <SelectItem value="wellness">
                              🌿 Bienestar
                            </SelectItem>
                            <SelectItem value="therapy">💆‍♀️ Terapia</SelectItem>
                            <SelectItem value="business">
                              📈 Negocios
                            </SelectItem>
                            <SelectItem value="personal-development">
                              🌟 Desarrollo Personal
                            </SelectItem>
                            <SelectItem value="health">🏥 Salud</SelectItem>
                            <SelectItem value="spirituality">
                              🧘‍♀️ Espiritualidad
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.category && (
                      <p className="text-xs text-red-600">
                        ⚠️ {errors.category.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="level"
                      className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                    >
                      <Star className="w-4 h-4 text-purple-600" />
                      Nivel
                    </Label>
                    <Controller
                      name="level"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="border-purple-200 focus:border-purple-500 focus:ring-purple-500 bg-white">
                            <SelectValue placeholder="Selecciona el nivel" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            <SelectItem value="beginner">
                              🌱 Principiante
                            </SelectItem>
                            <SelectItem value="intermediate">
                              🚀 Intermedio
                            </SelectItem>
                            <SelectItem value="advanced">
                              🏆 Avanzado
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.level && (
                      <p className="text-xs text-red-600">
                        ⚠️ {errors.level.message}
                      </p>
                    )}
                  </div>

                  <div className="col-span-2 space-y-2">
                    <Label
                      htmlFor="description_short"
                      className="text-sm font-semibold text-gray-700"
                    >
                      📄 Descripción Corta
                    </Label>
                    <Input
                      type="text"
                      id="description_short"
                      {...register("description_short")}
                      className="border-purple-200 focus:border-purple-500 focus:ring-purple-500 bg-white"
                      placeholder="Descripción breve y atractiva"
                    />
                    {errors.description_short && (
                      <p className="text-xs text-red-600">
                        ⚠️ {errors.description_short.message}
                      </p>
                    )}
                  </div>

                  <div className="col-span-2 space-y-2">
                    <Label
                      htmlFor="description_long"
                      className="text-sm font-semibold text-gray-700"
                    >
                      📋 Descripción Detallada
                    </Label>
                    <textarea
                      id="description_long"
                      rows={4}
                      {...register("description_long")}
                      className="w-full rounded-md border border-purple-200 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 bg-white"
                      placeholder="Describe en detalle el contenido y beneficios del curso..."
                    />
                    {errors.description_long && (
                      <p className="text-xs text-red-600">
                        ⚠️ {errors.description_long.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Precio y Duración */}
              <div className="rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 p-6 border border-green-100">
                <h3 className="mb-6 flex items-center text-lg font-bold text-gray-800">
                  <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white">
                    <span className="text-sm font-bold">2</span>
                  </div>
                  💰 Precio y Duración
                </h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 rounded-lg bg-white p-4 shadow-sm border border-green-100">
                      <input
                        type="checkbox"
                        id="is_free"
                        {...register("is_free")}
                        className="h-4 w-4 rounded border-green-300 text-green-600 focus:ring-green-500"
                      />
                      <Label
                        htmlFor="is_free"
                        className="text-sm font-semibold text-gray-700"
                      >
                        🆓 Curso Gratuito
                      </Label>
                    </div>
                  </div>

                  {!watchIsFree && (
                    <div className="space-y-2">
                      <Label
                        htmlFor="price"
                        className="text-sm font-semibold text-gray-700"
                      >
                        💵 Precio (COP)
                      </Label>
                      <Input
                        type="number"
                        step="1000"
                        id="price"
                        {...register("price", { valueAsNumber: true })}
                        className="border-green-200 focus:border-green-500 focus:ring-green-500 bg-white"
                        placeholder="Ej: 150000"
                      />
                      {errors.price && (
                        <p className="text-xs text-red-600">
                          ⚠️ {errors.price.message}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label
                      htmlFor="duration"
                      className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                    >
                      <Clock className="w-4 h-4 text-green-600" />
                      Duración (horas)
                    </Label>
                    <Input
                      type="number"
                      step="0.5"
                      id="duration"
                      {...register("duration", { valueAsNumber: true })}
                      className="border-green-200 focus:border-green-500 focus:ring-green-500 bg-white"
                      placeholder="Ej: 25"
                    />
                    {errors.duration && (
                      <p className="text-xs text-red-600">
                        ⚠️ {errors.duration.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Relación con Workshop */}
              <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 p-6 border border-blue-100">
                <h3 className="mb-6 flex items-center text-lg font-bold text-gray-800">
                  <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
                    <span className="text-sm font-bold">3</span>
                  </div>
                  🛠️ Relación con Workshop
                </h3>
                <div className="grid gap-4">
                  <div className="flex items-center space-x-3 rounded-lg bg-white p-4 shadow-sm border border-blue-100">
                    <input
                      type="checkbox"
                      id="belongsToAWorkshop"
                      {...register("belongsToAWorkshop")}
                      className="h-4 w-4 rounded border-blue-300 text-blue-600 focus:ring-blue-500"
                    />
                    <Label
                      htmlFor="belongsToAWorkshop"
                      className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                    >
                      <Link className="w-4 h-4 text-blue-600" />
                      Este curso pertenece a un Workshop
                    </Label>
                  </div>

                  {belongsToWorkshop && (
                    <div className="space-y-2">
                      <Label
                        htmlFor="academyId"
                        className="text-sm font-semibold text-gray-700"
                      >
                        🎯 Seleccionar Workshop
                      </Label>
                      <Controller
                        name="academyId"
                        control={control}
                        render={({ field }) => (
                          <Select
                            value={field.value || ""}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 bg-white">
                              <SelectValue placeholder="Selecciona el workshop al que pertenece" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                              {workshopsLoading ? (
                                <div className="px-2 py-1.5 text-sm text-gray-500 flex items-center gap-2">
                                  🔄 Cargando workshops...
                                </div>
                              ) : workshopsError ? (
                                <div className="px-2 py-1.5 text-sm text-red-500 flex items-center gap-2">
                                  ❌ Error al cargar workshops
                                </div>
                              ) : Array.isArray(workshops) &&
                                (workshops as Academy[]).length > 0 ? (
                                (workshops as Academy[]).map(
                                  (workshop: Academy) => (
                                    <SelectItem
                                      key={workshop.id}
                                      value={workshop.id}
                                    >
                                      🛠️ {workshop.title} - {workshop.location}
                                    </SelectItem>
                                  )
                                )
                              ) : (
                                <div className="px-2 py-1.5 text-sm text-gray-500 flex items-center gap-2">
                                  📝 No hay workshops disponibles
                                </div>
                              )}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.academyId && (
                        <p className="text-xs text-red-600">
                          ⚠️ {errors.academyId.message}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Instructor */}
              <div className="rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 p-6 border border-orange-100">
                <h3 className="mb-6 flex items-center text-lg font-bold text-gray-800">
                  <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 text-white">
                    <span className="text-sm font-bold">4</span>
                  </div>
                  👨‍🏫 Instructor
                </h3>
                <div className="space-y-2">
                  <Label
                    htmlFor="instructor"
                    className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                  >
                    <User className="w-4 h-4 text-orange-600" />
                    Nombre del Instructor
                  </Label>
                  <Input
                    type="text"
                    id="instructor"
                    {...register("instructor")}
                    className="border-orange-200 focus:border-orange-500 focus:ring-orange-500 bg-white"
                    placeholder="Ej: Xiomara Sánchez"
                  />
                  {errors.instructor && (
                    <p className="text-xs text-red-600">
                      ⚠️ {errors.instructor.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Tags */}
              <div className="rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50 p-6 border border-pink-100">
                <h3 className="mb-6 flex items-center text-lg font-bold text-gray-800">
                  <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-pink-600 text-white">
                    <span className="text-sm font-bold">5</span>
                  </div>
                  🏷️ Tags y Etiquetas
                </h3>
                <div className="space-y-2">
                  <Label
                    htmlFor="tags"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Etiquetas (separadas por comas)
                  </Label>
                  <Input
                    type="text"
                    id="tags"
                    {...register("tags", {
                      setValueAs: (value) =>
                        typeof value === "string"
                          ? value
                              .split(",")
                              .map((item: string) => item.trim())
                              .filter((item) => item)
                          : value,
                    })}
                    className="border-pink-200 focus:border-pink-500 focus:ring-pink-500 bg-white"
                    placeholder="negocio, marketing, propósito, sostenible"
                  />
                  {errors.tags && (
                    <p className="text-xs text-red-600">
                      ⚠️ {errors.tags.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Incluye */}
              <div className="rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 p-6 border border-teal-100">
                <h3 className="mb-6 flex items-center text-lg font-bold text-gray-800">
                  <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-teal-600 text-white">
                    <span className="text-sm font-bold">6</span>
                  </div>
                  🎁 Qué Incluye el Curso
                </h3>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="includes"
                      className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                    >
                      <Award className="w-4 h-4 text-teal-600" />
                      Incluye (separado por comas)
                    </Label>
                    <Input
                      type="text"
                      id="includes"
                      {...register("includes", {
                        setValueAs: (value) =>
                          typeof value === "string"
                            ? value
                                .split(",")
                                .map((item: string) => item.trim())
                                .filter((item) => item)
                            : value,
                      })}
                      className="border-teal-200 focus:border-teal-500 focus:ring-teal-500 bg-white"
                      placeholder="Acceso de por vida, Plantillas de trabajo, Certificado"
                    />
                    {errors.includes && (
                      <p className="text-xs text-red-600">
                        ⚠️ {errors.includes.message}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center space-x-3 rounded-lg bg-white p-4 shadow-sm border border-teal-100">
                    <input
                      type="checkbox"
                      id="certificate"
                      {...register("certificate")}
                      className="h-4 w-4 rounded border-teal-300 text-teal-600 focus:ring-teal-500"
                    />
                    <Label
                      htmlFor="certificate"
                      className="text-sm font-semibold text-gray-700"
                    >
                      🏆 Incluye Certificado de Finalización
                    </Label>
                  </div>
                </div>
              </div>

              {/* Imagen y medios */}
              <div className="rounded-2xl space-y-4 bg-gradient-to-br from-indigo-50 to-purple-50 p-6 border border-indigo-100">
                <h3 className="mb-6 flex items-center text-lg font-bold text-gray-800">
                  <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white">
                    <span className="text-sm font-bold">7</span>
                  </div>
                  🖼️ Imagen Principal
                </h3>
                <div className="space-y-2">
                  <Label
                    htmlFor="url"
                    className="text-sm font-semibold text-gray-700"
                  >
                    URL de Imagen Principal
                  </Label>
                  <Input
                    type="url"
                    id="url"
                    {...register("url")}
                    className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500 bg-white"
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                  {errors.url && (
                    <p className="text-xs text-red-600">
                      ⚠️ {errors.url.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="images"
                    className="text-sm font-semibold text-gray-700"
                  >
                    URLs de Clases
                  </Label>
                  <Input
                    type="text"
                    id="images"
                    {...register("images", {
                      setValueAs: (value) =>
                        typeof value === "string"
                          ? value
                              .split(",")
                              .map((item: string) => item.trim())
                              .filter((item) => item)
                          : value,
                    })}
                    className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500 bg-white"
                    placeholder="https://youtube.com/askdfak"
                  />
                  {errors.images && (
                    <p className="text-xs text-red-600">
                      ⚠️ {errors.images.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Estado */}
              <div className="rounded-2xl bg-gradient-to-br from-slate-50 to-gray-100 p-6 border border-slate-200">
                <h3 className="mb-6 flex items-center text-lg font-bold text-gray-800">
                  <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-slate-600 text-white">
                    <span className="text-sm font-bold">8</span>
                  </div>
                  ⚡ Estado del Curso
                </h3>
                <div className="flex items-center space-x-3 rounded-lg bg-white p-4 shadow-sm border border-slate-200">
                  <input
                    type="checkbox"
                    id="is_active"
                    {...register("is_active")}
                    className="h-4 w-4 rounded border-slate-300 text-green-600 focus:ring-green-500"
                  />
                  <Label
                    htmlFor="is_active"
                    className="text-sm font-semibold text-gray-700"
                  >
                    ✅ Curso Activo
                  </Label>
                </div>
              </div>
            </div>

            {/* Footer con botones */}
            <div className="mt-8 flex justify-end space-x-4 border-t bg-gradient-to-r from-purple-50 to-indigo-50 px-6 py-6 -mx-6 -mb-6 rounded-b-3xl">
              <Button
                type="button"
                onClick={onClose}
                variant="outline"
                className="px-8 py-2 text-gray-600 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                disabled={loading}
              >
                ❌ Cancelar
              </Button>
              <Button
                type="submit"
                className="px-8 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 hover:from-purple-700 hover:to-indigo-700"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center space-x-2">
                    <svg
                      className="h-4 w-4 animate-spin"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    <span>Actualizando...</span>
                  </div>
                ) : (
                  "💫 Actualizar Curso"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalUpdateCourse;
