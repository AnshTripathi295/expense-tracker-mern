import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
      }}
    >
      <h1>Expense Tracker Dashboard</h1>

      <hr />

      {user && (
        <>
          <h2>Welcome, {user.name} 👋</h2>

         

          <p>
            <strong>Name:</strong> {user.name}
          </p>

          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </>
      )}

      <hr />

      <h3>Account Summary</h3>

      <p>Total Income: ₹0</p>
      <p>Total Expense: ₹0</p>
      <p>Balance: ₹0</p>

      
    </div>
  );
}

export default Dashboard;