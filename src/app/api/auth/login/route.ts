import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // TODO: Implement actual authentication logic
    // This is a placeholder that simulates successful login
    if (email && password) {
      return NextResponse.json(
        {
          message: 'Login successful',
          user: {
            id: '1',
            email,
            name: 'Test User',
          },
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 