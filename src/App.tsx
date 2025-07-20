import React, { useState, useEffect } from 'react';
import { CreditCard, Calculator } from 'lucide-react';
import { useTheme } from './hooks/useTheme';
import { fetchExchangeRate } from './services/exchangeRate';
import { calculateConversion } from './utils/calculator';
import { ThemeToggle } from './components/ThemeToggle';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { ResultCard } from './components/ResultCard';
import { CalculationResult, ExchangeRateResponse } from './types';

function App() {
  const { isDark, toggleTheme } = useTheme();
  const [amount, setAmount] = useState<string>('1500');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [exchangeData, setExchangeData] = useState<ExchangeRateResponse | null>(null);

  const loadExchangeRate = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchExchangeRate();
      setExchangeData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleCalculate = () => {
    const numAmount = parseFloat(amount);
    
    if (isNaN(numAmount) || numAmount <= 0) {
      setError('Please enter a valid amount greater than 0');
      return;
    }

    if (numAmount <= 3.15) {
      setError('Amount must be greater than the Payoneer fee (3.15 USD)');
      return;
    }

    if (!exchangeData) {
      setError('Exchange rate data not available. Please refresh.');
      return;
    }

    setError(null);
    const calculationResult = calculateConversion(numAmount, exchangeData);
    setResult(calculationResult);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  useEffect(() => {
    loadExchangeRate();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Payoneer Calculator
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  USD to RSD Conversion
                </p>
              </div>
            </div>
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
            <div className="flex items-center mb-6">
              <Calculator className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Enter Amount
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Amount in USD
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 dark:text-gray-400 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    id="amount"
                    value={amount}
                    onChange={handleAmountChange}
                    onKeyPress={handleKeyPress}
                    className="block w-full pl-7 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 text-lg"
                    placeholder="1500.00"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 dark:text-gray-400 sm:text-sm">USD</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCalculate}
                disabled={loading || !exchangeData}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <LoadingSpinner />
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    <Calculator className="w-4 h-4" />
                    <span>Calculate</span>
                  </>
                )}
              </button>

              {!exchangeData && !loading && (
                <div className="text-center">
                  <button
                    onClick={loadExchangeRate}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm underline"
                  >
                    Refresh exchange rate
                  </button>
                </div>
              )}
            </div>

            {/* Fee Information */}
            <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200 mb-2">
                Fee Information
              </h3>
              <div className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
                <p>• Payoneer fee: $3.15 USD</p>
                <p>• Exchange rate: -3.8% from middle rate</p>
                <p>• Calculation: (Amount - $3.15) × (Rate × 0.962)</p>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {error && <ErrorMessage message={error} onRetry={loadExchangeRate} />}
            {result && <ResultCard result={result} />}
            
            {!result && !error && (
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 shadow-sm text-center">
                <Calculator className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Ready to Calculate
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Enter an amount and click calculate to see your conversion result.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Exchange rates provided by kurs.resenje.org • Updated daily</p>
        </footer>
      </main>

      {/* Fiverr Credit */}
      <div className="fixed bottom-4 right-4 text-xs text-green-400 dark:text-green-500 bg-white dark:bg-gray-800 px-2 py-1 rounded shadow-sm border border-green-200 dark:border-green-700">
        <a href="https://www.fiverr.com/milan_code" target="_blank">Fiverr: milan_code</a>
      </div>
    </div>
  );
}

export default App;