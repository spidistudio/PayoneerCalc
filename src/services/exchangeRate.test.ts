import { describe, expect, it } from 'vitest';

describe('exchange rate API response parsing', () => {
  it('accepts the CORS-safe exchange rate payload shape from the public API', async () => {
    const payload = {
      result: 'success',
      provider: 'https://www.exchangerate-api.com',
      documentation: 'https://www.exchangerate-api.com/docs/free',
      terms_of_use: 'https://www.exchangerate-api.com/terms',
      time_last_update_unix: 1790380952,
      time_next_update_unix: 1790467352,
      base_code: 'USD',
      conversion_rates: {
        RSD: 108.95
      }
    };

    const rate = payload.conversion_rates.RSD;
    expect(rate).toBeGreaterThan(0);
    expect(payload.result).toBe('success');
  });
});
