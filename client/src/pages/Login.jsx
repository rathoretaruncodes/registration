import {useState} from 'react';
import axios from 'axios';
import {toast} from 'react-hot-toast';
import {useNavigate} from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const loginUser = async (e) => {
    e.preventDefault();
    const {email, password} = data;
    try {
      const {data} = await axios.post('/login', {
        email,
        password
      })
      if(data.error) {
        toast.error(data.error)
      } else {
        setData({});
        toast.success('Login Successful, Welcome!')
        navigate('/dashboard');
      }
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <div>
      <form onSubmit={loginUser}>
      <label>Email</label>
        <input type='text' placeholder='cullenjake123@gmail.com'value={data.name} onChange={(e)=> setData({...data, email: e.target.value})}></input>
        <label>Password</label>
        <input type='text' placeholder='12345'value={data.name} onChange={(e)=> setData({...data, password: e.target.value})}></input>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}
