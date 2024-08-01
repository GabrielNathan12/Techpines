import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { Login } from './components/login/Login';
import { Register } from './components/register/Register';
import { Dashboard } from './components/dashboard/Dashboard';
import { Tracks } from './components/tracks/Tracks';
import { TrackDetail } from './components/tracks/TrackDetail';
import { UserProfile } from './components/user/UserProfile';
import { AlbumDetail } from './components/dashboard/AlbumDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={ <Login/> }/>
        <Route path='/register' element={ <Register/> }/>
        <Route path='/dashboard' element={ <Dashboard/> }/>
        <Route path='/album/:id' element={ <Tracks/> }/>
        <Route path='/track/:id' element={ <TrackDetail />}/>
        <Route path='/album/detail/:id' element={ <AlbumDetail /> } />
        <Route path='/user' element={ <UserProfile />}/>

      </Routes>
    </Router>
  
  );
}

export default App;
