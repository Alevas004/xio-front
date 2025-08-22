import axios from "axios";
import React from "react";
import { Metadata } from "next";
import AllTrainings from "./components/AllCorpoTrainings";


const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export const metadata: Metadata = {
  title: "Capacitación | Xios Academy",
  description:
    "Descubre nuestros programas de capacitación especializados. Experiencias de aprendizaje prácticas e intensivas para potenciar tu desarrollo profesional.",
  keywords:
    "capacitación, formación práctica, desarrollo profesional, capacitación intensiva",
  openGraph: {
    title: "Capacitación | Xios Academy",
    description:
      "Experiencias de aprendizaje prácticas e intensivas para tu crecimiento profesional",
    type: "website",
  },
};

const TrainingsPage = async () => {
  let trainings = [];

  try {
    const res = await axios.get(`${BASE_URL}/xios-academy/event?type=training`);
    trainings = res.data;
  } catch (error) {
    console.error("Error loading trainings:", error);
  }
  console.log(trainings, '<-- trainings')
  return (
    <div>
      <AllTrainings training={trainings} />
    </div>
  );
};

export default TrainingsPage;
