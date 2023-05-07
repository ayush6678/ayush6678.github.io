import './App.css';
import Login from './components/Login';
import Map from './components/Map.js';
import Testing from './components/Testing.js';
import Register from './components/Register.js';
import {Routes,Route} from 'react-router-dom';


function App() {
  return (

    <div className='App'>
      <Routes>
      <Route path='Map' element={<Map/>} />
      <Route path='/' element={<Login/>} />
      <Route path='test' element={<Testing/>} />
      <Route path='register' element={<Register/>} />
      </Routes>
    </div>

    );
}

export default App;
