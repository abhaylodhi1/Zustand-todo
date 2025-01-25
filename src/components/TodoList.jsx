import React from 'react';
import useTodoStore from '../app/todoStore';

const TodoList = () => {
    const { todos, toggleTodo, deleteTodo } = useTodoStore((state) => ({
        todos: state.todos,
        toggleTodo: state.toggleTodo,
        deleteTodo: state.deleteTodo,
    }));

    return (
        <ul className="todo-list">
            {todos.map((todo) => (
                <li
                    key={todo.id}
                    className={`todo-item ${todo.completed ? 'completed' : ''}`}
                >
                    <div className="todo-content">
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleTodo(todo.id)}
                        />
                        <span>{todo.title}</span>
                    </div>
                    <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
                        Delete
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default TodoList;
