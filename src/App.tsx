import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { TodoTree } from "./components/TodoTree";

const client = generateClient<Schema>();

function App() {
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>My 3D Todos</h1>
      <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
        <div style={{ flex: 1 }}>
          <button 
            onClick={createTodo}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#ff6b6b',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            + new todo
          </button>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {todos.map((todo) => (
              <li 
                key={todo.id}
                style={{
                  padding: '0.5rem',
                  margin: '0.5rem 0',
                  backgroundColor: '#f8f9fa',
                  borderRadius: '4px'
                }}
              >
                {todo.content}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ flex: 1 }}>
          <TodoTree todos={todos} />
        </div>
      </div>
    </main>
  );
}

export default App;
