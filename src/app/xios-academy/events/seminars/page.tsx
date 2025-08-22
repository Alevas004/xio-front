import axios from "axios";
import React from "react";
import { Metadata } from "next";
import AllSeminars from "./components/AllSeminars";


const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export const metadata: Metadata = {
  title: "Seminarios | Xios Academy",
  description:
    "Descubre nuestros seminarios especializados. Experiencias de aprendizaje prácticas e intensivas para potenciar tu desarrollo profesional.",
  keywords:
    "seminarios, formación práctica, desarrollo profesional, capacitación intensiva",
  openGraph: {
    title: "Seminarios | Xios Academy",
    description:
      "Experiencias de aprendizaje prácticas e intensivas para tu crecimiento profesional",
    type: "website",
  },
};

const SeminarsPage = async () => {
  let seminars = [];

  try {
    const res = await axios.get(`${BASE_URL}/xios-academy/event?type=seminar`);
    seminars = res.data;
  } catch (error) {
    console.error("Error loading seminars:", error);
  }
  console.log(seminars, "<-- seminars");
  return (
    <div>
      <AllSeminars seminars={seminars} />
    </div>
  );
};

export default SeminarsPage;
