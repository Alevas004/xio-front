import { useGet } from "@/hooks/useGet";
import { useParams } from "next/navigation";
import React from "react";

interface Course {
  id: number;
  title: string;
  description: string;
  duration: string;
  price: number;
}

const CourseBySlug = () => {
  const { slug } = useParams();
  const { data: course } = useGet<Course>(`/xios-academy/courses/${slug}`, {
    withAuth: true,
  });
  console.log("slug", slug);
  console.log("course", course);
  return (
    <div>
      <pre>{JSON.stringify(course, null, 2)}</pre>
    </div>
  );
};

export default CourseBySlug;
