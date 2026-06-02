import React from 'react'
import type { FilterType } from '@/types/todo'

interface EmptyStateProps {
  filter: FilterType
  searchQuery: string
}

export default function EmptyState({ filter, searchQuery }: EmptyStateProps) {
  let message = ''
  let sub = ''

  if (searchQuery) {
    message = 'No results found'
    sub = `Nothing matches "${searchQuery}"`
  } else if (filter === 'active') {
    message = 'Nothing active'
    sub = 'All tasks are completed!'
  } else if (filter === 'completed') {
    message = 'Nothing completed yet'
    sub = 'Complete some tasks to see them here.'
  } else {
    message = 'No todos yet'
    sub = 'Add a task above to get started.'
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 text-slate-400">
      <svg className="w-16 h-16 mb-4 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
      <p className="text-lg font-semibold text-slate-500">{message}</p>
      <p className="text-sm mt-1">{sub}</p>
    </div>
  )
}
