import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { Login } from './components/login/Login';
import { Register } from './components/register/Register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={ <Login/> }/>
        <Route path='/register' element={ <Register/> }/>
      </Routes>
    </Router>
  
  );
}

export default App;
