import FilterProducts from "@/components/byxio/FilterProducts";
import ProductCard from "@/components/byxio/ProductCard";
import React from "react";

const Products = () => {

  

  return (
    <section className="flex flex-row w-full items-start relative">
      {/* sidebar */}
     <FilterProducts />

      {/* content */}
      <section className="w-full p-4 bg-amber-800 pt-25">
        <ProductCard />
      </section>
    </section>
  );
};

export default Products;
