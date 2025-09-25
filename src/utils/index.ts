/**
 * Funções utilitárias para a calculadora de investimentos
 */

/**
 * Formata um número como moeda brasileira
 * @param value - Valor numérico a ser formatado
 * @returns String formatada como moeda (R$ 1.234,56)
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

/**
 * Calcula o valor final considerando taxa anual, valor inicial, aportes mensais e dias úteis
 * @param annualRate - Taxa anual (decimal, ex: 0.1 para 10%)
 * @param principal - Valor inicial
 * @param monthlyContribution - Aporte mensal
 * @param months - Número de meses
 * @returns Valor final
 */
export const calculateCompoundInterest = (
  annualRate: number,
  principal: number,
  monthlyContribution: number,
  months: number,
): number => {
  const businessDaysPerYear = 252;
  const businessDaysPerMonth = businessDaysPerYear / 12;
  const dailyRate = Math.pow(1 + annualRate, 1 / businessDaysPerYear);

  let amount = principal;

  for (let m = 1; m <= months; m++) {
    amount *= Math.pow(dailyRate, businessDaysPerMonth);

    amount += monthlyContribution;
  }

  return amount;
};

/**
 * Valida se um valor é um número válido e positivo
 * @param value - Valor a ser validado
 * @returns true se o valor é válido
 */
export const isValidPositiveNumber = (value: unknown): boolean => {
  const num = Number(value);
  return !isNaN(num) && num > 0 && isFinite(num);
};

/**
 * Converte string de moeda para número
 * @param currencyString - String no formato "R$ 1.234,56"
 * @returns Número correspondente
 */
export const parseCurrency = (currencyString: string): number => {
  return Number(
    currencyString
      .replace(/[R$\s]/g, "")
      .replace(/\./g, "")
      .replace(",", "."),
  );
};

/**
 * Calcula comparação de investimentos entre Selic e Fundo Arca
 * @param initialInvestmentStr - Investimento inicial como string (ex: "R$ 10.000,00")
 * @param monthlyInvestmentStr - Aporte mensal como string (ex: "R$ 1.000,00")
 * @param timeInvestmentStr - Tempo em anos como string (ex: "2")
 * @returns Objeto com montantes finais da Selic e Fundo Arca
 */
export const calculateInvestmentComparison = (
  initialInvestmentStr: string,
  monthlyInvestmentStr: string,
  timeInvestmentStr: string,
): { selic: number; arca: number } => {
  const initialAmount = parseCurrency(initialInvestmentStr);
  const monthlyContribution = parseCurrency(monthlyInvestmentStr);
  const timeInYears = parseFloat(
    timeInvestmentStr.replace(/[^0-9.,]/g, "").replace(",", "."),
  );
  const months = Math.round(timeInYears * 12);

  if (!isValidPositiveNumber(timeInYears)) {
    console.error("❌ Valores inválidos fornecidos");
    return { selic: 0, arca: 0 };
  }

  const selicRate = parseFloat(process.env.SELIC_ANNUAL_RATE || "0.0925");
  const arcaRate = parseFloat(process.env.ARCA_ANNUAL_RATE || "0.18");

  const selicFinalAmount = calculateCompoundInterest(
    selicRate,
    initialAmount,
    monthlyContribution,
    months,
  );

  const arcaFinalAmount = calculateCompoundInterest(
    arcaRate,
    initialAmount,
    monthlyContribution,
    months,
  );

  return {
    selic: selicFinalAmount,
    arca: arcaFinalAmount,
  };
};
