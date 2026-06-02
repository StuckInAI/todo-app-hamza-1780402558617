import React from 'react'
import type { FilterType } from '@/types/todo'

interface FilterBarProps {
  filter: FilterType
  onFilterChange: (filter: FilterType) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  activeCount: number
  completedCount: number
  onClearCompleted: () => void
}

const filters: { label: string; value: FilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
]

export default function FilterBar({
  filter,
  onFilterChange,
  searchQuery,
  onSearchChange,
  activeCount,
  completedCount,
  onClearCompleted,
}: FilterBarProps) {
  return (
    <div className="mb-5 space-y-3">
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          placeholder="Search todos..."
          className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400 text-slate-700 placeholder-slate-400 text-sm transition"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
          {filters.map(f => (
            <button
              key={f.value}
              onClick={() => onFilterChange(f.value)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
                filter === f.value
                  ? 'bg-white text-violet-600 shadow'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-500">
            <span className="font-semibold text-slate-700">{activeCount}</span> left
          </span>
          {completedCount > 0 && (
            <button
              onClick={onClearCompleted}
              className="text-xs text-rose-400 hover:text-rose-600 font-medium transition"
            >
              Clear {completedCount} done
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
