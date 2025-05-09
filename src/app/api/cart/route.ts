import { NextResponse } from 'next/server';

// Mock cart data
let cartItems: any[] = [];

export async function GET() {
  try {
    return NextResponse.json(cartItems, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { productId, quantity } = body;

    // TODO: Implement actual product lookup
    const product = {
      id: productId,
      name: 'Product ' + productId,
      price: 99.99,
      image: '/images/product' + productId + '.jpg',
    };

    const cartItem = {
      id: Date.now().toString(),
      productId,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image,
    };

    cartItems.push(cartItem);

    return NextResponse.json(cartItem, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 