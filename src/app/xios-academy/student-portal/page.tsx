"use client";
import { RootState } from "@/redux/store";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import NoStudent from "../../../components/xios-academy/student-portal/NoStudent";
import Student from "@/components/xios-academy/student-portal/Student";
import { useGet } from "@/hooks/useGet";

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  vat: string;
  gender: "male" | "female" | "other";
  profile_picture: string;
  country: string;
  city: string;
  address: string;
  date_of_birth: string; // ISO date
  role: "student" | "teacher" | "admin";
  email_verified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  orderacademies: OrderAcademy[];
}

export interface OrderAcademy {
  id: string;
  total: number;
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  paymentMethod: "stripe" | "paypal" | "applepay" | "googlepay";
  purchasedAt: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  academyId: string | null;
  courseId: string | null;
  userId: string;
  course: Course | null;
  academy: Academy | null;

}

export interface Course {
  id: string;
  title: string;
  subtitle: string;
  description_short: string;
  description_long: string;
  url: string;
  images: string[];
  category: string[];
  tags: string[];
  price: number;
  is_free: boolean;
  level: "beginner" | "intermediate" | "advanced";
  duration: number; // horas
  certificate: boolean;
  instructor: string;
  includes: string[];
  is_active: boolean;
  slug: string;
  createdAt: string;
  updatedAt: string;
  academyId: string | null;
}

export interface Academy {
  id: string;
  title: string;
  subtitle: string;
  type: "workshop" | "seminar" | "course";
  description_short: string;
  description_long: string;
  image: string;
  images: string[];
  courses: Course[];
  location: string;
  start_date: string; // ISO date
  end_date: string; // ISO date
  start_time: string; // HH:mm:ss
  end_time: string; // HH:mm:ss
  duration: number; // horas
  price: number;
  capacity: number;
  enrolled: number;
  includes: string[];
  requirements: string[];
  prerequisite_courses: string[]; // IDs de cursos prerequisitos
  certificate: boolean;
  materials_included: boolean;
  materials_description: string[];
  speaker: string;
  speakers: string[];
  level: "Principiante" | "Intermedio" | "Avanzado";
  slug: string;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
}

const StudentPortal = () => {
  // 🔄 Estado para manejar hydration de forma segura
  const [isHydrated, setIsHydrated] = useState(false);

  const user = useSelector((state: RootState) => state.auth?.user);

  const isAnStudent = user?.role === "student";

  // 🚀 Effect para manejar hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const {
    data: paid,
    error,
    loading,
  } = useGet<User>(`/xio/users/myprofile`, { withAuth: true });

  console.log("paid courses", paid);

  // 📱 Loading state durante hydration
  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-piel-blanco to-piel-claro flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-verde-oscuro mx-auto mb-4"></div>
          <p className="text-verde-oscuro font-medium">
            Cargando portal del estudiante...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>{isAnStudent ? <Student paid={paid ?? null} /> : <NoStudent />}</div>
  );
};

export default StudentPortal;
