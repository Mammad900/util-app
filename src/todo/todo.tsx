import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link, NavLink, useSearchParams } from "react-router-dom";
import "./todo.scss"

type Todo = {
    title: string,
    description: string,
    id: number,
    tab: string,
    done: boolean
}

export default function ToDo() {
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [todos, setTodos] = React.useState<Record<string, Todo[]>>(JSON.parse(localStorage.getItem('util-todo-list') || '{}'));
    const [searchParams, setSearchParams] = useSearchParams();
    const listName = searchParams.get('list') || Object.keys(todos)[0];
    let list = todos[searchParams.get('list') || Object.keys(todos)[0]];
    if (!list) {
        list = [];
        if (Object.keys(todos).length === 0)
            setTodos({ 'Short term': [] });
        setSearchParams({});
    }

    React.useEffect(() => {
        localStorage.setItem('util-todo-list', JSON.stringify(todos));
    })

    return (
        <main id="todo">
            <form>
                <div className="fields">
                    <input
                        type="text"
                        className="title"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        className="description"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <input
                    type="submit"
                    onClick={(e) => {
                        e.preventDefault();
                        setTodos(todos => (
                            {
                                ...todos,
                                [listName]: [
                                    ...todos[listName],
                                    {
                                    id: Math.floor(Math.random() * 1e16),
                                    description,
                                    title,
                                    tab: '',
                                    done: false
                                    }
                                ]
                            }
                        ))
                    }}
                    disabled={!title}
                    value="Add"
                />
            </form>
            <nav>
                {Object.keys(todos).map(name => (
                    <NavLink
                        to={`/todo?list=${encodeURIComponent(name)}`}
                        className={({ isActive }) => isActive? 'active':''}
                    >
                        {name}
                    </NavLink>
                ))}
            </nav>
            <ul>
                <div className="shadow" />
                {list.map(todo => (
                    <li key={todo.id}>
                        <div className="info">
                            <div className="title">{todo.title}</div>
                            {todo.description && <div className="description">{todo.description}</div>}
                        </div>
                        <button className="close">
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </li>
                ))}
            </ul>
        </main>
    );
}