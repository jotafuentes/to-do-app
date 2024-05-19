import { useEffect, useState, useRef } from "react"
import { type TodoId, type Todo as TodoType } from "../types"


interface Props extends TodoType {
    onRemove: ({ id }: TodoId) => void
    onToggleCompleted: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void
    isEditing: string
    setIsEditing: (completed: string) => void
    onUpdateTitle: ({ id, title }: Pick<TodoType, 'id' | 'title'>) => void
}


export const Todo: React.FC<Props> = ({
    id,
    title,
    completed,
    onRemove,
    onToggleCompleted,
    isEditing,
    setIsEditing,
    onUpdateTitle }) => {

    const [editedTitle, setEditedTitle] = useState(title)
    const inputEditTitle = useRef<HTMLInputElement>(null)

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.key === 'Enter') {
            setEditedTitle(editedTitle.trim())

            if (editedTitle !== title) {
                onUpdateTitle({ id, title: editedTitle })
            }

            if (editedTitle === '') onRemove({ id })
            setIsEditing('')
        }
        if (event.key === 'Escape') {
            setEditedTitle(title)
            setIsEditing('')
        }
    }

    useEffect(() => {
        inputEditTitle.current?.focus()
    }, [isEditing])


    return (
        <>

            <div className="view">
                <input
                    className="toggle"
                    type="checkbox"
                    checked={completed}
                    onChange={(event) => {
                        onToggleCompleted({ id, completed: event.target.checked })
                    }}
                />
                <label>{title}</label>
                <button
                    className="destroy"
                    onClick={() => {
                        onRemove({ id })
                    }}
                />
            </div>

            <input
                className="edit"
                value={editedTitle}
                onChange={(e) => { setEditedTitle(e.target.value) }}
                onKeyDown={handleKeyDown}
                onBlur={() => { setIsEditing('') }}
                ref={inputEditTitle}
            />
        </>
    )
}