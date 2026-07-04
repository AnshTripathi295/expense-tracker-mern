import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import api from '../services/api';
function Register() {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', user);
      alert('Registration successful! Please log in.');
      navigate('/');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
   <div className="register-container">
      <h2>Create Account</h2>
      <form onSubmit={register}>
        <input name="username" type="text" placeholder="Username" value={user.username} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={user.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={user.password} onChange={handleChange} required />
        <button type="submit">Register</button>
      </form>
        </div>
  );
}

export default Register;