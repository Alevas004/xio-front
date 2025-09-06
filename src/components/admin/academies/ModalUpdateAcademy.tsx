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
  Calendar,
  Users,
  Award,
  MapPin,
  Clock,
  User,
} from "lucide-react";

const updateSchema = z
  .object({
    title: z.string().min(2, "El título es obligatorio"),
    subtitle: z.string().min(2, "El subtítulo es obligatorio"),
    type: z
      .string()
      .min(0, "La categoría es obligatoria")
      .max(100, "La categoría no puede superar los 100 caracteres"),
    description_short: z
      .string()
      .min(10, "La descripción corta es obligatoria"),
    description_long: z.string().min(20, "La descripción larga es obligatoria"),
    image: z.string().url("La imagen debe ser una URL válida"),
    images: z
      .array(z.string().url("Cada imagen debe ser una URL válida"))
      .nullable()
      .optional(),
    location: z.string().min(2, "La ubicación es obligatoria"),
    start_date: z.string({ message: "La fecha de inicio debe ser ISO válida" }),
    end_date: z.string({ message: "La fecha de fin debe ser ISO válida" }),
    start_time: z
      .string()
      .regex(/^\d{2}:\d{2}:\d{2}$/, "La hora debe tener formato HH:mm:ss"),
    end_time: z
      .string()
      .regex(/^\d{2}:\d{2}:\d{2}$/, "La hora debe tener formato HH:mm:ss"),
    duration: z.number().positive("La duración debe ser mayor a 0"),
    price: z.number().nonnegative("El precio no puede ser negativo"),
    capacity: z.number().int().positive("La capacidad debe ser mayor a 0"),
    enrolled: z
      .number()
      .int()
      .nonnegative("El número de inscritos no puede ser negativo")
      .optional(),
    includes: z.array(z.string()).nonempty("Debe incluir al menos un ítem"),
    requirements: z.array(z.string()).optional(),
    certificate: z.boolean(),
    materials_included: z.boolean(),
    materials_description: z.array(z.string()).optional(),
    speaker: z.string().min(2, "El nombre del ponente es obligatorio"),
    speakers: z.array(z.string()).optional(),
    level: z
      .string()
      .min(0, "El nivel es obligatorio")
      .max(100, "El nivel no puede superar los 100 caracteres"),
    is_active: z.boolean(),
  })
  .partial();

export type UpdateFormValues = z.infer<typeof updateSchema>;

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description_short: string;
  description_long: string;
  url: string;
  images: string[];
  category: string[];
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
}

export interface AcademyUpdate {
  id: string;
  title: string;
  subtitle: string;
  type: string;
  description_short: string;
  description_long: string;
  image: string;
  images: string[];
  location: string;
  start_date: string; // ISO string
  end_date: string; // ISO string
  start_time: string; // "HH:mm:ss"
  end_time: string; // "HH:mm:ss"
  duration: number;
  price: number;
  capacity: number;
  enrolled: number;
  includes: string[];
  requirements: string[];
  certificate: boolean;
  materials_included: boolean;
  materials_description: string[];
  speaker: string;
  speakers: string[];
  level: string;
  slug: string;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
  courses: Course[];
}

interface UpdateProps {
  academy: AcademyUpdate;
  onClose: () => void;
  onSave: (data: AcademyUpdate) => Promise<void>;
  error: string | null;
  loading: boolean;
  isOpen: boolean;
}

