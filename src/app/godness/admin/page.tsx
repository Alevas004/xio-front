"use client";

import AcademyManager from "@/components/admin/academies/AcademyManager";
import CourseManager from "@/components/admin/course/CourseManager";
import LessonManager from "@/components/admin/lesson/LessonManager";
import ProductManager from "@/components/admin/products/ProductManager";
import ServiceManager from "@/components/admin/servicesXS/ServiceManager";
import React, { useState } from "react";
import {
  FiHome,
  FiShoppingBag,
  FiBookOpen,
  FiHeart,
  FiUsers,
  FiBarChart,
  FiSettings,
  FiMenu,
  FiX,
  FiPlus,
  FiSearch,
  FiCalendar,
  FiTrendingUp,
} from "react-icons/fi";

const GodnessAdminPage = () => {
  const [activeSection, setActiveSection] = useState<string>("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: FiHome,
      description: "Vista general de todos los negocios",
    },
      {
      id: "services",
      label: "Servicios",
      icon: FiHeart,
      description: "Gestión de servicios Xiomara Spa",
    },
    {
      id: "products",
      label: "Productos",
      icon: FiShoppingBag,
      description: "Gestión de productos By Xio",
    },
    {
      id: "events",
      label: "Eventos",
      icon: FiBookOpen,
      description: "Gestión de eventos Xios Academy",
    },
    {
      id: "courses",
      label: "Cursos",
      icon: FiBookOpen,
      description: "Gestión de cursos Xios Academy",
    },
    {
      id: "lessons",
      label: "Lecciones",
      icon: FiBookOpen,
      description: "Gestión de lecciones Xios Academy",
    },
    {
      id: "users",
      label: "Usuarios",
      icon: FiUsers,
      description: "Gestión de usuarios del sistema",
    },
    {
      id: "analytics",
      label: "Analíticas",
      icon: FiBarChart,
      description: "Estadísticas y reportes",
    },
    {
      id: "settings",
      label: "Configuración",
      icon: FiSettings,
      description: "Configuración del sistema",
    },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardContent />;
      case "services":
        return <ServiceManager />;
      case "products":
        return <ProductManager />;
      case "events":
        return <AcademyManager />;
      case "courses":
        return <CourseManager />;
      case "lessons":
        return <LessonManager />;
      case "users":
        return <UsersContent />;
      case "analytics":
        return <AnalyticsContent />;
      case "settings":
        return <SettingsContent />;
      default:
        return <DashboardContent />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:relative lg:flex lg:flex-col ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b bg-gradient-to-r from-purple-600 to-blue-600">
          <h1 className="text-xl font-bold text-white">XIOS Admin</h1>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-white"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 mt-6 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                setIsSidebarOpen(false);
              }}
              className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
                activeSection === item.id
                  ? "bg-blue-50 border-r-4 border-blue-500 text-blue-700"
                  : "text-gray-700"
              }`}
            >
              <item.icon className="w-5 h-5 mr-3" />
              <div>
                <div className="font-medium">{item.label}</div>
                <div className="text-xs text-gray-500">{item.description}</div>
              </div>
            </button>
          ))}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden mr-4"
              >
                <FiMenu className="w-6 h-6" />
              </button>
              <h2 className="text-xl font-semibold text-gray-800">
                {menuItems.find((item) => item.id === activeSection)?.label ||
                  "Dashboard"}
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <FiSearch className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <FiSettings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">{renderContent()}</main>
      </div>
    </div>
  );
};

// Dashboard Content Component
const DashboardContent = () => {
  const stats = [
    {
      title: "Productos Activos",
      value: "142",
      change: "+12%",
      icon: FiShoppingBag,
      color: "bg-blue-500",
    },
    {
      title: "Cursos Disponibles",
      value: "28",
      change: "+5%",
      icon: FiBookOpen,
      color: "bg-green-500",
    },
    {
      title: "Servicios Spa",
      value: "15",
      change: "+2%",
      icon: FiHeart,
      color: "bg-pink-500",
    },
    {
      title: "Usuarios Registrados",
      value: "1,235",
      change: "+18%",
      icon: FiUsers,
      color: "bg-purple-500",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      action: "Nuevo producto agregado",
      details: "Aceite esencial de lavanda",
      time: "Hace 2 horas",
      type: "product",
    },
    {
      id: 2,
      action: "Usuario registrado",
      details: "Ana García se registró",
      time: "Hace 4 horas",
      type: "user",
    },
    {
      id: 3,
      action: "Curso actualizado",
      details: "Meditación Mindfulness",
      time: "Hace 6 horas",
      type: "course",
    },
    {
      id: 4,
      action: "Servicio programado",
      details: "Masaje relajante - Cliente: María",
      time: "Hace 8 horas",
      type: "service",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-green-600">{stat.change}</p>
              </div>
              <div className={`p-3 rounded-full ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Ingresos Mensuales
            </h3>
            <button className="text-blue-600 hover:text-blue-800">
              <FiTrendingUp className="w-5 h-5" />
            </button>
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
            <p className="text-gray-500">Gráfico de ingresos aquí</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Actividad Reciente
            </h3>
            <button className="text-blue-600 hover:text-blue-800">
              <FiCalendar className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.action}
                  </p>
                  <p className="text-sm text-gray-600">{activity.details}</p>
                  <p className="text-xs text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Acciones Rápidas
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
            <FiPlus className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm font-medium text-gray-600">
              Nuevo Producto
            </span>
          </button>
          <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
            <FiPlus className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm font-medium text-gray-600">
              Nuevo Curso
            </span>
          </button>
          <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-pink-500 hover:bg-pink-50 transition-colors">
            <FiPlus className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm font-medium text-gray-600">
              Nuevo Servicio
            </span>
          </button>
          <button className="flex flex-col items-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
            <FiUsers className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm font-medium text-gray-600">
              Ver Usuarios
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

// Placeholder components for other sections

const UsersContent = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h3 className="text-lg font-semibold mb-4">Gestión de Usuarios</h3>
    <p className="text-gray-600">
      Componente de gestión de usuarios en desarrollo...
    </p>
  </div>
);

const AnalyticsContent = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h3 className="text-lg font-semibold mb-4">Analíticas</h3>
    <p className="text-gray-600">Componente de analíticas en desarrollo...</p>
  </div>
);

const SettingsContent = () => (
  <div className="bg-white rounded-lg shadow p-6">
    <h3 className="text-lg font-semibold mb-4">Configuración</h3>
    <p className="text-gray-600">
      Componente de configuración en desarrollo...
    </p>
  </div>
);

export default GodnessAdminPage;
