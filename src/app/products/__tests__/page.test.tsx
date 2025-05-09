import { render, screen, waitFor } from '@testing-library/react';
import ProductsPage from '../page';

// Mock the fetch function
global.fetch = jest.fn();

describe('ProductsPage', () => {
  const mockProducts = [
    {
      id: '1',
      name: 'Test Product 1',
      description: 'Description 1',
      price: 99.99,
      image: '/images/product1.jpg',
      category: 'Electronics',
    },
    {
      id: '2',
      name: 'Test Product 2',
      description: 'Description 2',
      price: 149.99,
      image: '/images/product2.jpg',
      category: 'Clothing',
    },
  ];

  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  it('renders loading state initially', () => {
    render(<ProductsPage />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders products after loading', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts,
    });

    render(<ProductsPage />);

    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
      expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    });
  });

  it('handles API error', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

    render(<ProductsPage />);

    await waitFor(() => {
      expect(screen.getByText(/error loading products/i)).toBeInTheDocument();
    });
  });

  it('filters products by category', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts,
    });

    render(<ProductsPage />);

    await waitFor(() => {
      expect(screen.getByText('Test Product 1')).toBeInTheDocument();
      expect(screen.getByText('Test Product 2')).toBeInTheDocument();
    });

    const categorySelect = screen.getByRole('combobox');
    fireEvent.change(categorySelect, { target: { value: 'Electronics' } });

    expect(screen.getByText('Test Product 1')).toBeInTheDocument();
    expect(screen.queryByText('Test Product 2')).not.toBeInTheDocument();
  });
}); 