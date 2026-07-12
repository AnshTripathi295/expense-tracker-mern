const SummaryCard = ({ income, expense, balance }) => {
    return (
        <div className="summary-card" style={{display: "flex", gap:"20px"}}>
            
            <p>Total Income: ₹{income.toFixed(2)}</p>
            <p>Total Expense: ₹{expense.toFixed(2)}</p>
            <p>Balance: ₹{balance.toFixed(2)}</p>
        </div>
    );
};

export default SummaryCard;