import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import Home from './views/Home';
import Signup from './views/Signup';
import Login from './views/Login';
import NewTour from './views/NewTour';
import EditTour from './views/EditTour';
import Tours from './views/Tours';
import Dashboard from './views/Dashboard';

const root = createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tour/new" element={<NewTour />} />
            <Route path="/tour/:id/edit" element={<EditTour />} />
        </Routes>
    </BrowserRouter>
)