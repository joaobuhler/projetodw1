import "./rankingFinal.css";

function RankingFinal() {
  return (
    <div className="rf-container">
      <h1>Ranking Final</h1>


      <div className="rf-podium">
        <div className="rf-second">
          <h3>2</h3>
          <p>Biluga</p>
        </div>

        <div className="rf-first">
          <h3>1</h3>
          <p>Fulano</p>
        </div>

        <div className="rf-third">
          <h3>3</h3>
          <p>Castro</p>
        </div>
      </div>

      <ul className="rf-lista">
        {["Rogério","Carlos","Juliana","Caio","Sérgio","Lorenzo","Player69_67_uwu"]
          .map((nome, index) => (
          <li key={index}>
            <span>{index + 4}</span> {nome}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RankingFinal;
