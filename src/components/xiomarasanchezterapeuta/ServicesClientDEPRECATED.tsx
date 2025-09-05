// "use client";
// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { Sparkles, Filter, Search, Star, Heart } from "lucide-react";
// import ServiceCard from "./ServiceCard";

// const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

// interface User {
//   id: string;
//   first_name: string;
//   last_name: string;
//   email: string;
//   phone: string;
//   vat: string;
//   gender: "male" | "female" | "other";
//   profile_picture: string;
//   country: string;
//   city: string;
//   address: string;
//   date_of_birth: string;
//   role: string;
//   email_verified: boolean;
//   isActive: boolean;
//   isProfessional: boolean;
//   certifications: string[];
//   clients_count: number;
//   specialties: string[];
//   years_experience: string;
//   bio: string;
//   createdAt: string;
//   updatedAt: string;
// }

// interface Service {
//   id: string;
//   title: string;
//   sub_title: string;
//   description_short: string;
//   detailed_description: string;
//   image: string;
//   images: string[] | null;
//   benefits?: string[] | null;
//   for_who: string;
//   price: number;
//   duration: number;
//   phrase_hook: string;
//   category: string;
//   is_active: boolean;
//   slug: string;
//   createdAt: string;
//   updatedAt: string;
//   userId: string;
//   user: User;
// }

// // Categorías disponibles
// const categories = [
//   {
//     id: "all",
//     name: "Todos los Servicios",
//     icon: "✨",
//     color: "from-purple-500 to-indigo-600",
//   },
//   {
//     id: "masaje-prenatal",
//     name: "Masaje Prenatal",
//     icon: "🤰",
//     color: "from-pink-500 to-rose-600",
//   },
//   {
//     id: "masaje-terapeutico",
//     name: "Masaje Terapéutico",
//     icon: "🧘‍♀️",
//     color: "from-purple-500 to-indigo-600",
//   },
//   {
//     id: "drenaje-linfatico",
//     name: "Drenaje Linfático",
//     icon: "💧",
//     color: "from-blue-500 to-cyan-600",
//   },
//   {
//     id: "reflexologia",
//     name: "Reflexología",
//     icon: "👣",
//     color: "from-green-500 to-emerald-600",
//   },
//   {
//     id: "aromaterapia",
//     name: "Aromaterapia",
//     icon: "🌸",
//     color: "from-violet-500 to-purple-600",
//   },
//   {
//     id: "relajacion",
//     name: "Relajación",
//     icon: "🕯️",
//     color: "from-amber-500 to-orange-600",
//   },
// ];

// const ServicesClient = () => {
//   const [services, setServices] = useState<Service[]>([]);
//   const [filteredServices, setFilteredServices] = useState<Service[]>([]);
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [heroService, setHeroService] = useState<Service | null>(null);

//   useEffect(() => {
//     fetchServices();
//   }, []);

//   useEffect(() => {
//     filterServices();
//   }, [services, selectedCategory, searchTerm]);

//   const fetchServices = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch(`${BASE_URL}/xiomarasanchezterapeuta/servicesxs`);
//       if (res.ok) {
//         const data = await res.json();
//         setServices(data);
//         // Usar el primer servicio para el hero o un servicio destacado
//         if (data.length > 0) {
//           setHeroService(data[0]);
//         }
//       }
//     } catch (error) {
//       console.log("Error fetching services:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterServices = () => {
//     let filtered = services;

//     // Filtrar por categoría
//     if (selectedCategory !== "all") {
//       filtered = filtered.filter(
//         (service) => service.category === selectedCategory
//       );
//     }

//     // Filtrar por búsqueda
//     if (searchTerm) {
//       filtered = filtered.filter(
//         (service) =>
//           service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           service.description_short
//             .toLowerCase()
//             .includes(searchTerm.toLowerCase()) ||
//           service.category.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     setFilteredServices(filtered);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-purple-600 font-semibold">Cargando servicios...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
//       {/* Hero Section Mejorado */}
//       <section className="relative h-[80vh] w-full flex items-center justify-center overflow-hidden">
//         {/* Fondo con video o imagen */}
//         {heroService?.image && heroService.image.endsWith(".mp4") ? (
//           <video
//             className="absolute inset-0 w-full h-full object-cover"
//             src={heroService.image}
//             autoPlay
//             muted
//             loop
//             playsInline
//           />
//         ) : heroService?.image ? (
//           <Image
//             src={heroService.image}
//             alt={heroService.title || "Service image"}
//             fill
//             className="object-cover transition-transform duration-700 hover:scale-105"
//             priority
//             onError={(e) => {
//               e.currentTarget.style.display = "none";
//             }}
//           />
//         ) : (
//           <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-700"></div>
//         )}

