import React, { useState } from 'react'
import type { Todo } from '@/types/todo'

interface TodoItemProps {
  todo: Todo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, text: string) => void
}

const priorityConfig = {
  low: { label: 'Low', classes: 'bg-emerald-100 text-emerald-700' },
  medium: { label: 'Med', classes: 'bg-amber-100 text-amber-700' },
  high: { label: 'High', classes: 'bg-rose-100 text-rose-700' },
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [editing, setEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!editText.trim()) return
    onEdit(todo.id, editText)
    setEditing(false)
  }

  const handleEditKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setEditText(todo.text)
      setEditing(false)
    }
  }

  const pc = priorityConfig[todo.priority]

  return (
    <div
      className={`group flex items-center gap-3 px-4 py-3 rounded-xl bg-white border transition shadow-sm hover:shadow-md ${
        todo.completed ? 'border-slate-100 opacity-60' : 'border-slate-200'
      }`}
    >
      <button
        onClick={() => onToggle(todo.id)}
        className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition ${
          todo.completed
            ? 'bg-violet-500 border-violet-500'
            : 'border-slate-300 hover:border-violet-400'
        }`}
        aria-label="Toggle complete"
      >
        {todo.completed && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {editing ? (
        <form onSubmit={handleEditSubmit} className="flex-1 flex gap-2">
          <input
            autoFocus
            value={editText}
            onChange={e => setEditText(e.target.value)}
            onKeyDown={handleEditKeyDown}
            className="flex-1 px-2 py-1 rounded-lg border border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400 text-slate-700 text-sm"
          />
          <button type="submit" className="px-3 py-1 bg-violet-500 text-white text-sm rounded-lg hover:bg-violet-600 transition">
            Save
          </button>
          <button
            type="button"
            onClick={() => { setEditText(todo.text); setEditing(false) }}
            className="px-3 py-1 bg-slate-100 text-slate-600 text-sm rounded-lg hover:bg-slate-200 transition"
          >
            Cancel
          </button>
        </form>
      ) : (
        <span
          onDoubleClick={() => !todo.completed && setEditing(true)}
          className={`flex-1 text-sm select-none cursor-default ${
            todo.completed ? 'line-through text-slate-400' : 'text-slate-700'
          }`}
        >
          {todo.text}
        </span>
      )}

      <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${pc.classes}`}>
        {pc.label}
      </span>

      {!editing && (
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
          {!todo.completed && (
            <button
              onClick={() => setEditing(true)}
              className="p-1 text-slate-400 hover:text-violet-500 transition"
              aria-label="Edit"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H9v-2a2 2 0 01.586-1.414z" />
              </svg>
            </button>
          )}
          <button
            onClick={() => onDelete(todo.id)}
            className="p-1 text-slate-400 hover:text-rose-500 transition"
            aria-label="Delete"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
