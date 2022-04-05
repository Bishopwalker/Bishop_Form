import './App.css';
import React from 'react'
import {Link} from 'react-router-dom'
import Register from './components/login/Register'

function App() {


  return (
      <div className="App">
       <Link to='/addUser'>
        <button>Enter App</button>
       </Link>
          <Register/>

      </div>
  );
}

export default App;
