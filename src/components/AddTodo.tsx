import React, { useState } from 'react'
import type { Priority } from '@/types/todo'

interface AddTodoProps {
  onAdd: (text: string, priority: Priority) => void
}

export default function AddTodo({ onAdd }: AddTodoProps) {
  const [text, setText] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return
    onAdd(text, priority)
    setText('')
    setPriority('medium')
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="What needs to be done?"
        className="flex-1 px-4 py-2 rounded-xl border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400 text-slate-700 placeholder-slate-400 transition"
      />
      <select
        value={priority}
        onChange={e => setPriority(e.target.value as Priority)}
        className="px-3 py-2 rounded-xl border border-slate-200 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400 text-slate-600 text-sm transition"
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button
        type="submit"
        className="px-5 py-2 bg-violet-500 hover:bg-violet-600 text-white font-semibold rounded-xl shadow transition active:scale-95"
      >
        Add
      </button>
    </form>
  )
}
