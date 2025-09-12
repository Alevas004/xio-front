import { FiLoader } from "react-icons/fi";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-piel-blanco to-piel-claro">
      {/* Hero Skeleton */}
      <div className="h-96 bg-gradient-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-3xl">
            <div className="w-32 h-6 bg-white/20 rounded-lg mb-6 animate-pulse"></div>
            <div className="w-96 h-12 bg-white/20 rounded-lg mb-4 animate-pulse"></div>
            <div className="w-80 h-6 bg-white/20 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content Skeleton */}
          <div className="lg:col-span-2 space-y-8">
            {/* Workshop Details Skeleton */}
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <div className="w-64 h-8 bg-gray-200 rounded-lg mb-6 animate-pulse"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                    <div className="flex-1">
                      <div className="w-16 h-4 bg-gray-200 rounded mb-1 animate-pulse"></div>
                      <div className="w-24 h-5 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Content Skeletons */}
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 shadow-lg">
                <div className="w-48 h-7 bg-gray-200 rounded-lg mb-6 animate-pulse"></div>
                <div className="space-y-3">
                  {[...Array(4)].map((_, j) => (
                    <div
                      key={j}
                      className="w-full h-4 bg-gray-200 rounded animate-pulse"
                    ></div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar Skeleton */}
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-lg">
              <div className="text-center mb-6">
                <div className="w-24 h-12 bg-gray-200 rounded-lg mx-auto mb-2 animate-pulse"></div>
                <div className="w-32 h-4 bg-gray-200 rounded mx-auto animate-pulse"></div>
              </div>
              <div className="space-y-4">
                <div className="w-full h-12 bg-gray-200 rounded-xl animate-pulse"></div>
                <div className="w-full h-12 bg-gray-200 rounded-xl animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 shadow-2xl text-center">
          <FiLoader className="w-8 h-8 text-verde-oscuro animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Cargando ...</p>
        </div>
      </div>
    </div>
  );
}
