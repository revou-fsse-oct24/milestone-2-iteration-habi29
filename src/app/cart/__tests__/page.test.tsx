/// <reference types="@testing-library/jest-dom" />
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import CartPage from '../page';

declare global {
  namespace NodeJS {
    interface Global {
      fetch: jest.Mock;
    }
  }
}

const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('CartPage', () => {
  const mockCartItems = [
    {
      id: '1',
      productId: '1',
      name: 'Test Product 1',
      price: 99.99,
      quantity: 2,
      image: '/images/product1.jpg',
    },
    {
      id: '2',
      productId: '2',
      name: 'Test Product 2',
      price: 149.99,
      quantity: 1,
      image: '/images/product2.jpg',
    },
  ];

  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('renders loading state initially', () => {
    render(<CartPage />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders empty cart message when cart is empty', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    });

    render(<CartPage />);

    await waitFor(() => {
      expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    });
  });

  it('renders cart items after loading', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockCartItems,
    });

    render(<CartPage />);

    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
      expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    });
  });

  it('updates item quantity', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockCartItems,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ ...mockCartItems[0], quantity: 3 }),
      });

    render(<CartPage />);

    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    });

    const quantitySelect = screen.getAllByRole('combobox')[0];
    fireEvent.change(quantitySelect, { target: { value: '3' } });

    await waitFor(() => {
      expect(screen.getByText('$299.97')).toBeInTheDocument(); // 99.99 * 3
    });
  });

  it('removes item from cart', async () => {
    (global.fetch as jest.Mock)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => mockCartItems,
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ message: 'Cart item removed' }),
      });

    render(<CartPage />);

    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    });

    const removeButton = screen.getAllByText(/remove/i)[0];
    fireEvent.click(removeButton);

    await waitFor(() => {
      expect(screen.queryByText('Test Product 1')).not.toBeInTheDocument();
    });
  });

  it('calculates total correctly', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockCartItems,
    });

    render(<CartPage />);

    await waitFor(() => {
      expect(screen.getByText('$349.97')).toBeInTheDocument(); // (99.99 * 2) + 149.99
    });
  });
}); 