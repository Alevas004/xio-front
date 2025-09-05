"use client";

import { useDelete } from "@/hooks/useDelete";
import { useGet } from "@/hooks/useGet";
import { usePost } from "@/hooks/usePost";
import { useUpdate } from "@/hooks/useUpdate";
import React, { useEffect, useState } from "react";
import GetServices from "./GetAcademies";
import ModalUpdateAcademy, {
  AcademyUpdate,
  Course,
} from "./ModalUpdateAcademy";
import ModalCreateAcademy, { AcademyCreate } from "./ModalCreateAcademy";
import ModalViewAcademy from "./ModalViewAcademy";

export interface Academy {
  id: string;
  title: string;
  subtitle: string;
  type: "workshop" | "seminar" | "retreat" | "training"; // puedes ajustar según tus enums
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

interface GetData {
  academy: Academy[];
}

const AcademyManager = () => {
  const [selectedAcademy, setSelectedAcademy] = useState<AcademyUpdate | null>(
    null
  );
  const [editModal, setEditModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all"); // "all", "active", "inactive"
  const [viewAcademy, setViewAcademy] = useState<Academy | null>(null);

  // Debounce para el searchTerm
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1000); // Espera 500ms después de que el usuario deje de escribir

    return () => clearTimeout(timer);
  }, [searchTerm]);

  //* CONSTRUCCIÓN DE QUERY PARAMETERS
  const buildQueryParams = () => {
    const params = new URLSearchParams();

    if (selectedCategory !== "all") {
      params.append("type", selectedCategory);
    }

    if (debouncedSearchTerm) {
      params.append("search", debouncedSearchTerm);
    }

    if (statusFilter !== "all") {
      params.append("is_active", statusFilter === "active" ? "true" : "false");
    }

    return params.toString();
  };

  //* CRUD SERVICES CON FILTROS
  const queryString = buildQueryParams();

  const { data, error, loading, refetch } = useGet<GetData>(
    `/xios-academy/event${queryString ? `?${queryString}` : ""}`,
    {
      withAuth: false,
    }
  );

  const academies = data || [];
  console.log("academies:", academies);

  const {
    updateItem,
    error: errorUpdate,
    loading: loadingUpdate,
  } = useUpdate<AcademyUpdate, Academy>("xios-academy/events", {
    withAuth: true,
  });

  const { deleteItem, data: deleteData } = useDelete("xios-academy/events", {
    withAuth: true,
  });

  const {
    create,
    error: errorPost,
    loading: loadingPost,
  } = usePost<AcademyCreate>("/xios-academy/events/create", {
    withAuth: true,
  });

  //   //* FILTROS DE CATEGORÍAS
  const handleCategoryChange = (type: string) => {
    setSelectedCategory(type);
  };

  const handleStatusFilterChange = (status: string) => {
    setStatusFilter(status);
  };

  const handleSearchChange = (term: string) => {
    setSearchTerm(term);
  };

  const handleClearFilters = () => {
    setSelectedCategory("all");
    setStatusFilter("all");
    setSearchTerm("");
    setDebouncedSearchTerm("");
  };

  // Refetch cuando cambien los filtros
  useEffect(() => {
    refetch();
  }, [selectedCategory, statusFilter, debouncedSearchTerm, refetch]);

  const handleViewAcademy = (academy: Academy) => {
    setViewAcademy(academy);
  };

  //   //* UPDATE SERVICE

  const handleInfoUpdate = (academy: AcademyUpdate) => {
    setSelectedAcademy(academy);
    setEditModal(true);
  };

  const onEditAcademy = async (body: AcademyUpdate) => {
    if (!selectedAcademy) return;

    console.log(
      `Edit academy with id: ${selectedAcademy.id}`,
      "info academy for edit:",
      body
    );
    const updateData = {
      ...body,
      id: selectedAcademy.id,
    };

    await updateItem(selectedAcademy.id, updateData);
    await refetch();
    setEditModal(false);
  };

  //   //* CREATE SERVICE
  const onCreateAcademy = async (body: AcademyCreate) => {
    await create(body);
    await refetch();
    setCreateModal(false);
  };

  //   //* DELETE SERVICE

  // Refetch automático cuando se elimina un servicio exitosamente
  useEffect(() => {
    if (deleteData) {
      console.log("Academia eliminada exitosamente, refrescando lista...");
      refetch();
    }
  }, [deleteData, refetch]);

  const onDelete = async (id: string) => {
    try {
      await deleteItem(id);
      console.log("Iniciando eliminación de la academia con id:", id);
      // El refetch se maneja automáticamente en useEffect cuando deleteData cambia
    } catch (error) {
      // Ignoramos el error ya que sabemos que la academia se elimina correctamente
      // pero el hook lanza error por el código de estado
      console.log(
        "Error esperado del hook (academia eliminada exitosamente):",
        error
      );
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando academia...</p>
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Header Premium */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 shadow-2xl">
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
                    Gestión de Eventos
                  </h1>
                </div>
              </div>
              <div>
                <p className="text-sm sm:text-lg text-white font-medium">
                  Administra los eventos de Xio&apos;s academy
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
                    {Array.isArray(academies) ? academies.length : 0} eventos
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
                  <span className="text-sm">Crear Nuevo Evento</span>
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
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <span className="text-white/80 font-medium text-sm">Estado:</span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleStatusFilterChange("all")}
                  className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                    statusFilter === "all"
                      ? "bg-white/20 text-white"
                      : "bg-white/10 text-white/70 hover:bg-white/20"
                  }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => handleStatusFilterChange("active")}
                  className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                    statusFilter === "active"
                      ? "bg-white/20 text-white"
                      : "bg-white/10 text-white/70 hover:bg-white/20"
                  }`}
                >
                  Activos
                </button>
                <button
                  onClick={() => handleStatusFilterChange("inactive")}
                  className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
                    statusFilter === "inactive"
                      ? "bg-white/20 text-white"
                      : "bg-white/10 text-white/70 hover:bg-white/20"
                  }`}
                >
                  Inactivos
                </button>
              </div>
            </div>

            {/* Filtros de Categoría - Segunda fila en móvil */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <span className="text-white/80 font-medium text-sm">
                Categoría:
              </span>
              <div className="flex-1 sm:flex-none">
                <select
                  value={selectedCategory}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/30 transition-all"
                >
                  <option value="all" className="bg-purple-600 text-white py-3">
                    Todas las categorías
                  </option>
                  <option
                    value="workshop"
                    className="bg-purple-600 text-white py-3"
                  >
                    🛠️ Talleres
                  </option>
                  <option
                    value="seminar"
                    className="bg-purple-600 text-white py-3"
                  >
                    📚 Seminarios
                  </option>
                  <option
                    value="training"
                    className="bg-purple-600 text-white py-3"
                  >
                    💼 Capacitaciones
                  </option>
                  <option
                    value="retreat"
                    className="bg-purple-600 text-white py-3"
                  >
                    🏞️ Retiros
                  </option>
                </select>
              </div>
            </div>

            {/* Buscador - Tercera fila en móvil */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <span className="text-white/80 font-medium text-sm">Buscar:</span>
              <div className="relative flex-1 sm:flex-none">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Buscar servicios..."
                  className="w-full sm:w-64 pl-10 pr-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/30 transition-all"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-3 w-3 sm:h-4 sm:w-4 text-white/60"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>

              {/* Botón Limpiar */}
              <button
                onClick={handleClearFilters}
                className="px-3 py-2 bg-white/10 text-white/70 rounded-lg text-xs sm:text-sm font-medium hover:bg-white/20 transition-colors w-full sm:w-auto"
              >
                Limpiar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="px-6 py-8">
        <div className="space-y-6">
          {selectedAcademy && (
            <ModalUpdateAcademy
              academy={selectedAcademy}
              onClose={() => setEditModal(false)}
              onSave={onEditAcademy}
              isOpen={editModal}
              error={errorUpdate}
              loading={loadingUpdate}
            />
          )}

          {createModal && (
            <ModalCreateAcademy
              onClose={() => setCreateModal(false)}
              onSave={onCreateAcademy}
              error={errorPost}
              loading={loadingPost}
            />
          )}

          {viewAcademy && (
            <ModalViewAcademy
              academy={viewAcademy}
              onClose={() => setViewAcademy(null)}
            />
          )}

          {/* Grid de academias */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(academies) && academies.length > 0 ? (
              academies.map((academy: Academy) => (
                <GetServices
                  key={academy.id}
                  academy={academy}
                  onEdit={handleInfoUpdate}
                  onDelete={onDelete}
                  onView={handleViewAcademy}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No hay servicios disponibles</p>
              </div>
            )}
          </div>

          {/* Paginación */}
        </div>
      </div>
    </div>
  );
};

export default AcademyManager;
