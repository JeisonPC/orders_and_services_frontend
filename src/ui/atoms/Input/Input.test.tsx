import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe('Input Component', () => {
  it('should render an input element', () => {
    render(<Input placeholder="Nombre" />);

    const input = screen.getByPlaceholderText('Nombre');
    expect(input).toBeInTheDocument();
  });

  it('should apply default input class', () => {
    const { container } = render(<Input />);

    const input = container.querySelector('input');
    expect(input).toBeInTheDocument();
    // no testeamos el nombre exacto de la clase (CSS Modules),
    // solo que tenga alguna clase aplicada
    expect(input?.className).not.toBe('');
  });

  it('should apply error class when error=true', () => {
    const { container } = render(<Input error />);

    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.className).toContain('error');
  });

  it('should not apply error class when error=false', () => {
    const { container } = render(<Input error={false} />);

    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.className).not.toContain('error');
  });

  it('should merge custom className with internal classes', () => {
    const { container } = render(<Input className="custom-class" />);

    const input = container.querySelector('input') as HTMLInputElement;
    expect(input.className).toContain('custom-class');
  });

  it('should pass native input props correctly', async () => {
    const user = userEvent.setup();

    render(<Input aria-label="email" />);

    const input = screen.getByLabelText('email') as HTMLInputElement;
    await user.type(input, 'test@example.com');

    expect(input.value).toBe('test@example.com');
  });

  it('should support disabled prop', () => {
    render(<Input disabled aria-label="disabled-input" />);

    const input = screen.getByLabelText('disabled-input');
    expect(input).toBeDisabled();
  });
});
