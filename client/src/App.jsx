import './App.css'
import  {Routes, Route} from 'react-router-dom';
import Home from '../src/pages/Home';
import Register from '../src/pages/Register';
import Login from '../src/pages/Login';
import Navbar from './components/Navbar';
import axios from 'axios';
//Errors to show in the frontend (push notifications)
import { Toaster } from 'react-hot-toast';
import { UserContextProvider } from '../context/userContext';
import Dashboard from './pages/Dashboard';


axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials=true;

function App() {

  return (
    <UserContextProvider>
      <Navbar />
      <Toaster position='bottom-right' toastOptions={{duration: 2000}} />
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
