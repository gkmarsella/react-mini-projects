import React, { useState } from 'react';
import './App.css';

function App() {
  // One state for the input value
  const [task, setTask] = useState('');

  // One state for the list of tasks
  const [tasks, setTasks] = useState([]);

  // TODO: function to add a new task
  const handleAddTask = () => {
    if (task.trim() !== '') {
      setTasks([...tasks, task]);
      setTask('');
    }
  };

  // TODO: function to delete a task

  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    console.log(index)
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
    </div>
  );
}

export default App;