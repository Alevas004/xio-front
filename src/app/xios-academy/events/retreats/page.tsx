import axios from "axios";
import React from "react";
import { Metadata } from "next";
import AllRetreats from "./components/AllRetreats";


const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export const metadata: Metadata = {
  title: "Retiros | Xios Academy",
  description:
    "Descubre nuestros retiros especializados. Experiencias de aprendizaje prácticas e intensivas para potenciar tu desarrollo profesional.",
  keywords:
    "retiros, formación práctica, desarrollo profesional, capacitación intensiva",
  openGraph: {
    title: "Retiros | Xios Academy",
    description:
      "Experiencias de aprendizaje prácticas e intensivas para tu crecimiento profesional",
    type: "website",
  },
};

const RetreatsPage = async () => {
  let retreats = [];

  try {
    const res = await axios.get(`${BASE_URL}/xios-academy/event?type=retreat`);
    retreats = res.data;
  } catch (error) {
    console.error("Error loading retreats:", error);
  }
  console.log(retreats, '<-- retreats')
  return (
    <div>
      <AllRetreats retreat={retreats} />
    </div>
  );
};

export default RetreatsPage;
