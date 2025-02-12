import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';

interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>(); // Ensure id is retrieved properly
  const [product, setProduct] = React.useState<Product | null>(null);

  React.useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://api.platzi.com/products/${id}`);
        const data: Product = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
  
    fetchProduct();
  }, [id]);

  return (
    <div>
      {product ? (
        <div>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <img src={product.image} alt={product.title} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );  
};

export default ProductDetail;