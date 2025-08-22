import axios from "axios";
import React from "react";
import { Metadata } from "next";
import AllWorkshops from "./components/AllWorkshops";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export const metadata: Metadata = {
  title: "Talleres y Workshops | Xios Academy",
  description:
    "Descubre nuestros talleres y workshops especializados. Experiencias de aprendizaje prácticas e intensivas para potenciar tu desarrollo profesional.",
  keywords:
    "talleres, workshops, formación práctica, desarrollo profesional, capacitación intensiva",
  openGraph: {
    title: "Talleres y Workshops | Xios Academy",
    description:
      "Experiencias de aprendizaje prácticas e intensivas para tu crecimiento profesional",
    type: "website",
  },
};

const WorkshopsPage = async () => {
  let workshops = [];

  try {
    const res = await axios.get(`${BASE_URL}/xios-academy/event?type=workshop`);
    workshops = res.data;
  } catch (error) {
    console.error("Error loading workshops:", error);
  }
  console.log(workshops, '<-- workshops')
  return (
    <div>
      <AllWorkshops workshops={workshops} />
    </div>
  );
};

export default WorkshopsPage;
