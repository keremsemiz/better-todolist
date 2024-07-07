import React, { useState, useEffect } from 'react';
import './App.css';
import { UilSearch, UilStar, UilHeart, UilUser } from '@iconscout/react-unicons';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  importance: string;
  date: string;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [user, setUser] = useState<string>('');
  const [importance, setImportance] = useState<string>('');
  const [showUserInput, setShowUserInput] = useState<boolean>(false);
  const [showSideMenu, setShowSideMenu] = useState<boolean>(false);
  const [useLocalStorage, setUseLocalStorage] = useState<boolean>(false);

  useEffect(() => {
    if (useLocalStorage) {
      const storedTodos = localStorage.getItem('todos');
      if (storedTodos) {
        setTodos(JSON.parse(storedTodos));
      }
    }
  }, [useLocalStorage]);

  useEffect(() => {
    if (useLocalStorage) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos, useLocalStorage]);

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const currentDate = new Date().toLocaleString();
      setTodos([
        ...todos,
        { id: Date.now(), text: newTodo, completed: false, importance, date: currentDate }
      ]);
      setNewTodo('');
      setImportance('');
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

  const handleLocalStorageToggle = () => {
    setUseLocalStorage(!useLocalStorage);
  };

  return (
    <div className="App">
      <header>
        <h1 className="userGreeting">Hey, {user}! </h1>
        <div className="profileDropdown">
          <a className='menuIconHeader' onClick={toggleUserInput}><UilUser /></a>
          {showUserInput && (
            <div className="dropdownContent">
              <input
                className="enterName"
                type="text"
                value={user}
                onChange={handleUserChange}
                placeholder="Enter your name"
              />
            </div>
          )}
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
                <h2>Usage Statistics</h2>
                <div className="menuItem">
                  <p>Total tasks: {todos.length}</p>
                </div>
                <div className="menuItem">
                  <p>Completed Tasks: {todos.filter(todo => todo.completed).length}</p>
                </div>
              </div>
              <div className="menuSection">
                <h2>Settings</h2>
                <div className="menuItem">
                  Enable local storage? 
                  <input 
                    type="checkbox" 
                    name="toggleLocalStorage" 
                    checked={useLocalStorage} 
                    onChange={handleLocalStorageToggle} 
                  />
                </div>
                <div className="menuItem">
                  Send usage statistics?
                  <input type="checkbox" name="toggleUsageStatistics" id="" />
                </div>
              </div>
            </div>
          )}
        </section>
        <div className="content">
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
                {todo.text} - Importance: {todo.importance} - Date: {todo.date}
              </li>
            ))}
          </ul> 
        </div>
      </div>
    </div>
  );
}

export default App;
