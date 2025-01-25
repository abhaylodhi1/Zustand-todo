import './App.css';
import React, { useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import useTodoStore from './app/todoStore';

function App() {
    const fetchTodos = useTodoStore((state) => state.fetchTodos);

    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    return (
        <div className="main-container">
            <h1 className="main-header">Todo App</h1>
            <TodoForm />
            <TodoList />
        </div>
    );
}

export default App;
