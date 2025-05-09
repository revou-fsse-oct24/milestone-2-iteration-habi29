import { NextResponse } from 'next/server';

// Mock data for products
const products = [
  {
    id: '1',
    name: 'Product 1',
    description: 'This is a description for product 1',
    price: 99.99,
    image: '/images/product1.jpg',
    category: 'Electronics',
    stock: 10,
  },
  {
    id: '2',
    name: 'Product 2',
    description: 'This is a description for product 2',
    price: 149.99,
    image: '/images/product2.jpg',
    category: 'Clothing',
    stock: 15,
  },
  // Add more mock products as needed
];

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = products.find((p) => p.id === params.id);

    if (!product) {
      return NextResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 