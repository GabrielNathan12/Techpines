import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { Login } from './components/login/Login';
import { Register } from './components/register/Register';
import { Dashboard } from './components/dashboard/Dashboard';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={ <Login/> }/>
        <Route path='/register' element={ <Register/> }/>
        <Route path='/dashboard' element={ <Dashboard/> }/>
      </Routes>
    </Router>
  
  );
}

export default App;
