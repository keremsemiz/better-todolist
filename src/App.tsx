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
  const [showUserInput, setShowUserInput] = useState<boolean>(false);
  const [showSideMenu, setShowSideMenu] = useState<boolean>(false);

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

  const toggleUserInput = () => {
    setShowUserInput(!showUserInput);
  };

  const toggleSideBar = () => {
    setShowSideMenu(!showSideMenu);
  };

  return (
    <div className="App">
      <header>
        <h1 className="userGreeting">Hey, {user}! </h1>
        {showUserInput && (
          <input
            className="enterName"
            type="text"
            value={user}
            onChange={handleUserChange}
            placeholder="Enter your name"
          />
        )}
        <div className="menuIconHeader">
          <a onClick={toggleUserInput}><UilUser /></a>
        </div>
      </header>
      <div className="mainContent">
        <section className={`leftMenu ${showSideMenu ? 'expanded' : ''}`}>
          <div onClick={toggleSideBar} className="menuIcon">
            <div className={`menuToggleIcon ${showSideMenu ? 'open' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          {!showSideMenu && (
            <>
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
            </>
          )}
          {showSideMenu && (
            <div className="sideMenuContent">
              <div className="menuSection">
                <h2>Menu</h2>
                <div className="menuItem">Item 1</div>
                <div className="menuItem">Item 2</div>
              </div>
              <div className="menuSection">
                <h2>Usage Statistics</h2>
                <div className="menuItem">Stat 1</div>
                <div className="menuItem">Stat 2</div>
              </div>
              <div className="menuSection">
                <h2>Settings</h2>
                <div className="menuItem">Setting 1</div>
                <div className="menuItem">Setting 2</div>
              </div>
            </div>
          )}
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
          <button className='addTask' onClick={addTodo}>Add Task</button>
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
    </div>
  );
}

export default App;
