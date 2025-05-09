import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // TODO: Implement actual registration logic
    // This is a placeholder that simulates successful registration
    if (name && email && password) {
      return NextResponse.json(
        {
          message: 'Registration successful',
          user: {
            id: '1',
            name,
            email,
          },
        },
        { status: 201 }
      );
    }

    return NextResponse.json(
      { message: 'Invalid registration data' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 