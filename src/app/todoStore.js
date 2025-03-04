import create from 'zustand';

const useTodoStore = create((set) => ({
    todos: [], // Initial state 


    fetchTodos: async () => {
        try {
            const response = await fetch(
                'https://jsonplaceholder.typicode.com/todos?_limit=10'
            );
            const data = await response.json();
            set({ todos: data });
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    },

    // Add a new todo
    addTodo: async (newTodo) => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTodo),
            });
            const data = await response.json();
            set((state) => ({ todos: [data, ...state.todos] }));
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    },

    // Toggle the completed status of a todo
    toggleTodo: (id) => {
        set((state) => ({
            todos: state.todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            ),
        }));
    },

   
    deleteTodo: (id) => {
        set((state) => ({
            todos: state.todos.filter((todo) => todo.id !== id),
        }));
    },

  
    updateTodo: (id, updatedTitle) => {
        set((state) => ({
            todos: state.todos.map((todo) =>
                todo.id === id ? { ...todo, title: updatedTitle } : todo
            ),
        }));
    },
}));

export default useTodoStore;
