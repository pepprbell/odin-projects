import { useState } from 'react'
import uniqid from 'uniqid'
import Overview from './components/Overview';

function App() {
  const [task, setTask] = useState({
    text : '',
    id : uniqid()  
  })
  const [tasks, setTasks] = useState([])

  let handleChange = (e) => {
    setTask({
      text : e.target.value,
      id : task.id
    })
  }

  let onSubmitTask = (e) => {
    e.preventDefault()  // no refreshing form
    setTasks(tasks.concat(task))
    setTask({
      text: '',
      id: uniqid()      
    })
  }

  return (
    <div>
      <form onSubmit={onSubmitTask}>
        <label htmlFor="taskInput">Enter task</label>
        <input type="text" id="taskInput" onChange={handleChange} value={task.value} />
        <button type='submit'>Add task</button>
      </form>
      <Overview tasks={tasks}></Overview>
    </div>
  );
}

export default App;
