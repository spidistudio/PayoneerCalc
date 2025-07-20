import { ExchangeRateResponse } from '../types';

const EXCHANGE_RATE_URL = '/proxy-api/v1/currencies/usd/rates/today';

export const fetchExchangeRate = async (): Promise<ExchangeRateResponse> => {
  try {
    const response = await fetch(EXCHANGE_RATE_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data || !data.exchange_middle || !data.date) {
      throw new Error('No exchange rate data available');
    }
    return data;
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    throw new Error('Failed to fetch exchange rate. Please try again.');
  }
};
