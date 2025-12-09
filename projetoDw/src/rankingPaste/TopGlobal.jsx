import "./topGlobal.css";

function TopGlobal() {
  return (
    <div className="tg-container">
      <h1>Top Global</h1>

      <div className="tg-boxes">

        <div className="tg-col">
          <h2>Médio</h2>
          <ul>
            {[1,2,3,4,5,6,7,8,9,10].map((n) => (
              <li key={n}>{n}º - Nome</li>
            ))}
          </ul>
        </div>

        <div className="tg-col">
          <h2>Difícil</h2>
          <ul>
            {[1,2,3,4,5,6,7,8,9,10].map((n) => (
              <li key={n}>{n}º - Nome}</li>
            ))}
          </ul>
        </div>

        <div className="tg-col">
          <h2>Fácil</h2>
          <ul>
            {[1,2,3,4,5,6,7,8,9,10].map((n) => (
              <li key={n}>{n}º - Nome}</li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}

export default TopGlobal;
