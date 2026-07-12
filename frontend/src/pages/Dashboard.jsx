import { useEffect, useState } from "react";
import api from "../services/api";
import SummaryCard from "../components/SummaryCard";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

import { useNavigate } from "react-router-dom";
const getUser = async () => api.get("auth/profile");
 const getTransactions = async () => api.get("/transactions");
 const addTransaction = async (transactionData) => api.post("/transactions", transactionData);
  const deleteTransaction = async (id) => api.delete(`/transactions/${id}`);
function Dashboard() {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    fetchUser();
    fetchTransactions();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await getUser();
      setUser(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const res = await getTransactions();
      setTransactions(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);

      setTransactions((prevTransactions) =>
        prevTransactions.filter(
          (transaction) => transaction._id !== id
        )
      );
    } catch (error) {
      console.error(error);
    }
  };
  const income = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const expense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const balance = income - expense;

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

      <SummaryCard income={income} expense={expense} balance={balance} />

      <hr />
      <TransactionForm onAddTransaction={(newTransaction) =>
          setTransactions((prevTransactions) => [
            ...prevTransactions,
            newTransaction
          ])
        }
      />
      <TransactionList
        transactions={transactions}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default Dashboard;