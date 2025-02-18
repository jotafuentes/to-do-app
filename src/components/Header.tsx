import { TodoTitle } from "../types"
import { CreateTodo } from "./CreateTodo"

interface Props {
    onAddTodo: ({ title }: TodoTitle) => void
}

export const Header: React.FC<Props> = ({ onAddTodo }) => {
    return (
        <header className="header">
            <h1>Todo App <img
                style={{ width: '60px' }}
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png" alt="typescrip logo" /></h1>

            <CreateTodo saveTodo={onAddTodo} />
        </header>
    )
}