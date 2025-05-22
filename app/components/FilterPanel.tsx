'use client';

import { useState } from 'react';
import { FilterOptions } from '@/src/types';

interface FilterPanelProps {
  filters: FilterOptions;
  setFilters: (filters: FilterOptions) => void;
}

export default function FilterPanel({ filters, setFilters }: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const departments = ['情報工学科', '電気電子工学科', '機械工学科'];
  const years = [1, 2, 3, 4];

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    setFilters({
      ...filters,
      [key]: value === '' ? null : value
    });
  };

  const resetFilters = () => {
    setFilters({
      year: null,
      required: null,
      department: null
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center">
        <input
          type="text"
          placeholder="科目を検索..."
          className="flex-1 p-2 border rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
        >
          フィルター {isOpen ? '▼' : '▶'}
        </button>
      </div>

      {isOpen && (
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                学年
              </label>
              <select
                className="w-full p-2 border rounded"
                value={filters.year || ''}
                onChange={(e) => handleFilterChange('year', Number(e.target.value))}
              >
                <option value="">全て</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}年</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                科目区分
              </label>
              <select
                className="w-full p-2 border rounded"
                value={filters.required === null ? '' : filters.required.toString()}
                onChange={(e) => handleFilterChange('required', e.target.value === '' ? null : e.target.value === 'true')}
              >
                <option value="">全て</option>
                <option value="true">必修</option>
                <option value="false">選択</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                学科
              </label>
              <select
                className="w-full p-2 border rounded"
                value={filters.department || ''}
                onChange={(e) => handleFilterChange('department', e.target.value)}
              >
                <option value="">全て</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 flex justify-end">
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              フィルターをリセット
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 