import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Online Shop',
  description: 'A modern e-commerce platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-white shadow-md">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="text-xl font-bold text-primary">
                Online Shop
              </Link>
              <div className="flex items-center space-x-4">
                <Link
                  href="/products"
                  className="text-gray-600 hover:text-primary"
                >
                  Products
                </Link>
                <Link
                  href="/cart"
                  className="text-gray-600 hover:text-primary"
                >
                  Cart
                </Link>
                <Link
                  href="/auth/login"
                  className="text-gray-600 hover:text-primary"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="bg-gray-100 mt-8">
          <div className="container mx-auto px-4 py-8">
            <p className="text-center text-gray-600">
              © 2024 Online Shop. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
} 