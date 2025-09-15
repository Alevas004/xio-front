"use client";
import Link from "next/link";
import React from "react";

interface BtnToWhatsappProps {
  serviceTitle: string;
  children: React.ReactNode;
}

const BtnToWhatsapp = ({ serviceTitle, children }: BtnToWhatsappProps) => {
  return (
    <Link
      href={`https://api.whatsapp.com/send/?phone=573135058584&text=%C2%A1Hola%21+Quiero+reservar+el+servicio:+${serviceTitle}`}
      target="_blank"
      rel="noopener noreferrer"
      className="cursor-pointer"
    >
      {children}
    </Link>
  );
};

export default BtnToWhatsapp;
