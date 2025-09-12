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
import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import z from "zod";
import { X, BookOpen, Star, Clock, Tag, Award, Link } from "lucide-react";
import { useGet } from "@/hooks/useGet";
import { Course } from "../course/ModalUpdateCourse";

const updateSchema = z
  .object({
    title: z.string(),
    type: z.string(),
    description: z.string(),
    video_url: z.string().url(),
    order: z.number().int().nonnegative(),
    duration: z.number().nonnegative(),
    resources: z.array(z.string().url()).nullable().optional(),
    attached: z.array(z.string().url()).nullable().optional(),
    is_preview: z.boolean(),
    courseId: z.string().uuid(),
  })
  .partial();

export type UpdateFormValues = z.infer<typeof updateSchema>;

export interface LessonUpdate {
  id: string;
  title: string;
  type: string;
  description: string;
  video_url: string;
  order: number;
  duration: number;
  resources?: string[] | null;
  attached?: string[] | null;
  is_preview: boolean;
  courseId: string;
}

export interface Lesson {
  id: string;
  title: string;
  type: string;
  description: string;
  video_url: string;
  order: number;
  duration: number;
  resources?: string[] | null;
  attached?: string[] | null;
  is_preview: boolean;
  slug: string;
  createdAt: string;
  updatedAt: string;
  courseId: string;
  course: Course;
}

interface UpdateProps {
  lesson: LessonUpdate;
  onClose: () => void;
  onSave: (data: LessonUpdate) => Promise<void>;
  error: string | null;
  loading: boolean;
  isOpen: boolean;
}

