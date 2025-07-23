import React, { useState, useEffect } from 'react';
import './App.css';


// TODO: Sort by time created / alphabetically. Add estimated amount of time. Sort by how long it will take
// AI will tell you how long it will take but you can edit it
// break down each task
function App() {

  const [task, setTask] = useState('');

  const [tasks, setTasks] = useState([]);

  const [error, setError] = useState('');

  const [hasLoaded, setHasLoaded] = useState(false);

  const [sortOrder, setSortOrder] = useState('default    ')

  useEffect(() => {
    try {
      const storedTasks = JSON.parse(localStorage.getItem('tasks'));
      if (Array.isArray(storedTasks)) {
        setTasks(storedTasks);
      }
    } catch (e) {
      console.error('Failed to parse tasks from localStorage:', e);
    } finally {
      setHasLoaded(true); // only mark loaded after attempt
    }
  }, []);
  
  useEffect(() => {
    if (hasLoaded) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks, hasLoaded]);

  const handleAddTask = () => {
    if (task.trim() !== '' && !tasks.some(t => t.text === task.trim())) {
      setTasks([...tasks, {
        text: task, 
        completed: false,
        createdAt: Date.now()
      }]);
      setTask('');
      setError('');
    } else {
      if (task.trim() == ''){
        setError('Please enter a task!')
      } else {
        setError("Task already exists!")
      }
    }
  };

  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((t, i) => i !== index);
    setTasks(newTasks)
  }

  const handleCompleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed
    setTasks(updatedTasks)
  }

  const handleClearCompletedTasks = () => {
    const newTasks = tasks.filter((t) => t.completed == false)
    setTasks(newTasks)
  }

  return (
    <div className="App">
      <h1>To-Do List</h1>

      <div>
        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={handleAddTask}>+</button>
      </div>
      <div>
        <label>Sort by: </label>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="default">Default</option>
          <option value="az">A–Z</option>
          <option value="za">Z–A</option>
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
        </select>
      </div>

      <ul>
        {tasks
          .slice() //clone without deleting original
          .sort((a, b) => {
            if (sortOrder === 'az') return a.text.localeCompare(b.text);
            if (sortOrder === 'za') return b.text.localeCompare(a.text);
            if (sortOrder === 'newest') return b.createdAt - a.createdAt;
            if (sortOrder === 'oldest') return a.createdAt - b.createdAt;
            return 0; // default order
          })
          .map((t, index) => 
            <li key={index}>
              <input 
                type="checkbox"
                checked={t.completed}
                onChange={() => handleCompleteTask(index)}
              />
              {t.text} 
              <button onClick={() => handleDeleteTask(index)}>-</button></li>
          )}
      </ul>
      <p>{error}</p>
      <div>
        <button onClick={() => handleClearCompletedTasks()}>Clear Completed Tasks</button>
      </div>
    </div>
  );
}

export default App;