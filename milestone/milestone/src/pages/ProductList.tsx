import React, { useEffect, useState } from "react";

interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
}

const ProductListing = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://api.platzi.com/products");
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5">
      {products.map((product: Product) => (
        <div key={product.id} className="border p-3 rounded">
          <img src={product.image} alt={product.title} className="w-full" />
          <h2 className="text-lg font-bold">{product.title}</h2>
          <p>{product.description}</p>
          <p className="text-blue-500">${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductListing;