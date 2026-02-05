import { render, screen } from '@testing-library/react';
import { Navbar } from './Navbar';

describe('Navbar Component', () => {
  describe('Rendering', () => {
    it('should render navbar container', () => {
      const { container } = render(<Navbar />);

      expect(container.querySelector('nav')).toBeInTheDocument();
    });

    it('should render brand when brand prop is provided', () => {
      render(
        <Navbar
          brand={{
            title: 'Monokera',
            href: '/',
          }}
        />
      );

      expect(screen.getByText('Monokera')).toBeInTheDocument();
      // si NavbarBrand renderiza un link
      expect(screen.getByRole('link', { name: 'Monokera' })).toBeInTheDocument();
    });

    it('should render brand without link when href is not provided', () => {
      render(
        <Navbar
          brand={{
            title: 'Monokera',
          }}
        />
      );

      expect(screen.getByText('Monokera')).toBeInTheDocument();
    });

    it('should not render brand when brand prop is not provided', () => {
      render(<Navbar />);

      expect(screen.queryByText('Monokera')).not.toBeInTheDocument();
    });

    it('should render children inside NavbarActions', () => {
      render(
        <Navbar>
          <button>Crear pedido</button>
          <button>Salir</button>
        </Navbar>
      );

      expect(screen.getByText('Crear pedido')).toBeInTheDocument();
      expect(screen.getByText('Salir')).toBeInTheDocument();
    });
  });
});
