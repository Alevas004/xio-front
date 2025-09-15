"use client";
import React from "react";

interface BtnToProductBySlugProps {
  productSlug: string;
  children: React.ReactNode;
}
const BtnToProductBySlug = ({
  productSlug,
  children,
}: BtnToProductBySlugProps) => {
  const handleProductBySlug = () => {
    // Redirigir a la página del producto
    window.location.href = `/xiomarasanchezterapeuta/services-xs/${productSlug}`;
  };

  return (
    <div onClick={handleProductBySlug} className="cursor-pointer">
      {children}
    </div>
  );
};

export default BtnToProductBySlug;
