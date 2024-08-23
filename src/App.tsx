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
  const [user, setUser] = useState<string>('');
  const [importance, setImportance] = useState<string>('!');
  const [showUserInput, setShowUserInput] = useState<boolean>(false);
  const [showSideMenu, setShowSideMenu] = useState<boolean>(false);
  const [useLocalStorage, setUseLocalStorage] = useState<boolean>(() => {
    const storedUseLocalStorage = localStorage.getItem('useLocalStorage');
    return storedUseLocalStorage ? JSON.parse(storedUseLocalStorage) : false;
  });
  const [showSearchInput, setShowSearchInput] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showFavorites, setShowFavorites] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editText, setEditText] = useState<string>('');
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [feedback, setFeedback] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

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
    document.body.className = darkMode ? 'dark-theme' : 'light-theme';
  }, [darkMode]);

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const currentDate = new Date().toLocaleString();
      setTodos([
        ...todos,
        { id: Date.now(), text: newTodo, completed: false, importance, date: currentDate, favorite: false }
      ]);
      setNewTodo('');
      setImportance('!');
      triggerFeedback('Task added successfully', 'success');
    } else {
      triggerFeedback('Task cannot be empty', 'error');
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

  const toggleUserInput = () => {
    setShowUserInput(!showUserInput);
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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const triggerFeedback = (message: string, type: 'success' | 'error') => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback(null), 3000);
  };

  const editTodo = (id: number, text: string) => {
    setIsEditing(id);
    setEditText(text);
  };

  const saveEdit = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, text: editText } : todo
      )
    );
    setIsEditing(null);
    setEditText('');
    triggerFeedback('Task updated successfully', 'success');
  };

  const filteredTodos = todos.filter(todo => todo.text.toLowerCase().includes(searchTerm.toLowerCase()));
  const favoriteTodos = todos.filter(todo => todo.favorite);

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
        <div className="themeSwitcher" onClick={toggleDarkMode}>
          {darkMode ? <UilHeart /> : <UilStar />}
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
                  <button onClick={() => setTodos([])}>Clear All Tasks</button>
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
                className={todo.completed ? 'completed-task' : 'task-item'}
              >
                {isEditing === todo.id ? (
                  <>
                    <input
                      className="editTaskInput"
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                    />
                    <button onClick={() => saveEdit(todo.id)}>Save</button>
                  </>
                ) : (
                  <>
                    {todo.text} - Importance: {todo.importance} - Date: {todo.date}
                    <div>
                      <button className="select-task" onClick={() => toggleFavorite(todo.id)}>
                        {todo.favorite ? 'Unfavorite' : 'Favorite'}
                      </button>
                      <button className="edit-task" onClick={() => editTodo(todo.id, todo.text)}>
                        Edit
                      </button>
                      <button className="edit-task" onClick={() => toggleTodo(todo.id)}>
                        {todo.completed ? 'Undo' : 'Complete'}
                      </button>
                      <button className="delete-task" onClick={() => setTodos(todos.filter(t => t.id !== todo.id))}>
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {feedback && (
        <div className={`feedback feedback-${feedback.type}`}>
          {feedback.message}
        </div>
      )}
    </div>
  );
}

export default App;
