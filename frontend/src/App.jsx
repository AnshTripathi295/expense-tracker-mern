import {Routes,Route} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import './App.css'

function App() {
  return (<>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={
        // <ProtectedRoute>
          <Dashboard />
        // {/* </ProtectedRoute> */}
      } />
    </Routes>
    <h3>Ansh</h3>
    </>
  );
}

export default App;
