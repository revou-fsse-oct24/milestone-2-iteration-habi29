import React, { useState } from "react";

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = isLogin ? "/api/login" : "/api/register";
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center p-5">
      <h1 className="text-2xl font-bold">{isLogin ? "Login" : "Register"}</h1>
      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full p-2 border rounded my-2"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          className="w-full p-2 border rounded my-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>
      <button
        onClick={() => setIsLogin(!isLogin)}
        className="mt-3 text-blue-500 underline"
      >
        {isLogin ? "Switch to Register" : "Switch to Login"}
      </button>
    </div>
  );
};

export default LoginRegister;