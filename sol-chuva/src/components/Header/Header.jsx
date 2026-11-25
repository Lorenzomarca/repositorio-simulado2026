import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header-logo">
        <img src="/logo/solchuva.svg" alt="Sol Chuva" />
      </div>

      <div className="header-texto">
        <h1>Sol Chuva</h1>
        <p>O tempo certo, onde você estiver</p>
      </div>
    </header>
  );
}

export default Header;
