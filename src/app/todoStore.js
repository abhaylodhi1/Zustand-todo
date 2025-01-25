import create from 'zustand';

const useTodoStore = create((set) => ({
    todos: [],

    // Fetch todos from API
    fetchTodos: async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');
        const data = await response.json();
        set({ todos: data });
    },

    // Add a new todo
    addTodo: async (newTodo) => {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTodo),
        });
        const data = await response.json();
        set((state) => ({ todos: [data, ...state.todos] }));
    },

    // Toggle the completed status of a todo
    toggleTodo: (id) => {
        set((state) => ({
            todos: state.todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            ),
        }));
    },

    // Delete a todo
    deleteTodo: (id) => {
        set((state) => ({
            todos: state.todos.filter((todo) => todo.id !== id),
        }));
    },
}));

export default useTodoStore;
