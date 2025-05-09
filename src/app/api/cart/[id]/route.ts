import { NextResponse } from 'next/server';

// Mock cart data (shared with the main cart route)
let cartItems: any[] = [];

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { quantity } = body;

    const itemIndex = cartItems.findIndex((item) => item.id === params.id);

    if (itemIndex === -1) {
      return NextResponse.json(
        { message: 'Cart item not found' },
        { status: 404 }
      );
    }

    cartItems[itemIndex].quantity = quantity;

    return NextResponse.json(cartItems[itemIndex], { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const itemIndex = cartItems.findIndex((item) => item.id === params.id);

    if (itemIndex === -1) {
      return NextResponse.json(
        { message: 'Cart item not found' },
        { status: 404 }
      );
    }

    cartItems.splice(itemIndex, 1);

    return NextResponse.json(
      { message: 'Cart item removed' },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 