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
import React from "react";
import { useForm, Controller } from "react-hook-form";
import z from "zod";

const createSchema = z.object({
  title: z
    .string()
    .min(2, "El título es obligatorio y debe tener al menos 2 caracteres")
    .max(100, "El título no puede superar los 100 caracteres"),

  sub_title: z
    .string()
    .min(2, "El subtítulo es obligatorio")
    .max(150, "El subtítulo no puede superar los 150 caracteres"),

  description_short: z
    .string()
    .min(10, "La descripción corta debe tener al menos 10 caracteres")
    .max(200, "La descripción corta no puede superar los 200 caracteres"),

  detailed_description: z
    .string()
    .min(20, "La descripción detallada debe tener al menos 20 caracteres")
    .max(2000, "La descripción detallada no puede superar los 2000 caracteres"),

  price: z.preprocess(
    (val) => Number(val),
    z
      .number("El precio debe ser un número")
      .positive("El precio debe ser mayor que 0")
  ),

  duration: z.preprocess(
    (val) => Number(val),
    z
      .number("La duración debe ser un número")
      .positive("La duración debe ser mayor que 0")
  ),

  image: z.string().url("La imagen debe ser una URL válida"),

  images: z
    .array(z.string().url("Cada imagen debe ser una URL válida"))
    .nullable()
    .optional(),

  category: z
    .string()
    .min(2, "La categoría es obligatoria")
    .max(100, "La categoría no puede superar los 100 caracteres"),

  benefits: z.array(z.string()).nullable().optional(),

  for_who: z
    .string()
    .min(5, "Debe indicar a quién va dirigido el servicio")
    .max(200, "No puede superar los 200 caracteres"),

  phrase_hook: z
    .string()
    .min(5, "La frase gancho debe tener al menos 5 caracteres")
    .max(300, "La frase gancho no puede superar los 300 caracteres"),

  is_active: z.boolean().default(true),
});

export type CreateFormValues = z.infer<typeof createSchema>;

export interface ServiceCreate {
  title: string;
  sub_title: string;
  description_short: string;
  detailed_description: string;
  image: string;
  images?: string[] | null;
  benefits?: string[] | null;
  for_who: string;
  price: number;
  duration: number;
  phrase_hook: string;
  category: string;
  is_active: boolean;
}

interface CreateProps {
  onClose: () => void;
  onSave: (data: ServiceCreate) => Promise<void>;
  error: string | null;
  loading: boolean;
}

