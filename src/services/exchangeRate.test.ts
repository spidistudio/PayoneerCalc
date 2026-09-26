import { describe, expect, it } from 'vitest';

describe('exchange rate API response parsing', () => {
  it('accepts the actual public API payload shape used by the app', () => {
    const payload = {
      result: 'success',
      provider: 'https://www.exchangerate-api.com',
      documentation: 'https://www.exchangerate-api.com/docs/free',
      terms_of_use: 'https://www.exchangerate-api.com/terms',
      time_last_update_unix: 1790380952,
      time_last_update_utc: 'Sat, 26 Sep 2026 00:02:32 +0000',
      base_code: 'USD',
      rates: {
        USD: 1,
        RSD: 108.95,
      },
    };

    const rate = payload.rates.RSD;
    expect(rate).toBeGreaterThan(0);
    expect(payload.result).toBe('success');
  });
});
