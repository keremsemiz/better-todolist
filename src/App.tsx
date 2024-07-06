import React, { useState } from 'react';
import './App.css';
import { UilSearch, UilStar, UilHeart, UilUser } from '@iconscout/react-unicons';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [user, setUser] = useState<string>('');
  const [importance, setImportance] = useState<string>('');

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([
        ...todos,
        { id: Date.now(), text: newTodo, completed: false }
      ]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setNewTodo(event.target.value);
  };

  const handleUserChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setUser(event.target.value);
  };

  const handleImportanceChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setImportance(event.target.value);
  };

  return (
    <div className="App">
      <header>
        <h1 className="userGreeting">Hey, {user}! </h1>
        <input
          className="taskName"
          type="text"
          value={user}
          onChange={handleUserChange}
          placeholder="Enter your name"
        />
      </header>
      <div className="mainContent">
      <section className="leftMenu">
          <div className="menuIcon">
            <UilSearch />
          </div>
          <div className="menuIcon">
            <UilStar />
          </div>
          <div className="menuIcon">
            <UilHeart />
          </div>
          <div className="menuIcon">
            <UilUser />
          </div>
        </section>
        <div className="inputHolders">
          <input
            className="taskName"
            type="text"
            value={newTodo}
            onChange={handleInputChange}
            placeholder="Enter new task"
          />
          <input
            className="importance"
            type="text"
            value={importance}
            onChange={handleImportanceChange}
            placeholder="Enter importance"
          />
          <button onClick={addTodo}>Add Task</button>
        </div>
      </div>
      <ul>
        {todos.map(todo => (
          <li
            key={todo.id}
            style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            onClick={() => toggleTodo(todo.id)}
          >
            {todo.text} {importance}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
