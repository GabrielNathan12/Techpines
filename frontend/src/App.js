import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { Login } from './components/login/Login';
import { Register } from './components/register/Register';
import { Dashboard } from './components/dashboard/Dashboard';
import { Tracks } from './components/tracks/Tracks';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={ <Login/> }/>
        <Route path='/register' element={ <Register/> }/>
        <Route path='/dashboard' element={ <Dashboard/> }/>
        <Route path='/album/:id' element={ <Tracks/> }/>

      </Routes>
    </Router>
  
  );
}

export default App;
