import React, { useState } from 'react';
import './App.css';

function App() {
  // One state for the input value
  const [task, setTask] = useState('');

  // One state for the list of tasks
  const [tasks, setTasks] = useState([]);

  const [error, setError] = useState('');

  // TODO: function to add a new task
  const handleAddTask = () => {
    if (task.trim() !== '' && !tasks.includes(task.trim())) {
      setTasks([...tasks, task]);
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

  // TODO: function to delete a task

  const handleDeleteTask = (index) => {
    console.log(tasks[index])
    const newTasks = tasks.filter((t, i) => i !== index);
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
            {t} 
            <button onClick={() => handleDeleteTask(index)}>-</button></li>
        )}
      </ul>
      <p>{error}</p>
    </div>
  );
}

export default App;