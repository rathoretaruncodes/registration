import { useState } from 'react';
import axios from 'axios';
import {toast} from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })

  const registerUser = async (e) => {
    e.preventDefault()
    //destructuring the data first
    const {firstName, lastName, email, password} = data
    try {
      const {data} = await axios.post('/register', {
        firstName, lastName, email, password,
      })
      if(data.error) {
        toast.error(data.error)
      } else {
        setData({}) 
        toast.success('Registration Successful, Welcome!');
        navigate('/login')
      }
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <div>
      <form onSubmit={registerUser}>
        <label>First Name</label>
        <input type='text' placeholder='Jake' value={data.name} onChange={(e)=> setData({...data, firstName: e.target.value})}></input>
        <label>Last Name</label>
        <input type='text' placeholder='Cullen'value={data.name} onChange={(e)=> setData({...data, lastName: e.target.value})}></input>
        <label>Email</label>
        <input type='text' placeholder='cullenjake123@gmail.com'value={data.name} onChange={(e)=> setData({...data, email: e.target.value})}></input>
        <label>Password</label>
        <input type='text' placeholder='12345'value={data.name} onChange={(e)=> setData({...data, password: e.target.value})}></input>
        <button type='submit'>Submit</button>
        
      </form>
    </div>
  )
}
