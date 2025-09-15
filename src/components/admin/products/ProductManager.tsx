import { useGet } from "@/hooks/useGet";
import { useUpdate } from "@/hooks/useUpdate";
import React, { useState, useMemo, useEffect } from "react";
import { Product } from "../../byxio/ProductCard";
import { useDelete } from "@/hooks/useDelete";
import GetProducts from "./GetProducts";
import ModalUpdateNew, { ProductUpdate } from "./ModalUpdateNew";
import { PaginationData } from "@/app/almarabyxio/products/page";
import AdminPagination from "../common/AdminPagination";
import { usePost } from "@/hooks/usePost";
import ModalCreateProduct, { ProductCreate } from "./ModalCreateProduct";
import { CategoryWithCount } from "@/components/byxio/FilterCategories";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ModalViewProduct from "./ModalViewProduct";

interface GetData {
  products: Product[];
  pagination: PaginationData;
  availableCategories: CategoryWithCount[];
}

const ProductManager = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductUpdate | null>(
    null
  );
  const [isOpen, setIsOpen] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9); // 3x3 grid
  const [selectedCategory, setSelectedCategory] = useState<string>("all"); // 🆕 ESTADO PARA CATEGORÍA
  const [viewProduct, setViewProduct] = useState<Product | null>(null);

  // Memoizar queryParams para evitar loops infinitos - INCLUYE CATEGORÍA
  const queryParams = useMemo(() => {
    const params: Record<string, string | number> = {
      page: currentPage,
      limit: itemsPerPage,
    };

    // Solo agregar category si no es "all"
    if (selectedCategory && selectedCategory !== "all") {
      params.category = selectedCategory;
    }

    return params;
  }, [currentPage, itemsPerPage, selectedCategory]); // 🆕 DEPENDENCIA AGREGADA

  //* CRUD PRODUCTS
  const { data, error, loading, refetch } = useGet<GetData>("/byxio/products", {
    withAuth: false,
    queryParams,
  });

  const {
    updateItem,
    error: errorUpdate,
    loading: loadingUpdate,
  } = useUpdate<ProductUpdate, Product>("byxio/products", {
    withAuth: true,
  });

  const { deleteItem, data: deleteData } = useDelete("byxio/products", {
    withAuth: true,
  });

  const {
    create,
    error: errorPost,
    loading: loadingPost,
  } = usePost<ProductCreate>("/byxio/products/create", {
    withAuth: true,
  });

  const products: Product[] = data?.products || [];
  const pagination = data?.pagination || {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    hasNextPage: false,
    hasPrevPage: false,
  };
  const availableCategories: CategoryWithCount[] =
    data?.availableCategories || [];

  //* PAGINATION
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  //* FILTROS DE CATEGORÍAS
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setCurrentPage(1); // Resetear a página 1 cuando cambie el filtro
  };

  const handleClearFilters = () => {
    setSelectedCategory("all");
    setCurrentPage(1);
  };

  const handleViewProduct = (product: Product) => {
    setViewProduct(product);
  };

  //* UPDATE PRODUCT

  const handleInfoUpdate = (product: ProductUpdate) => {
    setSelectedProduct(product);
    setIsOpen(true);
  };

  const onEditProduct = async (body: ProductUpdate) => {
    if (!selectedProduct) return;

    console.log(
      `Edit product with id: ${selectedProduct.id}`,
      "info product for edit:",
      body
    );
    const updateData = {
      ...body,
      id: selectedProduct.id,
    };

    await updateItem(selectedProduct.id, updateData);
    await refetch();
    setIsOpen(false);
  };

  //* CREATE PRODUCT
  const onCreateProduct = async (body: ProductCreate) => {
    await create(body);
    await refetch();
    setCreateModal(false);
  };

  //* DELETE PRODUCT

  // Refetch automático cuando se elimina un producto exitosamente
  useEffect(() => {
    if (deleteData) {
      console.log("Producto eliminado exitosamente, refrescando lista...");
      refetch();
    }
  }, [deleteData, refetch]);

  const onDelete = async (id: string) => {
    try {
      await deleteItem(id);
      console.log("Iniciando eliminación del producto con id:", id);
      // El refetch se maneja automáticamente en useEffect cuando deleteData cambia
    } catch (error) {
      // Ignoramos el error ya que sabemos que el producto se elimina correctamente
      // pero el hook lanza error por el código de estado
      console.log(
        "Error esperado del hook (producto eliminado exitosamente):",
        error
      );
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando productos...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="text-center py-12">
        <div className="text-red-600 font-medium">Error: {error}</div>
      </div>
    );

  return (
    <div className="space-y-6">
      {selectedProduct && (
        <ModalUpdateNew
          product={selectedProduct}
          onClose={() => setIsOpen(false)}
          onSave={onEditProduct}
          isOpen={isOpen}
          error={errorUpdate}
          loading={loadingUpdate}
        />
      )}

      {createModal && (
        <ModalCreateProduct
          onClose={() => setCreateModal(false)}
          onSave={onCreateProduct}
          error={errorPost}
          loading={loadingPost}
        />
      )}

      {viewProduct && (
        <ModalViewProduct
          product={viewProduct}
          onClose={() => setViewProduct(null)}
        />
      )}

      {/* Header con estadísticas */}
      <div className="bg-gradient-to-r from-purple-600 via-purple-400 to-purple-500 shadow-2xl">
        <div className="px-4 sm:px-6 py-6 sm:py-8 max-w-full w-full">
          <div className="flex flex-col gap-4 sm:gap-6">
            {/* Título y descripción */}
            <div className="space-y-2 sm:space-y-3 flex flex-col justify-center">
              <div className="flex items-center justify-center space-x-3">
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-sm">
                  <svg
                    className="h-5 w-5 sm:h-6 sm:w-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div className="flex items-center justify-center">
                  <h1 className="text-xl sm:text-3xl font-bold text-white">
                    Gestión de Productos
                  </h1>
                </div>
              </div>
              <div>
                <p className="text-sm sm:text-lg text-white font-medium">
                  Administra los productos de Almara
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-white">
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-green-400 rounded-full"></div>
                  <span>Sistema activo</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-2 w-2 bg-blue-400 rounded-full"></div>
                  <span>
                    {pagination ? pagination.totalItems : 0} productos
                  </span>
                </div>
              </div>
            </div>

            {/* Botón de acción - Centrado en móvil */}
            <div className="flex justify-center items-center">
              <button
                onClick={() => setCreateModal(true)}
                className="group relative px-4 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-white via-white to-gray-50 text-purple-600 rounded-xl sm:rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:from-gray-50 hover:to-white w-full sm:w-auto"
              >
                <div className="flex items-center justify-center space-x-3">
                  <div className="flex items-center justify-center h-6 w-6 sm:h-8 sm:w-8 rounded-lg bg-purple-100 group-hover:bg-purple-200 transition-colors duration-300">
                    <svg
                      className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600"
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
                  <span className="text-sm">Crear Nuevo Producto</span>
                </div>
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-600/0 via-purple-600/0 to-purple-600/0 group-hover:from-purple-600/5 group-hover:via-purple-600/10 group-hover:to-purple-600/5 transition-all duration-300"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Barra de navegación/filtros - Responsive */}
        <div className="px-4 sm:px-6 pb-4 sm:pb-6">
          <div className="flex flex-col items-center justify-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-white/20">
            {/* Filtros de Estado - Móvil: vertical, Desktop: horizontal */}

            {/* Filtros de Categoría - Segunda fila en móvil */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <span className="text-white/80 font-medium text-sm">
                Categoría:
              </span>
              <div className="flex-1 flex items-center space-x-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/30 transition-all"
                >
                  <option value="all" className="bg-purple-600 text-white py-3">
                    Todas las categorías
                  </option>
                  {Array.isArray(availableCategories) &&
                    availableCategories.map((category) => (
                      <option
                        key={category.category}
                        value={`${category.category}`}
                        className="bg-purple-600 text-white py-3"
                      >
                        {category.category.charAt(0).toUpperCase() +
                          category.category.slice(1)}{" "}
                        ({category.count})
                      </option>
                    ))}
                </select>
                {selectedCategory !== "all" && (
                  <button
                    onClick={handleClearFilters}
                    className="px-3 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    title="Limpiar filtros"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
            <p className="text-white">
              {pagination.totalItems} productos en total
              {selectedCategory !== "all" && (
                <span className="ml-2 text-white font-bold">
                  (filtrado por: {selectedCategory})
                </span>
              )}
            </p>
            {/* Buscador - Tercera fila en móvil */}
          </div>
        </div>
      </div>

      {/* Grid de productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products && products.length > 0 ? (
          products.map((product) => (
            <GetProducts
              key={product.id}
              product={product}
              onEdit={handleInfoUpdate}
              onDelete={onDelete}
              onView={() => handleViewProduct(product)}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">No hay productos disponibles</p>
          </div>
        )}
      </div>

      {/* Paginación */}
      <AdminPagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        totalItems={pagination.totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        loading={loading}
      />
    </div>
  );
};

export default ProductManager;
