import React, { useState, useEffect } from 'react';
import './App.css';
import { UilSearch, UilStar, UilHeart, UilUser } from '@iconscout/react-unicons';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  importance: string;
  date: string;
  favorite: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [user, setUser] = useState<string>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? storedUser : '';
  });
  const [importance, setImportance] = useState<string>('!');
  const [showUserInput, setShowUserInput] = useState<boolean>(!user);
  const [showSideMenu, setShowSideMenu] = useState<boolean>(false);
  const [useLocalStorage, setUseLocalStorage] = useState<boolean>(() => {
    const storedUseLocalStorage = localStorage.getItem('useLocalStorage');
    return storedUseLocalStorage ? JSON.parse(storedUseLocalStorage) : false;
  });
  const [showSearchInput, setShowSearchInput] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showFavorites, setShowFavorites] = useState<boolean>(false);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    if (useLocalStorage) {
      localStorage.setItem('todos', JSON.stringify(todos));
    } else {
      localStorage.removeItem('todos');
    }
    localStorage.setItem('useLocalStorage', JSON.stringify(useLocalStorage));
  }, [todos, useLocalStorage]);

  useEffect(() => {
    localStorage.setItem('user', user);
  }, [user]);

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const currentDate = new Date().toLocaleString();
      setTodos([
        ...todos,
        { id: Date.now(), text: newTodo, completed: false, importance, date: currentDate, favorite: false }
      ]);
      setNewTodo('');
      setImportance('!');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const toggleFavorite = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, favorite: !todo.favorite } : todo
      )
    );
  };

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setNewTodo(event.target.value);
  };

  const handleUserChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setUser(event.target.value);
  };

  const handleImportanceChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    setImportance(event.target.value);
  };

  const handleSearchChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleSideBar = () => {
    setShowSideMenu(!showSideMenu);
  };

  const handleLocalStorageToggle = () => {
    setUseLocalStorage(!useLocalStorage);
  };

  const toggleSearchInput = () => {
    setShowSearchInput(!showSearchInput);
  };

  const toggleShowFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const filteredTodos = todos.filter(todo => todo.text.toLowerCase().includes(searchTerm.toLowerCase()));
  const favoriteTodos = todos.filter(todo => todo.favorite);

  return (
    <div className="App">
      <header>
        <h1 className="userGreeting">Hey, {user || 'there'}!</h1>
        <div className="profileDropdown">
          <a className='menuIconHeader' onClick={() => setShowUserInput(true)}><UilUser /></a>
          {showUserInput && (
            <div className="dropdownContent">
              <input
                className="enterName"
                type="text"
                value={user}
                onChange={handleUserChange}
                placeholder="Enter your name"
              />
              <button
                className="saveUserName"
                onClick={() => setShowUserInput(false)}
              >
                Save
              </button>
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
              <div className="menuIcon" onClick={toggleSearchInput}>
                <UilSearch />
              </div>
              <div className="menuIcon" onClick={toggleShowFavorites}>
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
          {showSearchInput && (
            <input
              className="searchInput"
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search todos..."
            />
          )}
          <div className="inputHolders">
            <input
              className="taskName"
              type="text"
              value={newTodo}
              onChange={handleInputChange}
              placeholder="Enter new task"
            />
            <select
              className="importance"
              value={importance}
              onChange={handleImportanceChange}
            >
              <option value="!">!</option>
              <option value="!!">!!</option>
              <option value="!!!">!!!</option>
            </select>
            <button className='addTask' onClick={addTodo}>Add Task</button>
          </div>
          <ul>
            {(showFavorites ? favoriteTodos : filteredTodos).map(todo => (
              <li
                key={todo.id}
                style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              >
                {todo.text} - Importance: {todo.importance} - Date: {todo.date}
                <button onClick={() => toggleFavorite(todo.id)}>
                  {todo.favorite ? 'Unfavorite' : 'Favorite'}
                </button>
                <button onClick={() => toggleTodo(todo.id)}>
                  {todo.completed ? 'Undo' : 'Complete'}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
