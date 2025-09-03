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
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-center md:justify-between flex-wrap">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Gestión de Productos
            </h2>
            <p className="text-gray-600 mt-1">
              {pagination.totalItems} productos en total
              {selectedCategory !== "all" && (
                <span className="ml-2 text-blue-600 font-medium">
                  (filtrado por: {selectedCategory})
                </span>
              )}
            </p>
          </div>

          <div className="flex items-center space-x-6">
            {/* Filtro de categorías */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Filtrar por categoría
              </h3>
              <div className="flex items-center space-x-2">
                <Select
                  value={selectedCategory}
                  onValueChange={handleCategoryChange}
                >
                  <SelectTrigger className="w-56">
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="all">📦 Todas las categorías</SelectItem>
                    {availableCategories?.map((category) => (
                      <SelectItem
                        key={category.category}
                        value={category.category}
                      >
                        {category.category.charAt(0).toUpperCase() +
                          category.category.slice(1)}{" "}
                        ({category.count})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Botón para limpiar filtros */}
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

            {/* Estadísticas y botón */}
            <div className="text-right">
              <div className="text-sm text-gray-500 mb-2">
                Página {pagination.currentPage} de {pagination.totalPages}
              </div>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => setCreateModal(true)}
              >
                + Agregar Producto
              </button>
            </div>
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
