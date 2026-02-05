import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SidebarFooter } from './SidebarFooter';

describe('SidebarFooter Component', () => {
  it('should render message and button text', () => {
    render(
      <SidebarFooter
        message="¿Necesitas ayuda?"
        buttonText="Contactar"
      />
    );

    expect(screen.getByText('¿Necesitas ayuda?')).toBeInTheDocument();
    expect(screen.getByText('Contactar')).toBeInTheDocument();
  });

  it('should render button element', () => {
    render(
      <SidebarFooter
        message="Mensaje"
        buttonText="Acción"
      />
    );

    const button = screen.getByRole('button', { name: 'Acción' });
    expect(button).toBeInTheDocument();
  });

  it('should call onButtonClick when button is clicked', async () => {
    const user = userEvent.setup();
    const onButtonClick = jest.fn();

    render(
      <SidebarFooter
        message="Mensaje"
        buttonText="Acción"
        onButtonClick={onButtonClick}
      />
    );

    await user.click(screen.getByRole('button', { name: 'Acción' }));
    expect(onButtonClick).toHaveBeenCalledTimes(1);
  });

  it('should not throw error when button is clicked and onButtonClick is not provided', async () => {
    const user = userEvent.setup();

    render(
      <SidebarFooter
        message="Mensaje"
        buttonText="Acción"
      />
    );

    await user.click(screen.getByRole('button', { name: 'Acción' }));

    // Si no explota, el test pasa 🙂
    expect(true).toBe(true);
  });
});
