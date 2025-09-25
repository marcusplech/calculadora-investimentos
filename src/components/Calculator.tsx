"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { parseCurrency, isValidPositiveNumber } from "../utils";
import InputText from "./InputText/InputText";
import Button from "./Button/Button";

const Calculator = () => {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const initialInvestmentStr = formData.get("initialInvestment") as string;
    const monthlyInvestmentStr = formData.get("monthlyInvestment") as string;
    const timeInvestmentStr = formData.get("timeInvestment") as string;

    // Tempo de investimento é obrigatório
    if (!timeInvestmentStr) {
      alert("Por favor, preencha o tempo de investimento.");
      return;
    }

    // Trata campos vazios como 0
    const initialAmount = initialInvestmentStr
      ? parseCurrency(initialInvestmentStr)
      : 0;
    const monthlyAmount = monthlyInvestmentStr
      ? parseCurrency(monthlyInvestmentStr)
      : 0;
    const timeInYears = parseFloat(
      timeInvestmentStr.replace(/[^0-9.,]/g, "").replace(",", "."),
    );

    // Valida se pelo menos um dos investimentos foi informado
    if (initialAmount === 0 && monthlyAmount === 0) {
      alert(
        "Por favor, informe pelo menos um valor de investimento (inicial ou mensal).",
      );
      return;
    }

    // Valida se o tempo é um número positivo
    if (!isValidPositiveNumber(timeInYears)) {
      alert("Por favor, insira um tempo de investimento válido.");
      return;
    }

    const params = new URLSearchParams({
      initialInvestment: initialAmount.toString(),
      monthlyInvestment: monthlyAmount.toString(),
      timeInvestment: timeInYears.toString(),
    });
    router.push(`/rendimento?${params.toString()}`);
  };

  return (
    <section className="bg-gray-50 px-4 py-12 sm:px-8 sm:py-16 lg:px-[120px] lg:py-[80px]">
      <div className="w-full lg:gap-[88px] gap-[44px] bg-[#F6F6F6] rounded-2xl p-6 sm:p-10 lg:p-14 mx-auto flex flex-col">
        <div className="gap-[22px]">
          <h2 className="font-semibold text-[20px] lg:text-[33px]">
            Simule agora
          </h2>
          <p className="text-[#595855] text-[16px] lg:text-[25px] font-normal">
            Faça uma comparação e comece a investir em uma experiência fácil e
            intuitiva.
          </p>
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row lg:flex-row gap-[56px]">
            <InputText
              name="initialInvestment"
              label="Investimento inicial"
              placeholder="R$ 0,00"
              type="currency"
            />

            <InputText
              name="monthlyInvestment"
              label="Investimento mensal"
              placeholder="R$ 0,00"
              type="currency"
            />

            <InputText
              name="timeInvestment"
              label="Quanto tempo deixaria seu dinheiro investido?"
              placeholder="1 ano"
              type="years"
            />
          </div>

          <div className="flex justify-end mt-[44px] lg:mt-[88px]">
            <Button
              icon="/arrow_right_alt.svg"
              type="submit"
              className="w-full sm:w-auto"
            >
              Calcular
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Calculator;
