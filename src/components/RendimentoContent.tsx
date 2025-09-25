"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import { calculateInvestmentComparison, formatCurrency } from "@/utils";

const RendimentoContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialInvestment = searchParams.get("initialInvestment") || "";
  const monthlyInvestment = searchParams.get("monthlyInvestment") || "";
  const timeInvestment = searchParams.get("timeInvestment") || "";

  useEffect(() => {
    // Apenas o tempo de investimento é obrigatório
    if (!timeInvestment) {
      router.push("/");
      return;
    }

    // Trata valores vazios como 0
    const initialValue = initialInvestment
      ? parseFloat(initialInvestment.replace(/[^0-9.,]/g, "").replace(",", "."))
      : 0;
    const monthlyValue = monthlyInvestment
      ? parseFloat(monthlyInvestment.replace(/[^0-9.,]/g, "").replace(",", "."))
      : 0;
    const timeValue = parseFloat(
      timeInvestment.replace(/[^0-9.,]/g, "").replace(",", "."),
    );

    // Valida se pelo menos um investimento foi informado e se o tempo é válido
    if (
      isNaN(timeValue) ||
      timeValue <= 0 ||
      (initialValue === 0 && monthlyValue === 0)
    ) {
      router.push("/");
    }
  }, [initialInvestment, monthlyInvestment, timeInvestment, router]);

  if (!timeInvestment) {
    return null;
  }

  const { selic, arca } = calculateInvestmentComparison(
    initialInvestment || "0",
    monthlyInvestment || "0",
    timeInvestment,
  );

  const timeInYears = parseFloat(
    timeInvestment.replace(/[^0-9.,]/g, "").replace(",", "."),
  );
  const months = Math.round(timeInYears * 12);

  return (
    <section className="bg-[#F6F6F6] rounded-lg p-6 md:p-8 lg:p-10">
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-6">
        Resultado:
      </h1>

      <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-black mb-8">
        Em {months} meses você teria:
      </p>

      <div className="mb-6 flex flex-col bg-white rounded-3xl p-8 gap-4">
        <span className="text-sm sm:text-base text-[#595855]">TAXA SELIC</span>
        <span className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold">
          {formatCurrency(selic)}
        </span>
      </div>

      <div className="mb-6 flex flex-col bg-white rounded-3xl p-8 gap-4">
        <Image src="/logo-arca.svg" alt="Arca" width={60} height={24} />
        <span className="text-sm sm:text-base text-[#595855]">FUNDO ARCA</span>
        <span className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold">
          {formatCurrency(arca)}
        </span>
      </div>
      <div className="h-1 bg-[#33E5B0] my-8 rounded"></div>

      <div className="flex items-center mb-5">
        <span className="taxa-title">TAXA SELIC:</span>
        <span className="taxa-percentage">9,25%</span>
      </div>
      <div className="flex items-center">
        <span className="taxa-title">RENTABILIDADE DO ARCA:</span>
        <span className="taxa-percentage">18% a.a.</span>
      </div>

      <div className="mt-6 flex items-center">
        <Image
          src="/help.svg"
          alt="Informação"
          width={25}
          height={25}
          className="mr-2 mt-1"
        />
        <p className="text-xs sm:text-base text-[#6A6A6A]">
          Valores utilizados no simulador de investimentos (referentes à data de
          última atualização - esses valores podem alterar de acordo com o
          mercado):
        </p>
      </div>
      <p className="text-xs sm:text-base text-[#6A6A6A] mt-2 ml-8">
        - Data da última atualização: {new Date().toLocaleDateString("pt-BR")}
      </p>
    </section>
  );
};

export default RendimentoContent;