const ModalCreateServiceNew = ({
  onClose,
  onSave,
  error,
  loading,
}: CreateProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(createSchema),
    defaultValues: {
      title: "",
      sub_title: "",
      description_short: "",
      detailed_description: "",
      price: 0,
      duration: 60,
      image: "",
      images: [],
      category: "",
      benefits: [],
      for_who: "",
      phrase_hook: "",
      is_active: true,
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b bg-gradient-to-r from-purple-600 to-indigo-600 p-6">
          <div className="flex items-center space-x-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
              <svg
                className="h-6 w-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                ✨ Crear Nuevo Servicio
              </h2>
              <p className="text-sm text-white/80">
                Agrega un servicio de terapia profesional
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white transition-all duration-200 hover:bg-white/30 hover:scale-105"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Status Messages */}
        {(error || loading) && (
          <div className="border-b bg-gray-50 px-6 py-3">
            {error && (
              <div className="flex items-center space-x-2 text-red-600">
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
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}
            {loading && (
              <div className="flex items-center space-x-2 text-blue-600">
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
                <span className="text-sm font-medium">Creando servicio...</span>
              </div>
            )}
          </div>
        )}

        {/* Form Content */}
        <div className="max-h-[calc(90vh-160px)] overflow-y-auto">
          <form
            onSubmit={handleSubmit((data) => {
              const serviceData: ServiceCreate = {
                ...data,
                images: data.images || null,
                benefits: data.benefits || null,
              };
              return onSave(serviceData);
            })}
            className="p-6"
          >
            <div className="grid gap-8">
              {/* Información Básica */}
              <div className="rounded-xl bg-gradient-to-br from-purple-50 to-indigo-100 p-6">
                <h3 className="mb-6 flex items-center text-lg font-semibold text-gray-800">
                  <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-purple-600">
                    <span className="text-sm font-bold text-white">1</span>
                  </div>
                  Información Básica del Servicio
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label
                      htmlFor="title"
                      className="text-sm font-medium text-gray-700"
                    >
                      Título del servicio
                    </Label>
                    <Input
                      type="text"
                      id="title"
                      {...register("title")}
                      className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                      placeholder="Masaje Prenatal Relajante"
                    />
                    {errors.title && (
                      <p className="text-xs text-red-600">
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="category"
                      className="text-sm font-medium text-gray-700"
                    >
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
                          <SelectTrigger className="border-gray-300 focus:border-purple-500 focus:ring-purple-500">
                            <SelectValue placeholder="Selecciona un tipo de servicio" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            <SelectItem value="masaje-prenatal">
                              🤰 Masaje Prenatal
                            </SelectItem>
                            <SelectItem value="masaje-terapeutico">
                              🧘‍♀️ Masaje Terapéutico
                            </SelectItem>
                            <SelectItem value="drenaje-linfatico">
                              💧 Drenaje Linfático
                            </SelectItem>
                            <SelectItem value="reflexologia">
                              👣 Reflexología
                            </SelectItem>
                            <SelectItem value="aromaterapia">
                              🌸 Aromaterapia
                            </SelectItem>
                            <SelectItem value="relajacion">
                              🕯️ Relajación
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.category && (
                      <p className="text-xs text-red-600">
                        {errors.category.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="sub_title"
                      className="text-sm font-medium text-gray-700"
                    >
                      Subtítulo del servicio
                    </Label>
                    <Input
                      type="text"
                      id="sub_title"
                      {...register("sub_title")}
                      className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                      placeholder="Una experiencia única de relajación"
                    />
                    {errors.sub_title && (
                      <p className="text-xs text-red-600">
                        {errors.sub_title.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="for_who"
                      className="text-sm font-medium text-gray-700"
                    >
                      👥 Para quién
                    </Label>
                    <Input
                      type="text"
                      id="for_who"
                      {...register("for_who")}
                      className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                      placeholder="Embarazadas, adultos, deportistas..."
                    />
                    {errors.for_who && (
                      <p className="text-xs text-red-600">
                        {errors.for_who.message}
                      </p>
                    )}
                  </div>

                  <div className="col-span-2 space-y-2">
                    <Label
                      htmlFor="description_short"
                      className="text-sm font-medium text-gray-700"
                    >
                      Descripción corta
                    </Label>
                    <Input
                      type="text"
                      id="description_short"
                      {...register("description_short")}
                      className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                      placeholder="Descripción breve que aparecerá en las tarjetas"
                    />
                    {errors.description_short && (
                      <p className="text-xs text-red-600">
                        {errors.description_short.message}
                      </p>
                    )}
                  </div>

                  <div className="col-span-2 space-y-2">
                    <Label
                      htmlFor="detailed_description"
                      className="text-sm font-medium text-gray-700"
                    >
                      Descripción detallada
                    </Label>
                    <textarea
                      id="detailed_description"
                      rows={4}
                      {...register("detailed_description")}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                      placeholder="Describe en detalle los beneficios, procedimientos y qué puede esperar el cliente..."
                    />
                    {errors.detailed_description && (
                      <p className="text-xs text-red-600">
                        {errors.detailed_description.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Precio y Duración */}
              <div className="rounded-xl bg-gradient-to-br from-green-50 to-emerald-100 p-6">
                <h3 className="mb-6 flex items-center text-lg font-semibold text-gray-800">
                  <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-green-600">
                    <span className="text-sm font-bold text-white">2</span>
                  </div>
                  Precio y Detalles
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label
                      htmlFor="price"
                      className="text-sm font-medium text-gray-700"
                    >
                      💰 Precio
                    </Label>
                    <Input
                      type="number"
                      step="0.01"
                      id="price"
                      {...register("price", { valueAsNumber: true })}
                      className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                      placeholder="89.99"
                    />
                    {errors.price && (
                      <p className="text-xs text-red-600">
                        {errors.price.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="duration"
                      className="text-sm font-medium text-gray-700"
                    >
                      ⏰ Duración (minutos)
                    </Label>
                    <Input
                      type="number"
                      id="duration"
                      {...register("duration", { valueAsNumber: true })}
                      className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                      placeholder="60"
                    />
                    {errors.duration && (
                      <p className="text-xs text-red-600">
                        {errors.duration.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Beneficios y Marketing */}
              <div className="rounded-xl bg-gradient-to-br from-orange-50 to-yellow-100 p-6">
                <h3 className="mb-6 flex items-center text-lg font-semibold text-gray-800">
                  <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-orange-600">
                    <span className="text-sm font-bold text-white">3</span>
                  </div>
                  Beneficios y Marketing
                </h3>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="benefits"
                      className="text-sm font-medium text-gray-700"
                    >
                      ✨ Beneficios (separados por comas)
                    </Label>
                    <Input
                      type="text"
                      id="benefits"
                      {...register("benefits", {
                        setValueAs: (value) =>
                          typeof value === "string"
                            ? value
                                .split(",")
                                .map((item: string) => item.trim())
                                .filter((item) => item)
                            : value || [],
                      })}
                      className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      placeholder="Reduce el estrés, alivia tensiones musculares, mejora la circulación..."
                    />
                    {errors.benefits && (
                      <p className="text-xs text-red-600">
                        {errors.benefits.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="phrase_hook"
                      className="text-sm font-medium text-gray-700"
                    >
                      💭 Frase gancho
                    </Label>
                    <Input
                      type="text"
                      id="phrase_hook"
                      {...register("phrase_hook")}
                      className="border-gray-300 focus:border-orange-500 focus:ring-orange-500"
                      placeholder="Una experiencia única de bienestar y conexión..."
                    />
                    {errors.phrase_hook && (
                      <p className="text-xs text-red-600">
                        {errors.phrase_hook.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Imágenes */}
              <div className="rounded-xl bg-gradient-to-br from-blue-50 to-cyan-100 p-6">
                <h3 className="mb-6 flex items-center text-lg font-semibold text-gray-800">
                  <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-blue-600">
                    <span className="text-sm font-bold text-white">4</span>
                  </div>
                  Imágenes del Servicio
                </h3>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="image"
                      className="text-sm font-medium text-gray-700"
                    >
                      🖼️ Imagen principal (URL)
                    </Label>
                    <Input
                      type="text"
                      id="image"
                      {...register("image")}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="https://ejemplo.com/imagen-principal.jpg"
                    />
                    {errors.image && (
                      <p className="text-xs text-red-600">
                        {errors.image.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="images"
                      className="text-sm font-medium text-gray-700"
                    >
                      📷 Imágenes adicionales (URLs separadas por comas)
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
                            : value || [],
                      })}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      placeholder="https://ejemplo.com/img1.jpg, https://ejemplo.com/img2.jpg"
                    />
                    {errors.images && (
                      <p className="text-xs text-red-600">
                        {errors.images.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Estado del Servicio */}
              <div className="rounded-xl bg-gradient-to-br from-indigo-50 to-purple-100 p-6">
                <h3 className="mb-6 flex items-center text-lg font-semibold text-gray-800">
                  <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600">
                    <span className="text-sm font-bold text-white">5</span>
                  </div>
                  Estado del Servicio
                </h3>
                <div className="grid gap-4">
                  <div className="flex items-center space-x-3 rounded-lg bg-white p-4 shadow-sm border-2 border-indigo-100">
                    <input
                      type="checkbox"
                      id="is_active"
                      {...register("is_active")}
                      className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <Label
                      htmlFor="is_active"
                      className="text-sm font-medium text-gray-700 cursor-pointer"
                    >
                      ✅ Servicio activo (disponible para reservas)
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer con botones */}
            <div className="mt-8 flex justify-end space-x-4 border-t bg-gray-50 px-6 py-4 -mx-6 -mb-6 rounded-b-2xl">
              <Button
                type="button"
                onClick={onClose}
                variant="outline"
                className="px-8 py-3 text-gray-700 hover:bg-gray-100 border-gray-300"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="px-10 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 font-semibold"
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
                    <span>Creando...</span>
                  </div>
                ) : (
                  "✨ Crear Servicio"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalCreateServiceNew;
