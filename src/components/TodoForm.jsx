import React, { useState } from 'react';
import useTodoStore from '../app/todoStore';

const TodoForm = () => {
    const [title, setTitle] = useState('');
    const addTodo = useTodoStore((state) => state.addTodo);

    const handleAddTodo = () => {
        if (!title) {
            alert('Please enter a title!');
            return;
        }

        const newTodo = {
            title,
            completed: false,
        };

        addTodo(newTodo);
        setTitle('');
    };

    return (
        <div className="form-container">
            <input
                className="form-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a todo..."
            />
            <button className="form-submit-btn" onClick={handleAddTodo}>
                Add Todo
            </button>
        </div>
    );
};

export default TodoForm;
