function TransactionList({ transactions, onDelete }) {
  return (
    <div>
      <h2>Transaction List</h2>

      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction._id}>
              <strong>{transaction.title}</strong> - ₹
              {transaction.amount} - {transaction.type} -
              {transaction.category}

              <button
                onClick={() => onDelete(transaction._id)}
                style={{ marginLeft: "10px" }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TransactionList;