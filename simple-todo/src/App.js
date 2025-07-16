import React, { useState } from 'react';
import './App.css';

function App() {
  // One state for the input value
  const [task, setTask] = useState('');

  // One state for the list of tasks
  const [tasks, setTasks] = useState([]);

  const [error, setError] = useState('');

  const handleAddTask = () => {
    if (task.trim() !== '' && !tasks.includes(task.trim())) {
      setTasks([...tasks, {text: task, complete: false}]);
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
    updatedTasks[index].complete = !updatedTasks[index].complete
    setTasks(updatedTasks)
  }

  const handleClearCompletedTasks = () => {
    const newTasks = tasks.filter((t) => t.complete == false)
    setTasks(newTasks)
  }

  return (
    <div className="App">
      <h1>To-Do List</h1>

      {/* Input and Add button */}
      <div>
        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={handleAddTask}>+</button>
      </div>

      {/* Tasks list */}
      <ul>
        {tasks.map((t, index) => 
          <li key={index}>
            <input 
              type="checkbox"
              checked={t.complete}
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