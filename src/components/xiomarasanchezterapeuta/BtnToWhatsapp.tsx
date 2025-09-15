"use client";
import React, { useState } from "react";

interface BtnToWhatsappProps {
  serviceTitle: string;
  children: React.ReactNode;
  isService?: boolean;
}

const BtnToWhatsapp = ({
  serviceTitle,
  children,
  isService,
}: BtnToWhatsappProps) => {
  const [isServiceText] = useState(isService ?? true);
  const serviceText = isServiceText
    ? `+quiero+reservar+el+servicio: ${serviceTitle}`
    : "+tengo+una+consulta";
  const goToWhatsapp = () => {
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=573135058584&text=¡Hola!,${serviceText}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return <div onClick={goToWhatsapp}>{children}</div>;
};

export default BtnToWhatsapp;
