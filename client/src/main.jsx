import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router';
import Home from './view/Home';
import Login from './view/Login';
import Signup from './view/Signup';
import Tours from './view/Tours';
import NewTours from './view/NewTours.jsx';
import EditTour from './view/EditTour';
import Dashboard from './view/Dashboard';

const root = createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/login' element={<Login />} />
    <Route path='/signup' element={<Signup />} />
    <Route path='/dashboard' element={<Dashboard />} />
    <Route path='/tours' element={<Tours />} />
    <Route path='/newtour' element={<NewTours />} />
    <Route path='/edittour' element={<EditTour />} />
  </Routes>
  </BrowserRouter>
)
