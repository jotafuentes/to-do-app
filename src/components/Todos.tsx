import { useState } from "react"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { type Todo as TodoType, type TodoId, type ListOfTodos } from "../types"
import { Todo } from "./Todo"

interface Props {
    todos: ListOfTodos
    onRemove: ({ id }: TodoId) => void
    onToggleCompleted: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void
    onUpdateTitle: ({ id, title }: Pick<TodoType, 'id' | 'title'>) => void
}

export const Todos: React.FC<Props> = ({ todos, onRemove, onToggleCompleted, onUpdateTitle }) => {

    const [isEditing, setIsEditing] = useState('')
    const [parent] = useAutoAnimate()

    return (
        <ul className="todo-list" ref={parent}>

            {todos?.map(todo => (
                <li key={todo.id}
                    onDoubleClick={() => { setIsEditing(todo.id) }}
                    className={`
                    ${todo.completed ? 'completed' : ''}
                    ${isEditing === todo.id ? 'editing' : ''}
                    
                    `}>
                    <Todo
                        key={todo.id}
                        id={todo.id}
                        title={todo.title}
                        completed={todo.completed}
                        onRemove={onRemove}
                        onToggleCompleted={onToggleCompleted}
                        onUpdateTitle={onUpdateTitle}
                        isEditing={isEditing}
                        setIsEditing={setIsEditing}
                    />
                </li>
            ))}
        </ul>
    )

}