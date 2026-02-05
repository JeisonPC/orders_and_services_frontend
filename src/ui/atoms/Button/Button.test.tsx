import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button Component', () => {
  describe('Rendering', () => {
    it('should render button with children text', () => {
      render(<Button>Click me</Button>);
      
      expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
    });

    it('should render button with custom content', () => {
      render(
        <Button>
          <span>Icon</span>
          <span>Text</span>
        </Button>
      );
      
      expect(screen.getByText('Icon')).toBeInTheDocument();
      expect(screen.getByText('Text')).toBeInTheDocument();
    });

    it('should apply default variant (primary) and size (md)', () => {
      const { container } = render(<Button>Default</Button>);
      const button = container.querySelector('button');
      
      expect(button?.className).toContain('primary');
      expect(button?.className).toContain('md');
    });
  });

  describe('Variants', () => {
    it('should apply primary variant class', () => {
      const { container } = render(<Button variant="primary">Primary</Button>);
      const button = container.querySelector('button');
      
      expect(button?.className).toContain('primary');
    });

    it('should apply secondary variant class', () => {
      const { container } = render(<Button variant="secondary">Secondary</Button>);
      const button = container.querySelector('button');
      
      expect(button?.className).toContain('secondary');
    });

    it('should apply danger variant class', () => {
      const { container } = render(<Button variant="danger">Danger</Button>);
      const button = container.querySelector('button');
      
      expect(button?.className).toContain('danger');
    });

    it('should apply outline variant class', () => {
      const { container } = render(<Button variant="outline">Outline</Button>);
      const button = container.querySelector('button');
      
      expect(button?.className).toContain('outline');
    });
  });

  describe('Sizes', () => {
    it('should apply small size class', () => {
      const { container } = render(<Button size="sm">Small</Button>);
      const button = container.querySelector('button');
      
      expect(button?.className).toContain('sm');
    });

    it('should apply medium size class', () => {
      const { container } = render(<Button size="md">Medium</Button>);
      const button = container.querySelector('button');
      
      expect(button?.className).toContain('md');
    });

    it('should apply large size class', () => {
      const { container } = render(<Button size="lg">Large</Button>);
      const button = container.querySelector('button');
      
      expect(button?.className).toContain('lg');
    });
  });

  describe('States', () => {
    it('should be enabled by default', () => {
      render(<Button>Enabled</Button>);
      const button = screen.getByRole('button');
      
      expect(button).toBeEnabled();
    });

    it('should be disabled when disabled prop is true', () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole('button');
      
      expect(button).toBeDisabled();
    });

    it('should show loading state with spinner', () => {
      const { container } = render(<Button isLoading>Loading</Button>);
      const spinner = container.querySelector('.spinner');
      
      expect(spinner).toBeInTheDocument();
      expect(screen.getByText('Loading')).toBeInTheDocument();
    });

    it('should be disabled when isLoading is true', () => {
      render(<Button isLoading>Loading</Button>);
      const button = screen.getByRole('button');
      
      expect(button).toBeDisabled();
    });

    it('should apply loading class when isLoading', () => {
      const { container } = render(<Button isLoading>Loading</Button>);
      const button = container.querySelector('button');
      
      expect(button?.className).toContain('loading');
    });
  });

  describe('Modifiers', () => {
    it('should apply fullWidth class when fullWidth is true', () => {
      const { container } = render(<Button fullWidth>Full Width</Button>);
      const button = container.querySelector('button');
      
      expect(button?.className).toContain('fullWidth');
    });

    it('should not apply fullWidth class by default', () => {
      const { container } = render(<Button>Normal Width</Button>);
      const button = container.querySelector('button');
      
      expect(button?.className).not.toContain('fullWidth');
    });

    it('should merge custom className with button classes', () => {
      const { container } = render(<Button className="custom-class">Custom</Button>);
      const button = container.querySelector('button');
      
      expect(button?.className).toContain('button');
      expect(button?.className).toContain('custom-class');
    });
  });

  describe('Interactions', () => {
    it('should call onClick handler when clicked', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      
      render(<Button onClick={handleClick}>Click me</Button>);
      
      await user.click(screen.getByRole('button'));
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      
      render(<Button onClick={handleClick} disabled>Disabled</Button>);
      
      await user.click(screen.getByRole('button'));
      
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('should not call onClick when loading', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      
      render(<Button onClick={handleClick} isLoading>Loading</Button>);
      
      await user.click(screen.getByRole('button'));
      
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('HTML Attributes', () => {
    it('should accept and apply type attribute', () => {
      render(<Button type="submit">Submit</Button>);
      const button = screen.getByRole('button');
      
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('should accept and apply form attribute', () => {
      render(<Button form="my-form">Submit Form</Button>);
      const button = screen.getByRole('button');
      
      expect(button).toHaveAttribute('form', 'my-form');
    });

    it('should accept and apply aria-label', () => {
      render(<Button aria-label="Close dialog">X</Button>);
      const button = screen.getByRole('button', { name: 'Close dialog' });
      
      expect(button).toBeInTheDocument();
    });

    it('should accept and apply data attributes', () => {
      render(<Button data-testid="custom-button">Data Attr</Button>);
      
      expect(screen.getByTestId('custom-button')).toBeInTheDocument();
    });

    it('should accept and apply id attribute', () => {
      render(<Button id="my-button">ID Button</Button>);
      const button = screen.getByRole('button');
      
      expect(button).toHaveAttribute('id', 'my-button');
    });
  });

  describe('Edge Cases', () => {
    it('should handle multiple variant and size combinations', () => {
      const { container } = render(
        <Button variant="danger" size="lg">
          Large Danger
        </Button>
      );
      const button = container.querySelector('button');
      
      expect(button?.className).toContain('danger');
      expect(button?.className).toContain('lg');
    });

    it('should handle all modifiers together', () => {
      const { container } = render(
        <Button 
          variant="secondary" 
          size="sm" 
          fullWidth 
          isLoading 
          className="custom"
        >
          All Modifiers
        </Button>
      );
      const button = container.querySelector('button');
      
      expect(button?.className).toContain('secondary');
      expect(button?.className).toContain('sm');
      expect(button?.className).toContain('fullWidth');
      expect(button?.className).toContain('loading');
      expect(button?.className).toContain('custom');
    });

    it('should render with empty string children', () => {
      render(<Button>{''}</Button>);
      
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should render with number children', () => {
      render(<Button>{0}</Button>);
      
      expect(screen.getByRole('button', { name: '0' })).toBeInTheDocument();
    });

    it('should prioritize isLoading over disabled for button state', () => {
      render(<Button disabled={false} isLoading>Loading</Button>);
      const button = screen.getByRole('button');
      
      // Should be disabled because of isLoading even though disabled={false}
      expect(button).toBeDisabled();
    });
  });

  describe('Accessibility', () => {
    it('should be keyboard accessible', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      
      render(<Button onClick={handleClick}>Keyboard</Button>);
      const button = screen.getByRole('button');
      
      button.focus();
      expect(button).toHaveFocus();
      
      await user.keyboard('{Enter}');
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should be keyboard accessible with Space key', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      
      render(<Button onClick={handleClick}>Space Key</Button>);
      const button = screen.getByRole('button');
      
      button.focus();
      await user.keyboard(' ');
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should not be keyboard accessible when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = jest.fn();
      
      render(<Button onClick={handleClick} disabled>Disabled</Button>);
      const button = screen.getByRole('button');
      
      button.focus();
      await user.keyboard('{Enter}');
      
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('should have button role', () => {
      render(<Button>Role Check</Button>);
      
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should support aria-pressed for toggle buttons', () => {
      render(<Button aria-pressed={true}>Toggle Active</Button>);
      const button = screen.getByRole('button');
      
      expect(button).toHaveAttribute('aria-pressed', 'true');
    });

    it('should support aria-expanded for disclosure buttons', () => {
      render(<Button aria-expanded={false}>Disclosure</Button>);
      const button = screen.getByRole('button');
      
      expect(button).toHaveAttribute('aria-expanded', 'false');
    });
  });
});
