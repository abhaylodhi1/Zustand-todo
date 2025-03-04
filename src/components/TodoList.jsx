import React, { useState } from 'react';
import useTodoStore from '../app/todoStore';

const TodoList = () => {
    const { todos, toggleTodo, deleteTodo, updateTodo } = useTodoStore((state) => ({
        todos: state.todos,
        toggleTodo: state.toggleTodo,
        deleteTodo: state.deleteTodo,
        updateTodo: state.updateTodo,
    }));

    const [editId, setEditId] = useState(null);
    const [editTitle, setEditTitle] = useState('');

    const handleEditClick = (id, currentTitle) => {
        setEditId(id);
        setEditTitle(currentTitle);
    };

    const handleUpdate = (id) => {
        if (editTitle.trim()) {
            updateTodo(id, editTitle.trim());
        }
        setEditId(null); // Exit edit mode
        setEditTitle('');
    };

    return (
        <ul className="todo-list">
            {todos.map((todo) => (
                <li
                    key={todo.id}
                    className={`todo-item ${todo.completed ? 'completed' : ''}`}
                >
                    {editId === todo.id ? (
                        <div className="edit-container">
                            <input
                                className="edit-input"
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                            />
                            <button
                                className="update-btn"
                                onClick={() => handleUpdate(todo.id)}
                            >
                                Update
                            </button>
                            <button
                                className="cancel-btn"
                                onClick={() => setEditId(null)}
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <div className="todo-content">
                            <input
                                type="checkbox"
                                checked={todo.completed}
                                onChange={() => toggleTodo(todo.id)}
                            />
                            <span>{todo.title}</span>
                        </div>
                    )}
                    {editId !== todo.id && (
                        <div className="action-buttons">
                            <button
                                className="edit-btn"
                                onClick={() => handleEditClick(todo.id, todo.title)}
                            >
                                Edit
                            </button>
                            <button
                                className="delete-btn"
                                onClick={() => deleteTodo(todo.id)}
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default TodoList;
