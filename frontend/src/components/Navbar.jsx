const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/";
}
function Log() {
  const token = localStorage.getItem("token");
  if (token) {
    return <button onClick={logout}>Logout</button>;
  }
  return null;
}
function Navbar() {
  return (
    <nav>
        <h2>Expense Tracker</h2>
        <Log/>
    </nav>
  );
}

export default Navbar;