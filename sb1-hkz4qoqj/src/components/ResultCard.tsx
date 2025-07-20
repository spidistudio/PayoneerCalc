import React from 'react';
import { Calendar, TrendingUp, DollarSign } from 'lucide-react';
import { CalculationResult } from '../types';

interface ResultCardProps {
  result: CalculationResult;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Conversion Result
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" />
            <span className="text-sm text-gray-600 dark:text-gray-300">Date</span>
          </div>
          <span className="font-medium text-gray-900 dark:text-white">{result.date}</span>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <div className="flex items-center">
            <TrendingUp className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" />
            <span className="text-sm text-gray-600 dark:text-gray-300">Middle Rate USD</span>
          </div>
          <span className="font-medium text-gray-900 dark:text-white">{result.middleRate}</span>
        </div>

        <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center">
            <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
            <span className="font-medium text-blue-900 dark:text-blue-200">Final Amount</span>
          </div>
          <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
            {result.finalAmount.toLocaleString()} RSD
          </span>
        </div>
      </div>
    </div>
  );
};