import { ExchangeRateResponse } from '../types';

// Use different URLs based on environment
const isDevelopment = import.meta.env.DEV;
const EXCHANGE_RATE_URL = isDevelopment 
  ? '/proxy-api/v1/currencies/usd/rates/today'
  : 'https://api.allorigins.win/get?url=' + encodeURIComponent('https://kurs.resenje.org/api/v1/currencies/usd/rates/today');

export const fetchExchangeRate = async (): Promise<ExchangeRateResponse> => {
  try {
    const response = await fetch(EXCHANGE_RATE_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    let data = await response.json();

    // If using AllOrigins proxy in production, extract the actual data
    if (!isDevelopment && data.contents) {
      data = JSON.parse(data.contents);
    }

    if (!data || !data.exchange_middle || !data.date) {
      throw new Error('No exchange rate data available');
    }
    return data;
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    throw new Error('Failed to fetch exchange rate. Please try again.');
  }
};
