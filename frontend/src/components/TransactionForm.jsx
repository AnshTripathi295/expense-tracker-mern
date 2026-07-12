import {useState} from "react";
import api from "../services/api";
const addTransaction = async (transactionData) => api.post("/transactions", transactionData);
const TransactionForm = ({ onAddTransaction }) => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "income",
    "category": "",
    "date": "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
 const res= await addTransaction(formData);
    onAddTransaction(res.data);
    setFormData({
      title: "",
      amount: "",
      type: "income",
      "category": "",
      "date": "",
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Transaction</h2>
      <div>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Amount:</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Type:</label>
        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>
      <div>
        <label>Category:</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Date:</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Add </button>
    </form>
  );
}

export default TransactionForm;