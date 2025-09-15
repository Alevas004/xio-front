"use client";
import React from "react";

interface BtnToWhatsappProps {
  serviceTitle: string;
  children: React.ReactNode;
}

const BtnToWhatsapp = ({ serviceTitle, children }: BtnToWhatsappProps) => {
  const goToWhatsapp = () => {
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=573135058584&text=%C2%A1Hola%21+Quiero+reservar+el+servicio:+${serviceTitle}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return <div onClick={goToWhatsapp}>{children}</div>;
};

export default BtnToWhatsapp;
