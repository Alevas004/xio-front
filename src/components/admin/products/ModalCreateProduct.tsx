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
  name: z
    .string()
    .min(2, "El nombre es obligatorio y debe tener al menos 2 caracteres")
    .max(100, "El nombre no puede superar los 100 caracteres"),

  short_description: z
    .string()
    .min(10, "La descripción corta es obligatoria")
    .max(200, "La descripción corta no puede superar los 200 caracteres"),

  long_description: z
    .string()
    .min(20, "La descripción larga es obligatoria")
    .max(2000, "La descripción larga no puede superar los 2000 caracteres"),

  price: z.preprocess(
    (val) => Number(val),
    z
      .number("El precio debe ser un número")
      .positive("El precio debe ser mayor que 0")
  ),

  stock: z
    .number("El stock debe ser un número")
    .int("El stock debe ser un número entero")
    .min(0, "El stock no puede ser negativo").optional(),

  image: z.string().url("La imagen debe ser una URL válida"),

  // Campos como strings para el formulario que se convertirán a arrays
  images: z.array(z.string()).min(0, "Cada imagen debe ser una URL válida").optional(),

  category: z
    .string()
    .min(0, "La categoría es obligatoria y debe tener al menos 2 caracteres")
    .max(100, "La categoría no puede superar los 100 caracteres"),

  tags: z.array(z.string()).min(0, "Al menos una etiqueta es obligatoria"),

  caracteristics: z
    .array(z.string())
    .min(0, "Al menos una característica es obligatoria").optional(),

  includes: z.array(z.string()).min(0, "Al menos una inclusión es obligatoria").optional(),

  isActive: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  hasDiscount: z.boolean().default(false),
  isNew: z.boolean().default(false),
  isSold: z.boolean().default(false),

  discountValue: z
    .number("El valor de descuento debe ser un número")
    .min(0, "El descuento no puede ser negativo")
    .default(0).optional(),
});

export type CreateFormValues = z.infer<typeof createSchema>;

export interface ProductCreate {
  name: string;
  short_description: string;
  long_description: string;
  price: number;
  stock?: number;
  image: string;
  images?: string[];
  category: string;
  tags: string[];
  caracteristics?: string[];
  includes?: string[];
  isActive: boolean;
  isFeatured: boolean;
  hasDiscount: boolean;
  isNew: boolean;
  isSold: boolean;
  discountValue?: number;
}

interface UpdateProps {
  onClose: () => void;
  onSave: (data: ProductCreate) => Promise<void>;
  error: string | null;
  loading: boolean;
 
}

