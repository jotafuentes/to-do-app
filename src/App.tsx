
import { Todos } from "./components/Todos"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { useTodos } from './hooks/useTodos'




function App(): JSX.Element {
  const {
    activeCount,
    completedCount,
    handleRemove,
    handleCompleted,
    handleFilterChange,
    handleRemoveAllCompleted,
    handleAddTodo,
    handleUpdateTitle,
    filterSelected,
    todos: filteredTodos,
  } = useTodos()

  return (
    <div className="todoapp">

      <Header onAddTodo={handleAddTodo} />

      <Todos
        todos={filteredTodos}
        onRemove={handleRemove}
        onToggleCompleted={handleCompleted}
        onUpdateTitle={handleUpdateTitle}
      />

      <Footer
        activeCount={activeCount}
        completedCount={completedCount}
        filterSelected={filterSelected}
        onClearCompleted={handleRemoveAllCompleted}
        handleFilterChange={handleFilterChange}
      />
    </div>
  )
}

export default App
