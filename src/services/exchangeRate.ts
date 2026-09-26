import { ExchangeRateResponse } from '../types';

const EXCHANGE_RATE_URL = 'https://open.er-api.com/v6/latest/USD';

type ExchangeRateApiResponse = {
  result?: string;
  time_last_update_utc?: string;
  time_last_update_unix?: number;
  conversion_rates?: Record<string, number>;
  exchange_middle?: number;
  date?: string;
  rates?: Record<string, number>;
};

export const normalizeExchangeRate = (
  payload: ExchangeRateApiResponse
): ExchangeRateResponse => {
  const rate =
    payload.exchange_middle ??
    payload.conversion_rates?.RSD ??
    payload.rates?.RSD ??
    payload.rates?.rsd;

  if (typeof rate !== 'number' || !Number.isFinite(rate) || rate <= 0) {
    throw new Error('No exchange rate data available');
  }

  const date =
    payload.date ||
    payload.time_last_update_utc ||
    new Date(
      payload.time_last_update_unix ? payload.time_last_update_unix * 1000 : Date.now()
    ).toISOString();

  return {
    exchange_middle: Number(rate),
    date: String(date),
  };
};

export const fetchExchangeRate = async (): Promise<ExchangeRateResponse> => {
  try {
    const response = await fetch(EXCHANGE_RATE_URL, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = (await response.json()) as ExchangeRateApiResponse;

    if (data.result && data.result !== 'success') {
      throw new Error('Exchange rate API returned an unsuccessful result');
    }

    return normalizeExchangeRate(data);
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    throw new Error('Failed to fetch exchange rate. Please try again.');
  }
};
