"use client";
import React, { useState, ChangeEvent, forwardRef } from "react";
import { formatCurrency as formatCurrencyUtil } from "../../utils";

interface InputTextProps {
  label: string;
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  type?: "currency" | "text" | "number" | "years";
  className?: string;
}

const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  (
    {
      label,
      name,
      value = "",
      onChange,
      placeholder = "",
      type = "text",
      className = "",
    },
    ref,
  ) => {
    const [displayValue, setDisplayValue] = useState(value);

    const formatCurrency = (value: string): string => {
      const numbers = value.replace(/\D/g, "");

      if (!numbers) return "";

      const amount = parseInt(numbers) / 100;

      return formatCurrencyUtil(amount);
    };

    const formatYears = (value: string): string => {
      const numbers = value.replace(/\D/g, "");

      if (!numbers) return "";

      const numericValue = parseInt(numbers);

      if (numericValue === 1) {
        return `${numericValue} ano`;
      } else {
        return `${numericValue} anos`;
      }
    };

    const handleYearsInput = (
      inputValue: string,
      currentDisplayValue: string,
    ): { display: string; rawValue: string } => {
      // Se o usuário está apagando (backspace/delete)
      if (inputValue.length < currentDisplayValue.length) {
        // Extrai apenas os números do valor atual
        const currentNumbers = currentDisplayValue.replace(/\D/g, "");

        // Se não há números ou o usuário apagou tudo, limpa o campo
        if (!currentNumbers || currentNumbers.length <= 1) {
          return { display: "", rawValue: "" };
        }

        // Remove o último dígito
        const newNumbers = currentNumbers.slice(0, -1);
        const formatted = formatYears(newNumbers);
        return { display: formatted, rawValue: newNumbers };
      }

      // Comportamento normal para adição de caracteres
      const numbers = inputValue.replace(/\D/g, "");
      if (!numbers) return { display: "", rawValue: "" };

      const formatted = formatYears(numbers);
      return { display: formatted, rawValue: numbers };
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;

      if (type === "currency") {
        const formatted = formatCurrency(inputValue);
        setDisplayValue(formatted);

        const numbers = inputValue.replace(/\D/g, "");
        const numericValue = numbers
          ? (parseInt(numbers) / 100).toString()
          : "";
        onChange?.(numericValue);
      } else if (type === "years") {
        // Se o campo está vazio, permite limpar
        if (inputValue === "") {
          setDisplayValue("");
          onChange?.("");
          return;
        }

        const { display, rawValue } = handleYearsInput(
          inputValue,
          displayValue,
        );
        setDisplayValue(display);
        onChange?.(rawValue);
      } else {
        setDisplayValue(inputValue);
        onChange?.(inputValue);
      }
    };

    return (
      <div className={`flex flex-col gap-2.5 flex-1 ${className}`}>
        <label
          htmlFor={name}
          className="text-base sm:text-[14px] md:text-xl lg:text-[18px] font-normal text-[#595855] leading-tight break-words"
        >
          {label}
        </label>
        <input
          ref={ref}
          type="text"
          id={name}
          name={name}
          value={displayValue}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full h-[77px] px-4 border border-[#DDDCE0] rounded-lg focus:ring-2  outline-none transition-colors text-gray-900 bg-white text-sm lg:text-xl"
        />
      </div>
    );
  },
);

InputText.displayName = "InputText";

export default InputText;
