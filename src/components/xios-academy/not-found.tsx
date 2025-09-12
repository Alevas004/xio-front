import Link from 'next/link';
import { FiArrowLeft, FiCalendar } from 'react-icons/fi';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto px-4">
        <div className="bg-gradient-3 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
          <FiCalendar className="w-12 h-12 text-piel-blanco" />
        </div>
        
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Evento no encontrado
        </h2>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          El evento que buscas no existe o ha sido movido. 
          Te invitamos a explorar nuestros otros eventos disponibles.
        </p>
        
        <div className="space-y-4">
          <Link
            href="/xios-academy"
            className="inline-flex items-center bg-gradient-2 text-white py-3 px-8 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
          >
            <FiArrowLeft className="w-4 h-4 mr-2" />
            Ver todos los eventos
          </Link>
          
          <div className="block">
            <Link
              href="/xios-academy"
              className="inline-flex items-center text-verde-oscuro hover:text-verde-gris transition-colors"
            >
              Volver a Xios Academy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
