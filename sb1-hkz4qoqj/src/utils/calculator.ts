import { ExchangeRateResponse, CalculationResult } from '../types';

const PAYONEER_FEE = 3.15;
const EXCHANGE_RATE_MULTIPLIER = 0.962; // 3.8% reduction

export const calculateConversion = (
  amount: number,
  exchangeData: ExchangeRateResponse
): CalculationResult => {
  const middleRate = Math.round(exchangeData.exchange_middle * 100) / 100;
  const finalAmount = amount - PAYONEER_FEE;
  const finalRate = middleRate * EXCHANGE_RATE_MULTIPLIER;
  const finalResult = Math.round(finalAmount * finalRate * 100) / 100;

  return {
    date: exchangeData.date,
    middleRate,
    finalAmount: finalResult,
    inputAmount: amount
  };
};