const ModalCreateProduct = ({
  onClose,
  onSave,
  error,
  loading,

}: UpdateProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    resolver: zodResolver(createSchema),
    defaultValues: {
      name: "",
      short_description: "",
      long_description: "",
      price: 0,
      stock: 0,
      image: "",
      images: [],
      category: "",
      tags: [],
      caracteristics: [],
      includes: [],
      isActive: false,
      isFeatured: false,
      hasDiscount: false,
      isNew: false,
      isSold: false,
      discountValue: 0,
    },
  }); 

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b bg-gradient-to-r from-verde-oscuro to-verde-claro p-6">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20">
              <svg
                className="h-5 w-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Crear Producto</h2>

            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30"
          >
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
                <span className="text-sm font-medium">
                  Actualizando producto...
                </span>
              </div>
            )}
          </div>
        )}

        {/* Form Content */}
        <div className="max-h-[calc(90vh-140px)] overflow-y-auto">
          <form onSubmit={handleSubmit(onSave)} className="p-6">
            <div className="grid gap-8">
              {/* Información Básica */}
              <div className="rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-6">
                <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-800">
                  <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-verde-oscuro">
                    <span className="text-xs font-bold text-white">1</span>
                  </div>
                  Información Básica
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-sm font-medium text-gray-700"
                    >
                      Nombre del producto
                    </Label>
                    <Input
                      type="text"
                      id="name"
                      {...register("name")}
                      className="border-gray-300 focus:border-verde-oscuro focus:ring-verde-oscuro"
                    />
                    {errors.name && (
                      <p className="text-xs text-red-600">
                        {errors.name.message}
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
                          <SelectTrigger className="border-gray-300 focus:border-verde-oscuro focus:ring-verde-oscuro">
                            <SelectValue placeholder="Selecciona una categoría" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            <SelectItem value="suplementos">
                              💊 Suplementos
                            </SelectItem>
                            <SelectItem value="aceites">
                              🌿 Aceites Esenciales
                            </SelectItem>
                            <SelectItem value="hierbas">
                              🌱 Hierbas y Plantas Medicinales
                            </SelectItem>
                            <SelectItem value="proteinas">
                              💪 Proteínas y Fitness
                            </SelectItem>
                            <SelectItem value="vitaminas">
                              🧬 Vitaminas y Minerales
                            </SelectItem>
                            <SelectItem value="belleza">
                              ✨ Belleza y Cuidado Personal
                            </SelectItem>
                            <SelectItem value="digestivo">
                              🫁 Salud Digestiva
                            </SelectItem>
                            <SelectItem value="inmunidad">
                              🛡️ Sistema Inmunológico
                            </SelectItem>
                            <SelectItem value="energia">
                              ⚡ Energía y Rendimiento
                            </SelectItem>
                            <SelectItem value="relajacion">
                              🧘 Relajación y Sueño
                            </SelectItem>
                            <SelectItem value="detox">
                              🌊 Detox y Limpieza
                            </SelectItem>
                            <SelectItem value="perdida-peso">
                              ⚖️ Control de Peso
                            </SelectItem>
                            <SelectItem value="kits">
                              📦 Kits y Combos
                            </SelectItem>
                            <SelectItem value="accesorios">
                              🎯 Accesorios de Bienestar
                            </SelectItem>
                            <SelectItem value="alimentacion">
                              🥗 Alimentación Saludable
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
                      htmlFor="short_description"
                      className="text-sm font-medium text-gray-700"
                    >
                      Descripción corta
                    </Label>
                    <Input
                      type="text"
                      id="short_description"
                      {...register("short_description")}
                      className="border-gray-300 focus:border-verde-oscuro focus:ring-verde-oscuro"
                    />
                    {errors.short_description && (
                      <p className="text-xs text-red-600">
                        {errors.short_description.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="long_description"
                      className="text-sm font-medium text-gray-700"
                    >
                      Descripción larga
                    </Label>
                    <Input
                      type="text"
                      id="long_description"
                      {...register("long_description")}
                      className="border-gray-300 focus:border-verde-oscuro focus:ring-verde-oscuro"
                    />
                    {errors.long_description && (
                      <p className="text-xs text-red-600">
                        {errors.long_description.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Precio e Inventario */}
              <div className="rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
                <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-800">
                  <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-600">
                    <span className="text-xs font-bold text-white">2</span>
                  </div>
                  Precio e Inventario
                </h3>
                <div className="grid gap-4 md:grid-cols-3">
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
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                    {errors.price && (
                      <p className="text-xs text-red-600">
                        {errors.price.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="stock"
                      className="text-sm font-medium text-gray-700"
                    >
                      📦 Stock
                    </Label>
                    <Input
                      type="number"
                      id="stock"
                      {...register("stock", { valueAsNumber: true })}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                    {errors.stock && (
                      <p className="text-xs text-red-600">
                        {errors.stock.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="discountValue"
                      className="text-sm font-medium text-gray-700"
                    >
                      🏷️ Descuento
                    </Label>
                    <Input
                      type="number"
                      id="discountValue"
                      {...register("discountValue", { valueAsNumber: true })}
                      className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                    {errors.discountValue && (
                      <p className="text-xs text-red-600">
                        {errors.discountValue.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Imágenes */}
              <div className="rounded-xl bg-gradient-to-br from-purple-50 to-pink-100 p-6">
                <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-800">
                  <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-purple-600">
                    <span className="text-xs font-bold text-white">3</span>
                  </div>
                  Imágenes
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
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
                      className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
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
                      🖼️ Imágenes adicionales (separadas por comas)
                    </Label>
                    <Input
                      type="text"
                      id="images"
                      {...register("images", {
                        setValueAs: (value) =>
                          Array.isArray(value)
                            ? value
                            : typeof value === "string"
                            ? value
                                .split(",")
                                .map((item: string) => item.trim())
                                .filter((item) => item)
                            : [],
                      })}
                      className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                    />
                    {errors.images && (
                      <p className="text-xs text-red-600">
                        {errors.images.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Detalles del Producto */}
              <div className="rounded-xl bg-gradient-to-br from-green-50 to-emerald-100 p-6">
                <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-800">
                  <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-green-600">
                    <span className="text-xs font-bold text-white">4</span>
                  </div>
                  Detalles del Producto
                </h3>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="tags"
                      className="text-sm font-medium text-gray-700"
                    >
                      🏷️ Tags (separados por comas)
                    </Label>
                    <Input
                      type="text"
                      id="tags"
                      {...register("tags", {
                        setValueAs: (value) =>
                          Array.isArray(value)
                            ? value
                            : typeof value === "string"
                            ? value
                                .split(",")
                                .map((item: string) => item.trim())
                                .filter((item) => item)
                            : [],
                      })}
                      className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                    />
                    {errors.tags && (
                      <p className="text-xs text-red-600">
                        {errors.tags.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="caracteristics"
                      className="text-sm font-medium text-gray-700"
                    >
                      ⭐ Características (separadas por comas)
                    </Label>
                    <Input
                      type="text"
                      id="caracteristics"
                      {...register("caracteristics", {
                        setValueAs: (value) =>
                          Array.isArray(value)
                            ? value
                            : typeof value === "string"
                            ? value
                                .split(",")
                                .map((item: string) => item.trim())
                                .filter((item) => item)
                            : [],
                      })}
                      className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                    />
                    {errors.caracteristics && (
                      <p className="text-xs text-red-600">
                        {errors.caracteristics.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="includes"
                      className="text-sm font-medium text-gray-700"
                    >
                      📋 Incluye (separado por comas)
                    </Label>
                    <Input
                      type="text"
                      id="includes"
                      {...register("includes", {
                        setValueAs: (value) =>
                          Array.isArray(value)
                            ? value
                            : typeof value === "string"
                            ? value
                                .split(",")
                                .map((item: string) => item.trim())
                                .filter((item) => item)
                            : [],
                      })}
                      className="border-gray-300 focus:border-green-500 focus:ring-green-500"
                    />
                    {errors.includes && (
                      <p className="text-xs text-red-600">
                        {errors.includes.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Estados del Producto */}
              <div className="rounded-xl bg-gradient-to-br from-amber-50 to-orange-100 p-6">
                <h3 className="mb-4 flex items-center text-lg font-semibold text-gray-800">
                  <div className="mr-3 flex h-6 w-6 items-center justify-center rounded-full bg-amber-600">
                    <span className="text-xs font-bold text-white">5</span>
                  </div>
                  Estados del Producto
                </h3>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="flex items-center space-x-3 rounded-lg bg-white p-3 shadow-sm">
                    <input
                      type="checkbox"
                      id="isActive"
                      {...register("isActive")}
                      className="h-4 w-4 rounded border-gray-300 text-verde-oscuro focus:ring-verde-oscuro"
                    />
                    <Label
                      htmlFor="isActive"
                      className="text-sm font-medium text-gray-700"
                    >
                      ✅ Activo
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 rounded-lg bg-white p-3 shadow-sm">
                    <input
                      type="checkbox"
                      id="isFeatured"
                      {...register("isFeatured")}
                      className="h-4 w-4 rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                    />
                    <Label
                      htmlFor="isFeatured"
                      className="text-sm font-medium text-gray-700"
                    >
                      ⭐ Destacado
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 rounded-lg bg-white p-3 shadow-sm">
                    <input
                      type="checkbox"
                      id="hasDiscount"
                      {...register("hasDiscount")}
                      className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                    <Label
                      htmlFor="hasDiscount"
                      className="text-sm font-medium text-gray-700"
                    >
                      🏷️ Tiene descuento
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 rounded-lg bg-white p-3 shadow-sm">
                    <input
                      type="checkbox"
                      id="isNew"
                      {...register("isNew")}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <Label
                      htmlFor="isNew"
                      className="text-sm font-medium text-gray-700"
                    >
                      🆕 Es nuevo
                    </Label>
                  </div>

                  <div className="flex items-center space-x-3 rounded-lg bg-white p-3 shadow-sm">
                    <input
                      type="checkbox"
                      id="isSold"
                      {...register("isSold")}
                      className="h-4 w-4 rounded border-gray-300 text-gray-600 focus:ring-gray-500"
                    />
                    <Label
                      htmlFor="isSold"
                      className="text-sm font-medium text-gray-700"
                    >
                      ❌ Vendido
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer con botones */}
            <div className="mt-8 flex justify-end space-x-4 border-t bg-gray-50 px-6 py-4 -mx-6 -mb-6">
              <Button
                type="button"
                onClick={onClose}
                variant="outline"
                className="px-6 py-2 text-gray-700 hover:bg-gray-100"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="px-8 py-2 bg-gradient-to-r from-verde-oscuro to-verde-claro text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
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
                    <span>Creando producto...</span>
                  </div>
                ) : (
                  "💾 Crear Producto"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalCreateProduct;
