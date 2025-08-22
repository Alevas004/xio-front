'use client'
import { RootState } from '@/redux/store';
import React from 'react'
import { useSelector } from 'react-redux'
import NoStudent from './components/NoStudent';

const StudentPortal = () => {

  const user = useSelector((state: RootState) => state.auth?.user);
  const isAnStudent = user?.role === "student";



  return (
    <div>

      {isAnStudent ? (
        <p>Welcome to the Student Portal</p>
      ) : (
       <NoStudent />
      )}

    </div>
  )
}

export default StudentPortal