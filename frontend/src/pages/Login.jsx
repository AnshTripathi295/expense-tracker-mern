import {useState, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import api from '../services/api';

function Login() {
  const [data, setData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    });
  };

  const login = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await api.post('/auth/login', data);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate('/dashboard');
    }catch (err) {
  setError(err.response?.data?.message || "Invalid email or password.");

  setData({
    email: "",
    password: ""
  });

  emailRef.current?.focus();
}};

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && (<p style={{ color: 'red',marginBottom: '10px' }}>{error}</p>)}
      <form onSubmit={login}>
        <input ref={emailRef} name="email" type="email" placeholder="Email" value={data.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={data.password} onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
 }
export default Login;