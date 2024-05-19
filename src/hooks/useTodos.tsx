import { useState } from "react"
import { TODO_FILTERS } from "../consts"
import { mockTodos } from "../mockTodos"
import { type Todo as TodoType, type ListOfTodos, type FilterValue, type TodoId, type TodoTitle } from '../types'


export const useTodos = (): {
    activeCount: number
    completedCount: number
    todos: ListOfTodos
    handleRemove: ({ id }: TodoId) => void
    handleCompleted: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void
    handleFilterChange: (filter: FilterValue) => void
    handleRemoveAllCompleted: () => void
    handleAddTodo: ({ title }: TodoTitle) => void
    handleUpdateTitle: ({ id, title }: Pick<TodoType, 'id' | 'title'>) => void
    filterSelected: FilterValue



} => {
    const [todos, setTodos] = useState(mockTodos)
    const [filterSelected, setFilterSelected] = useState<FilterValue>(TODO_FILTERS.ALL)


    const handleRemove = ({ id }: TodoId): void => {
        const newTodos = todos.filter(todo => todo.id !== id)
        setTodos(newTodos)
    }

    const handleCompleted = ({ id, completed }: Pick<TodoType, 'id' | 'completed'>): void => {
        const newTodos = todos.map(todo => {
            if (todo.id === id) {
                return {
                    ...todo,
                    completed
                }
            }
            return todo
        })
        setTodos(newTodos)
    }

    const handleFilterChange = (filter: FilterValue): void => {
        setFilterSelected(filter)
    }

    const handleRemoveAllCompleted = () => {
        const newTodos = todos.filter(todo => !todo.completed)
        setTodos(newTodos)
    }

    const activeCount = todos.filter(todo => !todo.completed).length
    const completedCount = todos.length - activeCount

    const filteredTodos = todos.filter(todo => {
        if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
        if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
        return todo
    })

    const handleAddTodo = ({ title }: TodoTitle): void => {
        const newTodo = {
            id: crypto.randomUUID(),
            title,
            completed: false
        }
        const newTodos = [...todos, newTodo]
        setTodos(newTodos)

    }

    const handleUpdateTitle = ({ id, title }: Pick<TodoType, 'id' | 'title'>): void => {
        const newTodos = todos.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    title
                }
            }
            return todo
        })
        setTodos(newTodos)
    }

    return {
        activeCount,
        completedCount,
        handleRemove,
        handleCompleted,
        handleFilterChange,
        handleRemoveAllCompleted,
        handleAddTodo,
        handleUpdateTitle,
        filterSelected,
        todos: filteredTodos


    }


}