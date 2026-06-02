import React from 'react'
import { useTodos } from '@/hooks/useTodos'
import AddTodo from '@/components/AddTodo'
import TodoItem from '@/components/TodoItem'
import FilterBar from '@/components/FilterBar'
import EmptyState from '@/components/EmptyState'

export default function App() {
  const {
    todos,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    activeCount,
    completedCount,
  } = useTodos()

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-slate-50 to-indigo-50 py-12 px-4">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-500 mb-1">
            My Todos
          </h1>
          <p className="text-slate-500 text-sm">Stay organised, stay productive.</p>
        </div>

        {/* Add Todo */}
        <AddTodo onAdd={addTodo} />

        {/* Filter / Search */}
        <FilterBar
          filter={filter}
          onFilterChange={setFilter}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          activeCount={activeCount}
          completedCount={completedCount}
          onClearCompleted={clearCompleted}
        />

        {/* Todo List */}
        <div className="space-y-2">
          {todos.length === 0 ? (
            <EmptyState filter={filter} searchQuery={searchQuery} />
          ) : (
            todos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
