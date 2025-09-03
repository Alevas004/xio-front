
import CourseBySlug from '@/components/xios-academy/CourseBySlug'
import { Course } from '@/components/xios-academy/XiosAcademyClient';
import React from 'react'



interface Params {
  slug: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;


const CourseById = async ({ params }: { params: Params }) => {
  const slug = params.slug;
  let course: Course[] | [] = [];


  try {
    // const authorization = `Bearer ${token}`;
    const response = await fetch(`${BASE_URL}/xios-courses/courses/${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // "Authorization": authorization,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch course");
    }
    const data = await response.json();

    course = data

    console.log("course", course);
  } catch (error) {
    console.log('error getting course', error);
  }


  console.log("slug", slug);
  console.log("course", course);



  return (
    <div>
      <CourseBySlug course={course} />
    </div>
  )
}

export default CourseById