const ModalUpdateLesson = ({
  lesson,
  onClose,
  onSave,
  error,
  loading,
  isOpen,
}: UpdateProps) => {
  // GET COURSES DISPONIBLES
  const { data: courses, loading: coursesLoading } = useGet(
    "/xios-courses/courses",
    { withAuth: false }
  );

  console.log(courses, "<- COURSES");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
  } = useForm<UpdateFormValues>({
    resolver: zodResolver(updateSchema),
    defaultValues: lesson,
  });

  useEffect(() => {
    if (isOpen && lesson) {
      reset({
        title: lesson.title,
        type: lesson.type,
        description: lesson.description,
        video_url: lesson.video_url,
        order: lesson.order,
        duration: lesson.duration,
        resources: lesson.resources,
        attached: lesson.attached,
        is_preview: lesson.is_preview,
        courseId: lesson.courseId,
      });

      // Force set Select fields to ensure they update properly
      setTimeout(() => {
        setValue("type", lesson.type);
        setValue("courseId", lesson.courseId);
      }, 100);
    }
  }, [lesson, reset, isOpen, setValue]);

  useEffect(() => {
    console.log("❌ Form errors:", errors);
  }, [errors]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b bg-gradient-to-r from-indigo-600 to-blue-600 p-6">
          <div className="flex items-center space-x-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                📝 Editar Lección
              </h2>
              <p className="text-sm text-white/90">{lesson.title}</p>
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
          <div className="border-b bg-indigo-50 px-6 py-4">
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
              <div className="flex items-center space-x-3 text-indigo-600">
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
                  Actualizando lección...
                </span>
              </div>
            )}
          </div>
        )}

        {/* Form Content */}
        <div className="max-h-[calc(90vh-200px)] overflow-y-auto">
          <form
            key={`lesson-form-${lesson.id}`}
            onSubmit={handleSubmit((data) => {
              console.log("🚀 Form submitted with data:", data);
              const completeData: LessonUpdate = {
                id: lesson.id,
                title: data.title ?? lesson.title,
                type: data.type ?? lesson.type,
                description: data.description ?? lesson.description,
                video_url: data.video_url ?? lesson.video_url,
                order: data.order ?? lesson.order,
                duration: data.duration ?? lesson.duration,
                resources: data.resources ?? lesson.resources,
                attached: data.attached ?? lesson.attached,
                is_preview: data.is_preview ?? lesson.is_preview,
                courseId: data.courseId ?? lesson.courseId,
              };
              console.log("📝 Complete data to send:", completeData);
              return onSave(completeData);
            })}
            className="p-6"
          >
            <div className="grid gap-8">
              {/* Información Básica */}
              <div className="rounded-2xl bg-gradient-to-br from-indigo-50 to-blue-50 p-6 border border-indigo-100">
                <h3 className="mb-6 flex items-center text-lg font-bold text-gray-800">
                  <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-white">
                    <span className="text-sm font-bold">1</span>
                  </div>
                  📝 Información Básica
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label
                      htmlFor="title"
                      className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                    >
                      <BookOpen className="w-4 h-4 text-indigo-600" />
                      Título de la Lección
                    </Label>
                    <Input
                      type="text"
                      id="title"
                      {...register("title")}
                      className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500 bg-white"
                      placeholder="Ej: Introducción al Masaje Relajante"
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
                      className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                    >
                      <Tag className="w-4 h-4 text-indigo-600" />
                      Tipo de Lección
                    </Label>
                    <Controller
                      name="type"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500 bg-white">
                            <SelectValue placeholder="Selecciona el tipo de lección" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            <SelectItem value="intro">
                              🎯 Introducción
                            </SelectItem>
                            <SelectItem value="chapter 1">
                              📖 Capítulo 1
                            </SelectItem>
                            <SelectItem value="chapter 2">
                              📖 Capítulo 2
                            </SelectItem>
                            <SelectItem value="chapter 3">
                              📖 Capítulo 3
                            </SelectItem>
                            <SelectItem value="chapter 4">
                              📖 Capítulo 4
                            </SelectItem>
                            <SelectItem value="chapter 5">
                              📖 Capítulo 5
                            </SelectItem>
                            <SelectItem value="chapter 6">
                              📖 Capítulo 6
                            </SelectItem>
                            <SelectItem value="bonus">🎁 Bonus</SelectItem>
                            <SelectItem value="exercise">
                              💪 Ejercicio
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

                  <div className="space-y-2 md:col-span-2">
                    <Label
                      htmlFor="description"
                      className="text-sm font-semibold text-gray-700"
                    >
                      📝 Descripción de la Lección
                    </Label>
                    <textarea
                      id="description"
                      {...register("description")}
                      rows={3}
                      className="w-full rounded-lg border border-indigo-200 focus:border-indigo-500 focus:ring-indigo-500 bg-white px-3 py-2"
                      placeholder="Describe el contenido y objetivos de esta lección..."
                    />
                    {errors.description && (
                      <p className="text-xs text-red-600">
                        ⚠️ {errors.description.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Configuración de Contenido */}
              <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 p-6 border border-blue-100">
                <h3 className="mb-6 flex items-center text-lg font-bold text-gray-800">
                  <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
                    <span className="text-sm font-bold">2</span>
                  </div>
                  🎥 Configuración de Contenido
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label
                      htmlFor="video_url"
                      className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                    >
                      <Link className="w-4 h-4 text-blue-600" />
                      URL del Video
                    </Label>
                    <Input
                      type="url"
                      id="video_url"
                      {...register("video_url")}
                      className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 bg-white"
                      placeholder="https://ejemplo.com/video.mp4"
                    />
                    {errors.video_url && (
                      <p className="text-xs text-red-600">
                        ⚠️ {errors.video_url.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="courseId"
                      className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                    >
                      <Award className="w-4 h-4 text-blue-600" />
                      Curso al que pertenece
                    </Label>
                    <Controller
                      name="courseId"
                      control={control}
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 bg-white">
                            <SelectValue placeholder="Selecciona el curso" />
                          </SelectTrigger>
                          <SelectContent className="bg-white max-h-60">
                            {coursesLoading ? (
                              <SelectItem value="loading" disabled>
                                🔄 Cargando cursos...
                              </SelectItem>
                            ) : courses &&
                              Array.isArray(courses) &&
                              courses.length > 0 ? (
                              courses.map((course: Course) => (
                                <SelectItem key={course.id} value={course.id}>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs">
                                      {course.category === "entrepreneurship" &&
                                        "💼"}
                                      {course.category === "wellness" && "🌿"}
                                      {course.category === "therapy" && "💆‍♀️"}
                                      {course.category === "business" && "📈"}
                                      {course.category ===
                                        "personal-development" && "🌟"}
                                      {course.category === "health" && "🏥"}
                                      {course.category === "spirituality" &&
                                        "🧘‍♀️"}
                                    </span>
                                    <span className="font-medium">
                                      {course.title}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                      ({course.instructor})
                                    </span>
                                  </div>
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem value="no-courses" disabled>
                                ❌ No hay cursos disponibles
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.courseId && (
                      <p className="text-xs text-red-600">
                        ⚠️ {errors.courseId.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="order"
                      className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                    >
                      <Clock className="w-4 h-4 text-blue-600" />
                      Orden en el Curso
                    </Label>
                    <Input
                      type="number"
                      id="order"
                      {...register("order", { valueAsNumber: true })}
                      className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 bg-white"
                      placeholder="1"
                      min="1"
                    />
                    {errors.order && (
                      <p className="text-xs text-red-600">
                        ⚠️ {errors.order.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="duration"
                      className="text-sm font-semibold text-gray-700 flex items-center gap-2"
                    >
                      <Clock className="w-4 h-4 text-blue-600" />
                      Duración (minutos)
                    </Label>
                    <Input
                      type="number"
                      id="duration"
                      {...register("duration", { valueAsNumber: true })}
                      className="border-blue-200 focus:border-blue-500 focus:ring-blue-500 bg-white"
                      placeholder="15"
                      min="1"
                      step="0.5"
                    />
                    {errors.duration && (
                      <p className="text-xs text-red-600">
                        ⚠️ {errors.duration.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Recursos y Configuración Avanzada */}
              <div className="rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 p-6 border border-green-100">
                <h3 className="mb-6 flex items-center text-lg font-bold text-gray-800">
                  <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white">
                    <span className="text-sm font-bold">3</span>
                  </div>
                  📎 Recursos y Configuración
                </h3>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">
                      📄 URLs de Recursos (separadas por comas)
                    </Label>
                    <textarea
                      {...register("resources", {
                        setValueAs: (value) =>
                          typeof value === "string"
                            ? value
                                .split(",")
                                .map((item: string) => item.trim())
                                .filter((item) => item)
                            : value,
                      })}
                      rows={2}
                      className="w-full rounded-lg border border-green-200 focus:border-green-500 focus:ring-green-500 bg-white px-3 py-2"
                      placeholder="https://ejemplo.com/guia.pdf, https://ejemplo.com/imagen.png"
                    />
                    <p className="text-xs text-gray-500">
                      💡 Ingresa las URLs de PDFs, imágenes o documentos
                      separadas por comas
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">
                      📎 Archivos Adjuntos (separados por comas)
                    </Label>
                    <textarea
                      {...register("attached", {
                        setValueAs: (value) =>
                          typeof value === "string"
                            ? value
                                .split(",")
                                .map((item: string) => item.trim())
                                .filter((item) => item)
                            : value,
                      })}
                      rows={2}
                      className="w-full rounded-lg border border-green-200 focus:border-green-500 focus:ring-green-500 bg-white px-3 py-2"
                      placeholder="https://ejemplo.com/audio.mp3, https://ejemplo.com/extra.zip"
                    />
                    <p className="text-xs text-gray-500">
                      💡 Archivos extra como audios, documentos adicionales,
                      etc.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Star className="w-4 h-4 text-green-600" />
                      Configuración de Acceso
                    </Label>
                    <div className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-green-200">
                      <input
                        type="checkbox"
                        id="is_preview"
                        {...register("is_preview")}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-green-300 rounded"
                      />
                      <Label
                        htmlFor="is_preview"
                        className="text-sm text-gray-700 cursor-pointer"
                      >
                        👁️ Esta lección es un preview gratuito
                      </Label>
                    </div>
                    <p className="text-xs text-gray-500">
                      💡 Las lecciones preview pueden ser vistas sin inscripción
                      al curso
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 border-t bg-gray-50 px-6 py-4 mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                ❌ Cancelar
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 text-white hover:from-indigo-700 hover:to-blue-700 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <svg
                      className="w-4 h-4 mr-2 animate-spin"
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
                    Guardando...
                  </>
                ) : (
                  <>💾 Guardar Cambios</>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalUpdateLesson;
