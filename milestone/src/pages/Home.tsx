import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Welcome to ShopSmart</h1>
      <Link to="/product/1" className="text-blue-500 underline">
        Go to Product Page
      </Link>
    </div>
  );
};

export default Home;