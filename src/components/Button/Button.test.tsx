import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../Button';

// Mock do Next.js Image component
interface MockImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

jest.mock('next/image', () => {
  return function MockImage({ src, alt, width, height }: MockImageProps) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        data-testid="button-icon"
      />
    );
  };
});

describe('Button Component', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>);
    
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-[#33E5B0]'); // primary variant
    expect(button).toHaveClass('text-[25px]'); // lg size
  });

  it('renders with primary variant', () => {
    render(<Button variant="primary">Primary Button</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-[#33E5B0]');
    expect(button).toHaveClass('hover:bg-[#2DD4A0]');
    expect(button).toHaveClass('text-[#21211F]');
  });

  it('renders with secondary variant', () => {
    render(<Button variant="secondary">Secondary Button</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-gray-200');
    expect(button).toHaveClass('hover:bg-gray-300');
    expect(button).toHaveClass('text-gray-800');
  });

  it('renders with small size', () => {
    render(<Button size="sm">Small Button</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('text-sm');
    expect(button).toHaveClass('h-10');
    expect(button).toHaveClass('px-4');
    expect(button).toHaveClass('py-2');
  });

  it('renders with medium size', () => {
    render(<Button size="md">Medium Button</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('text-lg');
    expect(button).toHaveClass('h-12');
    expect(button).toHaveClass('px-6');
    expect(button).toHaveClass('py-3');
  });

  it('renders with large size', () => {
    render(<Button size="lg">Large Button</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('text-[25px]');
    expect(button).toHaveClass('h-[78px]');
    expect(button).toHaveClass('px-8');
    expect(button).toHaveClass('py-4');
  });

  it('renders with icon', () => {
    render(
      <Button icon="/test-icon.svg" iconWidth={24} iconHeight={24}>
        Button with Icon
      </Button>
    );
    
    const button = screen.getByRole('button');
    const icon = screen.getByTestId('button-icon');
    
    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('src', '/test-icon.svg');
    expect(icon).toHaveAttribute('width', '24');
    expect(icon).toHaveAttribute('height', '24');
  });

  it('renders with custom className', () => {
    render(<Button className="custom-class">Custom Button</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('handles disabled state', () => {
    render(<Button disabled>Disabled Button</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clickable Button</Button>);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} disabled>
        Disabled Button
      </Button>
    );
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('passes through additional props', () => {
    render(
      <Button data-testid="custom-button" aria-label="Custom aria label">
        Button with Props
      </Button>
    );
    
    const button = screen.getByTestId('custom-button');
    expect(button).toHaveAttribute('aria-label', 'Custom aria label');
  });

  it('applies focus styles', () => {
    render(<Button>Focus Button</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('focus:outline-none');
    expect(button).toHaveClass('focus:ring-2');
    expect(button).toHaveClass('focus:ring-offset-2');
  });
});