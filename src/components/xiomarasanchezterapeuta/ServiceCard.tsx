import { Service } from "@/app/xiomarasanchezterapeuta/services-xs/page";
import Image from "next/image";
import React from "react";
import { Clock, Star, ArrowRight, Users, Heart, Sparkles } from "lucide-react";
import BtnToWhatsapp from "./BtnToWhatsapp";
import BtnToProductBySlug from "./BtnToProductBySlug";

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <div className="group flex flex-col h-full relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-500 hover:scale-[1.01] max-w-md mx-auto">
      {/* Hero Image/Video Section */}
      <div className="relative h-64 overflow-hidden">
        {service.image.endsWith(".mp4") ? (
          <video
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            src={service.image}
            autoPlay
            loop
            muted
            playsInline
          />
        ) : (
          <Image
            src={service.image}
            alt={service.title}
            width={400}
            height={256}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

        {/* Premium Badge */}
        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
          <Sparkles className="h-4 w-4" />
          <span>Premium</span>
        </div>

        {/* Hook Phrase */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white text-xl font-bold leading-tight drop-shadow-lg">
            {service.phrase_hook}
          </h3>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 space-y-4 flex-1">
        {/* Header */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-gray-900 leading-tight">
            {service.title}
          </h2>
          <p className="text-piel-oscuro font-medium text-lg">
            {service.sub_title}
          </p>
        </div>

        {/* Duration Badge */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
            <Clock className="h-4 w-4" />
            <span>{service.duration} min</span>
          </div>
          <div className="flex items-center space-x-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
            <Star className="h-4 w-4" />
            <span>{service.category}</span>
          </div>
        </div>

        {/* Short Description */}
        <p className="text-gray-600 leading-relaxed line-clamp-3">
          {service.description_short}
        </p>

        {/* Target Audience */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <h4 className="font-semibold text-purple-900 mb-1 text-start">
                ¿Es para ti?
              </h4>
              <p className="text-purple-700 text-sm leading-relaxed text-start">
                {service.for_who}
              </p>
            </div>
          </div>
        </div>

        {/* Benefits Preview */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-xl p-4">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Heart className="h-5 w-5 text-green-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-green-900 mb-2 text-start">
                Beneficios principales
              </h4>
              <div className="space-y-1">
                {(service.benefits || [])
                  .slice(0, 3) // Solo mostrar los primeros 3 beneficios
                  .map((benefit: string, i: number) => (
                    <div
                      key={i}
                      className="flex items-center space-x-2 text-sm"
                    >
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span className="text-green-700 text-start">
                        {benefit.trim().charAt(0).toUpperCase() +
                          benefit.trim().slice(1).toLowerCase()}
                      </span>
                    </div>
                  ))}
                {(service.benefits || []).length > 3 && (
                  <p className="text-green-600 text-xs font-medium mt-1">
                    +{(service.benefits || []).length - 3} beneficios más
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-6 pt-0 space-y-3">
        {/* Primary CTA - WhatsApp */}
        <BtnToWhatsapp serviceTitle={service.title}>
          <button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center space-x-2 group/btn cursor-pointer">
            <span>💬</span>
            <span>Reservar ahora</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </button>
        </BtnToWhatsapp>

        {/* Secondary CTA - More Info */}
        <BtnToProductBySlug productSlug={service.slug}>
          <button className="w-full bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 font-medium py-3 px-6 rounded-xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 hover:scale-[1.01] flex items-center justify-center space-x-2 group/btn mt-3">
            <span>Más información</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </button>
        </BtnToProductBySlug>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-200/10 to-pink-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </div>
  );
};

export default ServiceCard;
