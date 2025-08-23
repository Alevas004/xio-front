"use client";
import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

const Contact = () => {
  return (
    <section className=" py-16 px-4">
      <div className="flex flex-col items-center justify-center mb-5">
        {/* Columna de texto e info */}
        <div className="max-w-[400px] flex flex-col justify-center space-y-6">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-extrabold text-verde-oscuro italic">
              Contáctame
            </h2>
            <p className="text-lg text-verde-oscuro/80 leading-relaxed ">
              Si tienes preguntas, quieres agendar una cita o simplemente
              quieres más información, estaré feliz de ayudarte.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="text-verde-oscuro w-6 h-6" />
              <span className="text-verde-oscuro">
                xiosanchezinfo@gmail.com
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="text-verde-oscuro w-6 h-6" />
              <span className="text-verde-oscuro">+57 331 350 58584</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="text-verde-oscuro w-6 h-6" />
              <span className="text-verde-oscuro">Armenia, Colombia</span>
            </div>
          </div>
        </div>
      </div>
      <section className="bg-gradient-2 py-16 px-4 rounded-2xl">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold text-white italic">
            ¡Hablemos ahora!
          </h2>
          <p className=" text-piel-blanco">
            Escríbeme por WhatsApp y resolveré todas tus dudas al instante.
          </p>
          <Link
            href="https://wa.me/573135058584?text=¡Hola!%20Quiero%20más%20información%20sobre%20tus%20servicios"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-verde-oscuro text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-verde-claro transition-all"
          >
            <FaWhatsapp className="text-2xl" />
            Escríbeme en WhatsApp
          </Link>
        </div>
      </section>
    </section>
  );
};

export default Contact;
