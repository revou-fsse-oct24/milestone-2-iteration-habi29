import React, { useState } from "react";

interface CartItem {
  id: string;
  title: string;
  price: number;
}

const ShoppingCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: CartItem) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Shopping Cart</h1>
      {cart.map((item) => (
        <div key={item.id} className="flex justify-between border p-3 rounded my-2">
          <span>{item.title}</span>
          <button
            onClick={() => removeFromCart(item.id)}
            className="text-red-500"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
};

export default ShoppingCart;