//         {/* Overlay con gradiente */}
//         <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />

//         {/* Contenido del Hero */}
//         <div className="relative z-10 text-center px-6 max-w-5xl">
//           <div className="mb-8">
//             <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/30 mb-6">
//               <Sparkles className="h-5 w-5 text-white" />
//               <span className="text-white font-medium">
//                 Servicios Profesionales
//               </span>
//             </div>
//           </div>

//           <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8 drop-shadow-2xl text-white">
//             <span className="bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
//               Bienestar, Equilibrio
//             </span>
//             <br />
//             <span className="text-purple-200 italic">y Renovación</span>
//           </h1>

//           <p className="text-xl md:text-2xl mb-10 text-purple-100 max-w-3xl mx-auto leading-relaxed">
//             Descubre nuestros servicios especializados diseñados para tu
//             bienestar integral. Cada terapia es personalizada para brindarte la
//             mejor experiencia.
//           </p>

//           <div className="flex flex-col sm:flex-row justify-center gap-6 mt-8">
//             <Link
//               href="https://api.whatsapp.com/send/?phone=573135058584&text=%C2%A1Hola%21+Quiero+m%C3%A1s+informaci%C3%B3n+sobre+tus+servicios"
//               target="_blank"
//               className="group bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold px-10 py-5 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-green-500/25"
//             >
//               <div className="flex items-center justify-center space-x-3">
//                 <Heart className="h-6 w-6 group-hover:animate-pulse" />
//                 <span>Reserva tu Cita</span>
//               </div>
//             </Link>
//             <Link
//               href="/xios-academy/student-portal"
//               className="group bg-white/20 backdrop-blur-md hover:bg-white/30 text-white font-bold px-10 py-5 rounded-2xl border border-white/30 shadow-2xl transition-all duration-300 hover:scale-105"
//             >
//               <div className="flex items-center justify-center space-x-3">
//                 <Star className="h-6 w-6 group-hover:rotate-12 transition-transform" />
//                 <span>¡Quiero ser Terapeuta!</span>
//               </div>
//             </Link>
//           </div>
//         </div>

//         {/* Scroll indicator */}
//         <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
//           <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
//             <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
//           </div>
//         </div>
//       </section>

//       {/* Header de Filtros Premium */}
//       <section className="sticky top-0 z-40 bg-white/95 backdrop-blur-lg border-b border-purple-100 shadow-lg">
//         <div className="max-w-7xl mx-auto px-6 py-6">
//           <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
//             {/* Título y estadísticas */}
//             <div className="flex-1">
//               <h2 className="text-3xl font-bold text-gray-900 mb-2">
//                 Nuestros Servicios
//               </h2>
//               <p className="text-gray-600 flex items-center space-x-4">
//                 <span className="flex items-center space-x-2">
//                   <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
//                   <span>{filteredServices.length} servicios disponibles</span>
//                 </span>
//                 <span className="flex items-center space-x-2">
//                   <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
//                   <span>{categories.length - 1} categorías</span>
//                 </span>
//               </p>
//             </div>

//             {/* Buscador */}
//             <div className="relative lg:w-80">
//               <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
//               <input
//                 type="text"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 placeholder="Buscar servicios..."
//                 className="w-full pl-12 pr-4 py-3 bg-white border-2 border-purple-100 rounded-xl focus:border-purple-300 focus:ring-4 focus:ring-purple-100 transition-all outline-none text-gray-700 placeholder-gray-400"
//               />
//             </div>
//           </div>

//           {/* Filtros de Categoría */}
//           <div className="mt-6">
//             <div className="flex items-center space-x-3 mb-4">
//               <Filter className="h-5 w-5 text-purple-600" />
//               <span className="font-semibold text-gray-700">
//                 Filtrar por categoría:
//               </span>
//             </div>
//             <div className="flex flex-wrap gap-3">
//               {categories.map((category) => (
//                 <button
//                   key={category.id}
//                   onClick={() => setSelectedCategory(category.id)}
//                   className={`group flex items-center space-x-3 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
//                     selectedCategory === category.id
//                       ? `bg-gradient-to-r ${category.color} text-white shadow-lg transform scale-105`
//                       : "bg-white hover:bg-purple-50 text-gray-700 border border-purple-100 hover:border-purple-200 hover:shadow-md"
//                   }`}
//                 >
//                   <span className="text-xl">{category.icon}</span>
//                   <span>{category.name}</span>
//                   {selectedCategory === category.id && (
//                     <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
//                   )}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Nota informativa mejorada */}
//       <div className="max-w-7xl mx-auto px-6 py-8">
//         <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-l-4 border-purple-500 p-8 rounded-2xl shadow-lg">
//           <div className="flex items-start space-x-4">
//             <div className="p-3 bg-purple-500/20 rounded-xl">
//               <Sparkles className="h-6 w-6 text-purple-600" />
//             </div>
//             <div>
//               <h3 className="text-2xl font-bold text-purple-800 mb-3">
//                 Información Importante
//               </h3>
//               <p className="text-purple-700 leading-relaxed text-lg">
//                 El{" "}
//                 <span className="font-semibold bg-purple-200/50 px-2 py-1 rounded">
//                   precio del servicio puede variar según la ubicación
//                 </span>{" "}
//                 dentro del Eje Cafetero. También realizamos sesiones en otras
//                 ciudades de Colombia, pero únicamente en
//                 <span className="font-semibold bg-purple-200/50 px-2 py-1 rounded ml-1">
//                   fechas especiales de gira
//                 </span>
//                 .
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Grid de Servicios */}
//       <div className="max-w-7xl mx-auto px-6 pb-16">
//         {filteredServices.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {filteredServices.map((service) => (
//               <div
//                 key={service.id}
//                 className="transform hover:scale-105 transition-all duration-300"
//               >
//                 <ServiceCard service={service} />
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-16">
//             <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
//               <Search className="h-12 w-12 text-purple-400" />
//             </div>
//             <h3 className="text-2xl font-bold text-gray-700 mb-4">
//               No se encontraron servicios
//             </h3>
//             <p className="text-gray-500 mb-6">
//               Intenta cambiar los filtros o el término de búsqueda
//             </p>
//             <button
//               onClick={() => {
//                 setSelectedCategory("all");
//                 setSearchTerm("");
//               }}
//               className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-indigo-700 transition-all"
//             >
//               Limpiar Filtros
//             </button>
//           </div>
//         )}
//       </div>

//       {/* CTA Final mejorado */}
//       <section className="bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 py-20 mx-6 rounded-3xl mb-8 relative overflow-hidden">
//         <div className="absolute inset-0 bg-black/20"></div>
//         <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
//           <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/30 mb-8">
//             <Heart className="h-5 w-5 text-white" />
//             <span className="text-white font-medium">
//               Expandimos Nuestros Servicios
//             </span>
//           </div>

//           <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
//             ¿Quieres que vayamos a tu ciudad?
//           </h2>
//           <p className="text-xl mb-10 max-w-3xl mx-auto text-purple-100 leading-relaxed">
//             Escríbenos y cuéntanos dónde te encuentras. Organizamos giras
//             especiales en diferentes ciudades de Colombia para que disfrutes de
//             nuestros servicios profesionales.
//           </p>
//           <Link
//             href="https://api.whatsapp.com/send/?phone=573135058584&text=%C2%A1Hola!+Quiero+que+visiten+mi+ciudad"
//             target="_blank"
//             className="group inline-flex items-center space-x-4 bg-white hover:bg-purple-50 text-purple-600 font-bold px-10 py-5 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-white/25"
//           >
//             <Heart className="h-6 w-6 group-hover:animate-pulse" />
//             <span>Escríbenos Ahora</span>
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default ServicesClient;
