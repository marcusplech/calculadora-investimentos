import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputText from './InputText';

// Mock da função formatCurrency
jest.mock('../../utils', () => ({
  formatCurrency: jest.fn((value: number) => `R$ ${value.toFixed(2).replace('.', ',')}`),
}));

describe('InputText Component', () => {
  const defaultProps = {
    label: 'Test Label',
    name: 'test-input',
  };

  it('renders with basic props', () => {
    render(<InputText {...defaultProps} />);
    
    const label = screen.getByText('Test Label');
    const input = screen.getByRole('textbox');
    
    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('name', 'test-input');
    expect(input).toHaveAttribute('id', 'test-input');
  });

  it('renders with placeholder', () => {
    render(<InputText {...defaultProps} placeholder="Enter text here" />);
    
    const input = screen.getByPlaceholderText('Enter text here');
    expect(input).toBeInTheDocument();
  });

  it('renders with initial value', () => {
    render(<InputText {...defaultProps} value="Initial value" />);
    
    const input = screen.getByDisplayValue('Initial value');
    expect(input).toBeInTheDocument();
  });

  it('handles text input changes', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    
    render(
      <InputText
        {...defaultProps}
        type="text"
        onChange={handleChange}
      />
    );
    
    const input = screen.getByRole('textbox');
    await user.type(input, 'Hello World');
    
    expect(handleChange).toHaveBeenCalledWith('Hello World');
  });

  it('handles currency input formatting', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    
    render(
      <InputText
        {...defaultProps}
        type="currency"
        onChange={handleChange}
      />
    );
    
    const input = screen.getByRole('textbox');
    await user.type(input, '12345');
    
    // Verifica se a função de formatação foi chamada
    expect(handleChange).toHaveBeenCalledWith('123.45');
  });

  it('handles years input formatting - singular', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    
    render(
      <InputText
        {...defaultProps}
        type="years"
        onChange={handleChange}
      />
    );
    
    const input = screen.getByRole('textbox');
    await user.type(input, '1');
    
    expect(input).toHaveDisplayValue('1 ano');
    expect(handleChange).toHaveBeenCalledWith('1');
  });

  it('handles years input formatting - plural', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    
    render(
      <InputText
        {...defaultProps}
        type="years"
        onChange={handleChange}
      />
    );
    
    const input = screen.getByRole('textbox');
    await user.type(input, '5');
    
    expect(input).toHaveDisplayValue('5 anos');
    expect(handleChange).toHaveBeenCalledWith('5');
  });

  it('handles years input backspace correctly', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    
    render(
      <InputText
        {...defaultProps}
        type="years"
        onChange={handleChange}
        value="12"
      />
    );
    
    const input = screen.getByRole('textbox');
    
    // Simula backspace
    await user.clear(input);
    await user.type(input, '12');
    
    // Posiciona o cursor no final e apaga um caractere
    fireEvent.change(input, { target: { value: '1 ano' } });
    
    expect(handleChange).toHaveBeenCalledWith('1');
  });

  it('clears years input when empty', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    
    render(
      <InputText
        {...defaultProps}
        type="years"
        onChange={handleChange}
      />
    );
    
    const input = screen.getByRole('textbox');
    await user.type(input, '5');
    await user.clear(input);
    
    expect(input).toHaveDisplayValue('');
    expect(handleChange).toHaveBeenCalledWith('');
  });

  it('applies custom className', () => {
    render(<InputText {...defaultProps} className="custom-class" />);
    
    const container = screen.getByText('Test Label').parentElement;
    expect(container).toHaveClass('custom-class');
  });

  it('works with forwardRef', () => {
    const ref = React.createRef<HTMLInputElement>();
    
    render(<InputText {...defaultProps} ref={ref} />);
    
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current?.name).toBe('test-input');
  });

  it('handles number type input', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    
    render(
      <InputText
        {...defaultProps}
        type="number"
        onChange={handleChange}
      />
    );
    
    const input = screen.getByRole('textbox');
    await user.type(input, '123');
    
    expect(handleChange).toHaveBeenCalledWith('123');
  });

  it('has correct accessibility attributes', () => {
    render(<InputText {...defaultProps} />);
    
    const label = screen.getByText('Test Label');
    const input = screen.getByRole('textbox');
    
    expect(label).toHaveAttribute('for', 'test-input');
    expect(input).toHaveAttribute('id', 'test-input');
  });

  it('handles focus and blur events', async () => {
    const user = userEvent.setup();
    
    render(<InputText {...defaultProps} />);
    
    const input = screen.getByRole('textbox');
    
    await user.click(input);
    expect(input).toHaveFocus();
    
    await user.tab();
    expect(input).not.toHaveFocus();
  });

  it('filters non-numeric characters in currency type', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    
    render(
      <InputText
        {...defaultProps}
        type="currency"
        onChange={handleChange}
      />
    );
    
    const input = screen.getByRole('textbox');
    await user.type(input, 'abc123def');
    
    // Apenas os números devem ser processados
    expect(handleChange).toHaveBeenCalledWith('1.23');
  });

  it('filters non-numeric characters in years type', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    
    render(
      <InputText
        {...defaultProps}
        type="years"
        onChange={handleChange}
      />
    );
    
    const input = screen.getByRole('textbox');
    await user.type(input, 'abc5def');
    
    expect(input).toHaveDisplayValue('5 anos');
    expect(handleChange).toHaveBeenCalledWith('5');
  });
});