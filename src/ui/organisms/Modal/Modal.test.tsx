import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Modal } from './Modal';

describe('Modal Component', () => {
  afterEach(() => {
    // por si algún test deja el body bloqueado
    document.body.style.overflow = 'unset';
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should not render when isOpen is false', () => {
      render(
        <Modal isOpen={false} onClose={jest.fn()}>
          <div>Body</div>
        </Modal>
      );

      expect(screen.queryByText('Body')).not.toBeInTheDocument();
    });

    it('should render when isOpen is true', () => {
      render(
        <Modal isOpen onClose={jest.fn()}>
          <div>Body</div>
        </Modal>
      );

      expect(screen.getByText('Body')).toBeInTheDocument();
    });

    it('should render title and footer when provided', () => {
      render(
        <Modal
          isOpen
          onClose={jest.fn()}
          title="Crear pedido"
          footer={<div>Footer content</div>}
        >
          <div>Body</div>
        </Modal>
      );

      expect(screen.getByText('Crear pedido')).toBeInTheDocument();
      expect(screen.getByText('Footer content')).toBeInTheDocument();
    });

    it('should not render footer when footer prop is not provided', () => {
      render(
        <Modal isOpen onClose={jest.fn()} title="Title">
          <div>Body</div>
        </Modal>
      );

      expect(screen.queryByText('Footer content')).not.toBeInTheDocument();
    });
  });

  describe('Close behaviors', () => {
    it('should call onClose when close button is clicked', async () => {
      const user = userEvent.setup();
      const onClose = jest.fn();

      render(
        <Modal isOpen onClose={onClose} title="Title">
          <div>Body</div>
        </Modal>
      );

      await user.click(screen.getByLabelText('Cerrar modal'));
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when overlay is clicked (closeOnOverlayClick=true)', () => {
      const onClose = jest.fn();
      const { container } = render(
        <Modal isOpen onClose={onClose} closeOnOverlayClick>
          <div>Body</div>
        </Modal>
      );

      // el overlay es el wrapper más externo que retorna el componente
      fireEvent.click(container.firstChild as HTMLElement);
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should NOT call onClose when overlay is clicked if closeOnOverlayClick=false', () => {
      const onClose = jest.fn();
      const { container } = render(
        <Modal isOpen onClose={onClose} closeOnOverlayClick={false}>
          <div>Body</div>
        </Modal>
      );

      fireEvent.click(container.firstChild as HTMLElement);
      expect(onClose).not.toHaveBeenCalled();
    });

    it('should call onClose when Escape is pressed (closeOnEscape=true)', () => {
      const onClose = jest.fn();

      render(
        <Modal isOpen onClose={onClose} closeOnEscape>
          <div>Body</div>
        </Modal>
      );

      fireEvent.keyDown(document, { key: 'Escape' });
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should NOT call onClose when Escape is pressed if closeOnEscape=false', () => {
      const onClose = jest.fn();

      render(
        <Modal isOpen onClose={onClose} closeOnEscape={false}>
          <div>Body</div>
        </Modal>
      );

      fireEvent.keyDown(document, { key: 'Escape' });
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('Side effects (body scroll + listeners)', () => {
    it('should lock body scroll when open and restore on unmount', () => {
      const { unmount } = render(
        <Modal isOpen onClose={jest.fn()}>
          <div>Body</div>
        </Modal>
      );

      expect(document.body.style.overflow).toBe('hidden');

      unmount();
      expect(document.body.style.overflow).toBe('unset');
    });

    it('should add/remove keydown listener when open/close toggles', () => {
      const addSpy = jest.spyOn(document, 'addEventListener');
      const removeSpy = jest.spyOn(document, 'removeEventListener');

      const { rerender, unmount } = render(
        <Modal isOpen={false} onClose={jest.fn()}>
          <div>Body</div>
        </Modal>
      );

      // abrir
      rerender(
        <Modal isOpen onClose={jest.fn()}>
          <div>Body</div>
        </Modal>
      );

      expect(addSpy).toHaveBeenCalledWith('keydown', expect.any(Function));

      // cerrar (ya no renderiza, pero el effect cleanup debe correr)
      rerender(
        <Modal isOpen={false} onClose={jest.fn()}>
          <div>Body</div>
        </Modal>
      );

      expect(removeSpy).toHaveBeenCalledWith('keydown', expect.any(Function));

      unmount();
      addSpy.mockRestore();
      removeSpy.mockRestore();
    });
  });
});