const ModalUpdateAcademy = ({
  academy,
  onClose,
  onSave,
  error,
  loading,
  isOpen,
}: UpdateProps) => {
  const [includeMaterials, setIncludeMaterials] = useState<boolean | undefined>(
    academy.materials_included
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm<UpdateFormValues>({
    resolver: zodResolver(updateSchema),
    defaultValues: academy,
  });

  useEffect(() => {
    if (isOpen && academy) {
      reset({
        title: academy.title,
        subtitle: academy.subtitle,
        type: academy.type,
        description_short: academy.description_short,
        description_long: academy.description_long,
        image: academy.image,
        images: academy.images,
        location: academy.location,
        start_date: academy.start_date,
        end_date: academy.end_date,
        start_time: academy.start_time,
        end_time: academy.end_time,
        duration: academy.duration,
        price: academy.price,
        capacity: academy.capacity,
        enrolled: academy.enrolled,
        includes: academy.includes,
        requirements: academy.requirements,
        certificate: academy.certificate,
        materials_included: academy.materials_included,
        materials_description: academy.materials_description,
        speaker: academy.speaker,
        speakers: academy.speakers,
        level: academy.level,
        is_active: academy.is_active,
      });

      // Force set Select fields to ensure they update properly
      setTimeout(() => {
        setValue("type", academy.type);
        setValue("level", academy.level);
      }, 100);

      setIncludeMaterials(academy.materials_included);
    }
  }, [academy, reset, isOpen, setValue]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                🎓 Editar Academia
              </h2>
              <p className="text-sm text-white/90">{academy.title}</p>
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
          <div className="border-b bg-blue-50 px-6 py-4">
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
              <div className="flex items-center space-x-3 text-blue-600">
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
                  Actualizando academia...
                </span>
              </div>
            )}
          </div>
        )}

        {/* Form Content */}
        <div className="max-h-[calc(90vh-200px)] overflow-y-auto">
          <form
            onSubmit={handleSubmit((data) => {
              // Fill missing required fields with fallback values from academy
              const completeData: AcademyUpdate = {
                id: academy.id,
                title: data.title ?? academy.title,
                subtitle: data.subtitle ?? academy.subtitle,
                type: data.type ?? academy.type,
                description_short:
                  data.description_short ?? academy.description_short,
                description_long:
                  data.description_long ?? academy.description_long,
                image: data.image ?? academy.image,
                images: data.images ?? academy.images,
                location: data.location ?? academy.location,
                start_date: data.start_date ?? academy.start_date,
                end_date: data.end_date ?? academy.end_date,
                start_time: data.start_time ?? academy.start_time,
                end_time: data.end_time ?? academy.end_time,
                duration: data.duration ?? academy.duration,
                price: data.price ?? academy.price,
                capacity: data.capacity ?? academy.capacity,
                enrolled: data.enrolled ?? academy.enrolled,
                includes: data.includes ?? academy.includes,
                requirements: data.requirements ?? academy.requirements,
                certificate: data.certificate ?? academy.certificate,
                materials_included:
                  data.materials_included ?? academy.materials_included,
                materials_description:
                  data.materials_description ?? academy.materials_description,
                speaker: data.speaker ?? academy.speaker,
                speakers: data.speakers ?? academy.speakers,
                level: (data.level ?? academy.level) as string,
                slug: academy.slug,
                is_active: data.is_active ?? academy.is_active,
                createdAt: academy.createdAt,
                updatedAt: academy.updatedAt,
                courses: academy.courses,
              };
              return onSave(completeData);
            })}
            className="p-6"
          >
            <div className="grid gap-8">
              {/* Información Básica */}
              <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-6 border border-blue-100">
                <h3 className="mb-6 flex items-center text-lg font-bold text-gray-800">
                  <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
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
                      <GraduationCap className="w-4 h-4 text-blue-600" />
                      Título de la Academia
                    </Label>
                    <Input
                      type="text"
                      id="title"
                      {...register("title")}
                      className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 bg-white"
                      placeholder="Ej: Workshop de Liderazgo"
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
                      htmlFor="type"
                      className="text-sm font-semibold text-gray-700"
                    >
                      🎯 Tipo de Programa
                    </Label>
                    <Controller
                      name="type"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 bg-white">
                            <SelectValue placeholder="Selecciona el tipo" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            <SelectItem value="workshop">🛠️ Taller</SelectItem>
                            <SelectItem value="seminar">
                              📚 Seminario
                            </SelectItem>
                            <SelectItem value="retreat">🏞️ Retiro</SelectItem>
                            <SelectItem value="training">
                              💼 Capacitación
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.type && (
                      <p className="text-xs text-red-600">
                        ⚠️ {errors.type.message}
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
                      className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 bg-white"
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
                      htmlFor="level"
                      className="text-sm font-semibold text-gray-700"
                    >
                      📊 Nivel
                    </Label>
                    <Controller
                      name="level"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 bg-white">
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
                      className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 bg-white"
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
                      className="w-full rounded-md border border-blue-200 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
                      placeholder="Describe en detalle el contenido y beneficios del programa..."
                    />
                    {errors.description_long && (
                      <p className="text-xs text-red-600">
                        ⚠️ {errors.description_long.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Información de Fechas y Ubicación */}
              <div className="rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 p-6 border border-green-100">
                <h3 className="mb-6 flex items-center text-lg font-bold text-gray-800">
                  <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white">
                    <span className="text-sm font-bold">2</span>
                  </div>
                  📅 Fechas y Ubicación
                </h3>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="space-y-2">
                    <Label
                      htmlFor="location"
                      className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                    >
                      <MapPin className="w-4 h-4 text-green-600" />
                      Ubicación
                    </Label>
                    <Input
                      type="text"
                      id="location"
                      {...register("location")}
                      className="border-green-200 focus:border-green-500 focus:ring-green-500 bg-white"
                      placeholder="Ej: Bogotá, Colombia"
                    />
                    {errors.location && (
                      <p className="text-xs text-red-600">
                        ⚠️ {errors.location.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="start_date"
                      className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                    >
                      <Calendar className="w-4 h-4 text-green-600" />
                      Fecha de Inicio
                    </Label>
                    <Input
                      type="date"
                      id="start_date"
                      {...register("start_date")}
                      className="border-green-200 focus:border-green-500 focus:ring-green-500 bg-white"
                    />
                    {errors.start_date && (
                      <p className="text-xs text-red-600">
                        ⚠️ {errors.start_date.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="end_date"
                      className="text-sm font-semibold text-gray-700"
                    >
                      📅 Fecha de Fin
                    </Label>
                    <Input
                      type="date"
                      id="end_date"
                      {...register("end_date")}
                      className="border-green-200 focus:border-green-500 focus:ring-green-500 bg-white"
                    />
                    {errors.end_date && (
                      <p className="text-xs text-red-600">
                        ⚠️ {errors.end_date.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="start_time"
                      className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                    >
                      <Clock className="w-4 h-4 text-green-600" />
                      Hora de Inicio
                    </Label>
                    <Input
                      type="time"
                      step="1"
                      id="start_time"
                      {...register("start_time")}
                      className="border-green-200 focus:border-green-500 focus:ring-green-500 bg-white"
                    />
                    {errors.start_time && (
                      <p className="text-xs text-red-600">
                        ⚠️ {errors.start_time.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="end_time"
                      className="text-sm font-semibold text-gray-700"
                    >
                      🕐 Hora de Fin
                    </Label>
                    <Input
                      type="time"
                      step="1"
                      id="end_time"
                      {...register("end_time")}
                      className="border-green-200 focus:border-green-500 focus:ring-green-500 bg-white"
                    />
                    {errors.end_time && (
                      <p className="text-xs text-red-600">
                        ⚠️ {errors.end_time.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="duration"
                      className="text-sm font-semibold text-gray-700"
                    >
                      ⏱️ Duración (horas)
                    </Label>
                    <Input
                      type="number"
                      step="0.5"
                      id="duration"
                      {...register("duration", { valueAsNumber: true })}
                      className="border-green-200 focus:border-green-500 focus:ring-green-500 bg-white"
                      placeholder="Ej: 8"
                    />
                    {errors.duration && (
                      <p className="text-xs text-red-600">
                        ⚠️ {errors.duration.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Precio y Capacidad */}
              <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-violet-50 p-6 border border-purple-100">
                <h3 className="mb-6 flex items-center text-lg font-bold text-gray-800">
                  <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-purple-600 text-white">
                    <span className="text-sm font-bold">3</span>
                  </div>
                  💰 Precio y Capacidad
                </h3>
                <div className="grid gap-4 md:grid-cols-3">
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
                      className="border-purple-200 focus:border-purple-500 focus:ring-purple-500 bg-white"
                      placeholder="Ej: 250000"
                    />
                    {errors.price && (
                      <p className="text-xs text-red-600">
                        ⚠️ {errors.price.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="capacity"
                      className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                    >
                      <Users className="w-4 h-4 text-purple-600" />
                      Capacidad Máxima
                    </Label>
                    <Input
                      type="number"
                      id="capacity"
                      {...register("capacity", { valueAsNumber: true })}
                      className="border-purple-200 focus:border-purple-500 focus:ring-purple-500 bg-white"
                      placeholder="Ej: 30"
                    />
                    {errors.capacity && (
                      <p className="text-xs text-red-600">
                        ⚠️ {errors.capacity.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="enrolled"
                      className="text-sm font-semibold text-gray-700"
                    >
                      👥 Inscritos Actuales
                    </Label>
                    <Input
                      type="number"
                      id="enrolled"
                      {...register("enrolled", { valueAsNumber: true })}
                      className="border-purple-200 focus:border-purple-500 focus:ring-purple-500 bg-white"
                      placeholder="Ej: 15"
                    />
                    {errors.enrolled && (
                      <p className="text-xs text-red-600">
                        ⚠️ {errors.enrolled.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Instructor */}
              <div className="rounded-2xl space-y-4 bg-gradient-to-br from-orange-50 to-amber-50 p-6 border border-orange-100">
                <h3 className="mb-6 flex items-center text-lg font-bold text-gray-800">
                  <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 text-white">
                    <span className="text-sm font-bold">4</span>
                  </div>
                  👨‍🏫 Instructor
                </h3>
                <div className="space-y-2">
                  <Label
                    htmlFor="speaker"
                    className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                  >
                    <User className="w-4 h-4 text-orange-600" />
                    Nombre del Instructor Principal
                  </Label>
                  <Input
                    type="text"
                    id="speaker"
                    {...register("speaker")}
                    className="border-orange-200 focus:border-orange-500 focus:ring-orange-500 bg-white"
                    placeholder="Ej: Dr. Juan Pérez"
                  />
                  {errors.speaker && (
                    <p className="text-xs text-red-600">
                      ⚠️ {errors.speaker.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="speakers"
                    className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                  >
                    <User className="w-4 h-4 text-orange-600" />
                    Otros instructores (separado por comas)
                  </Label>
                  <Input
                    type="text"
                    id="speakers"
                    {...register("speakers", {
                      setValueAs: (value) =>
                        typeof value === "string"
                          ? value
                              .split(",")
                              .map((item: string) => item.trim())
                              .filter((item) => item)
                          : value,
                    })}
                    className="border-orange-200 focus:border-orange-500 focus:ring-orange-500 bg-white"
                    placeholder="Ej: Dr. Juan Pérez"
                  />
                  {errors.speakers && (
                    <p className="text-xs text-red-600">
                      ⚠️ {errors.speakers.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Incluye y Certificaciones */}
              <div className="rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 p-6 border border-teal-100">
                <h3 className="mb-6 flex items-center text-lg font-bold text-gray-800">
                  <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-teal-600 text-white">
                    <span className="text-sm font-bold">5</span>
                  </div>
                  🎁 Incluye y Certificaciones
                </h3>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="includes"
                      className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                    >
                      <Award className="w-4 h-4 text-teal-600" />
                      Qué Incluye (separado por comas)
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
                      placeholder="Material didáctico, certificado, refrigerios, acceso plataforma"
                    />
                    {errors.includes && (
                      <p className="text-xs text-red-600">
                        ⚠️ {errors.includes.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="requirements"
                      className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                    >
                      <Award className="w-4 h-4 text-teal-600" />
                      Requisitos (separado por comas)
                    </Label>
                    <Input
                      type="text"
                      id="requirements"
                      {...register("requirements", {
                        setValueAs: (value) =>
                          typeof value === "string"
                            ? value
                                .split(",")
                                .map((item: string) => item.trim())
                                .filter((item) => item)
                            : value,
                      })}
                      className="border-teal-200 focus:border-teal-500 focus:ring-teal-500 bg-white"
                      placeholder="Material didáctico, certificado, refrigerios, acceso plataforma"
                    />
                    {errors.includes && (
                      <p className="text-xs text-red-600">
                        ⚠️ {errors.includes.message}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
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
                        🏆 Incluye Certificado
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 rounded-lg bg-white p-4 shadow-sm border border-teal-100">
                      <input
                        type="checkbox"
                        id="materials_included"
                        {...register("materials_included")}
                        className="h-4 w-4 rounded border-teal-300 text-teal-600 focus:ring-teal-500"
                        onClick={() => setIncludeMaterials(!includeMaterials)}
                      />
                      <Label
                        htmlFor="materials_included"
                        className="text-sm font-semibold text-gray-700"
                      >
                        📚 Incluye Materiales
                      </Label>
                    </div>
                  </div>
                  {includeMaterials && (
                    <div className="space-y-2">
                      <Label
                        htmlFor="materials_description"
                        className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                      >
                        <Award className="w-4 h-4 text-teal-600" />
                        Materiales incluidos (separado por comas)
                      </Label>
                      <Input
                        type="text"
                        id="materials_description"
                        {...register("materials_description", {
                          setValueAs: (value) =>
                            typeof value === "string"
                              ? value
                                  .split(",")
                                  .map((item: string) => item.trim())
                                  .filter((item) => item)
                              : value,
                        })}
                        className="border-teal-200 focus:border-teal-500 focus:ring-teal-500 bg-white"
                        placeholder="Material didáctico, certificado, refrigerios, acceso plataforma"
                      />
                      {errors.materials_description && (
                        <p className="text-xs text-red-600">
                          ⚠️ {errors.materials_description.message}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Imagen */}
              <div className="rounded-2xl space-y-4 bg-gradient-to-br from-rose-50 to-pink-50 p-6 border border-rose-100">
                <h3 className="mb-6 flex items-center text-lg font-bold text-gray-800">
                  <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-rose-600 text-white">
                    <span className="text-sm font-bold">6</span>
                  </div>
                  🖼️ Imagen Principal
                </h3>
                <div className="space-y-2">
                  <Label
                    htmlFor="image"
                    className="text-sm font-semibold text-gray-700"
                  >
                    URL de Imagen Principal
                  </Label>
                  <Input
                    type="url"
                    id="image"
                    {...register("image")}
                    className="border-rose-200 focus:border-rose-500 focus:ring-rose-500 bg-white"
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                  {errors.image && (
                    <p className="text-xs text-red-600">
                      ⚠️ {errors.image.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="images"
                    className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                  >
                    <Award className="w-4 h-4 text-teal-600" />
                    Otras imagenes (separado por comas)
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
                    className="border-teal-200 focus:border-teal-500 focus:ring-teal-500 bg-white"
                    placeholder="Material didáctico, certificado, refrigerios, acceso plataforma"
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
                    <span className="text-sm font-bold">7</span>
                  </div>
                  ⚡ Estado de la Academia
                </h3>
                <div className="flex items-center space-x-3 rounded-lg bg-white p-4 shadow-sm border border-slate-200">
                  <input
                    type="checkbox"
                    id="is_active"
                    {...register("is_active")}
                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <Label
                    htmlFor="is_active"
                    className="text-sm font-semibold text-gray-700"
                  >
                    ✅ Academia Activa
                  </Label>
                </div>
              </div>
            </div>

            {/* Footer con botones */}
            <div className="mt-8 flex justify-end space-x-4 border-t bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-6 -mx-6 -mb-6 rounded-b-3xl">
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
                className="px-8 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 hover:from-blue-700 hover:to-indigo-700"
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
                  "💾 Actualizar Academia"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalUpdateAcademy;
