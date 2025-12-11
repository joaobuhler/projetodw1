import { useLocation } from "react-router-dom";
import "./terminarQuiz.css";
import { useNavigate } from "react-router-dom";

function TerminarQuiz() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return <h1>Erro: sem dados...</h1>;
  }

  const { acertos = 0, total = 0, tempoMedio = 0, pontos = 0 } = state;
  const tempoMedioNum = Number(tempoMedio) || 0;

  return (
    <div className="bodyTerminar">
      <div className="containerTerminar">
        <i className="material-icons" onClick={() => navigate("/home")}>arrow_back</i>
        <h1>Meus Parabéns</h1>
        <p>Você finalizou o quiz!</p>

        <div className="trilhoCards">
          <div className="cardResultado">
            <h2>{acertos}/{total}</h2>
            <div className="pCard">Quantidade de Acertos</div>
          </div>
          <div className="cardResultado">
            <h2>{tempoMedioNum.toFixed(2)} s</h2>
            <div className="pCard">Tempo Médio por Questão</div>
          </div>
          <div className="cardResultado">
            <h2>{pontos}</h2>
            <div className="pCard">Pontos Ganhos</div>
          </div>
        </div>
        <div className="trilhoCards">
          <div className="cardGrafico"></div>
          <div className="cardGrafico"></div>
        </div>
      </div>
    </div>
  );
}

export default TerminarQuiz;
