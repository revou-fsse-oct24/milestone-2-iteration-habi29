import React, { useState, useEffect } from "react";

interface Category {
  id: string;
  name: string;
}

interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
}

const ProductCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("https://api.platzi.com/categories");
      const data = await response.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`https://api.platzi.com/products?category=${selectedCategory}`);
      const data = await response.json();
      setProducts(data);
    };
    if (selectedCategory) fetchProducts();
  }, [selectedCategory]);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Products by Category</h1>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">Select Category</option>
        {categories.map((cat: { id: string; name: string }) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
        {products.map((product: Product) => (
          <div key={product.id} className="border p-3 rounded">
            <img src={product.image} alt={product.title} className="w-full" />
            <h2 className="text-lg font-bold">{product.title}</h2>
            <p>{product.description}</p>
            <p className="text-blue-500">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCategory;