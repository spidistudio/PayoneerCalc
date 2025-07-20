export interface ExchangeRateResponse {
  exchange_middle: number;
  date: string;
}

export interface CalculationResult {
  date: string;
  middleRate: number;
  finalAmount: number;
  inputAmount: number;
}