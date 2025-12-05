import "./criarQuiz.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function CriarQuiz() {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState(null); // 0..3
  const [selectedNum, setSelectedNum] = useState(null); // 0..2
  const [selectedTempo, setSelectedTempo] = useState(null); // 0..2
  const [selectedDifficulty, setSelectedDifficulty] = useState(null); // "Fácil"|"Médio"|"Difícil"
  const [selectedPoderes, setSelectedPoderes] = useState(null); // "Sim"|"Não"

  const toggleDifficulty = (diff) => {
    setSelectedDifficulty(selectedDifficulty === diff ? null : diff);
  };

  const togglePoderes = (poder) => {
    setSelectedPoderes(selectedPoderes === poder ? null : poder);
  };

  return (
    <div className="ContainerCriarQuiz">
      <div className="cimaoCriarQuiz">
        <i
          id="setaVoltar"
          className="material-icons"
          onClick={() => navigate(-1)}
        >
          arrow_back
        </i>
        <h1>Criando um Quiz</h1>
      </div>

      <div className="cimaQuiz">
        <div className="CategoriasCriarQuiz">
          <h1>Categorias</h1>
          <div className="CheckBoxCriarQuiz">
            <div className="divCriarQuiz">
              <div className="textCriarQuiz">Matemática</div>
              <input
                type="checkbox"
                checked={selectedCategory === 0}
                onChange={() => setSelectedCategory(selectedCategory === 0 ? null : 0)}
                aria-label="Matemática"
              />
            </div>
            <div className="divCriarQuiz">
              <div className="textCriarQuiz">Química</div>
              <input
                type="checkbox"
                checked={selectedCategory === 1}
                onChange={() => setSelectedCategory(selectedCategory === 1 ? null : 1)}
                aria-label="Química"
              />
            </div>
            <div className="divCriarQuiz">
              <div className="textCriarQuiz">Computação</div>
              <input
                type="checkbox"
                checked={selectedCategory === 2}
                onChange={() => setSelectedCategory(selectedCategory === 2 ? null : 2)}
                aria-label="Computação"
              />
            </div>
            <div className="divCriarQuiz">
              <div className="textCriarQuiz">Conhecimentos Gerais</div>
              <input
                type="checkbox"
                checked={selectedCategory === 3}
                onChange={() => setSelectedCategory(selectedCategory === 3 ? null : 3)}
                aria-label="Conhecimentos Gerais"
              />
            </div>
          </div>
        </div>

        <div className="categoriasPerguntasCriarQuiz">
          <div className="categoriasCimaCriarQuiz">
            <div className="categoriasPerguntasDireitaCriarQuiz">
              <div>
                <h1>Nome do Quiz</h1>
                <input className="textCriarQuiz" type="text" />
              </div>
              <div>
                <h1>Permitir Poderes</h1>
                <div className="CheckBoxCriarQuiz">
                  <div className="divCriarQuiz">
                    <div className="secCriarQuiz">Sim</div>
                    <input
                      type="checkbox"
                      checked={selectedPoderes === "Sim"}
                      onChange={() => setSelectedPoderes(selectedPoderes === "Sim" ? null : "Sim")}
                      aria-label="Permitir Poderes Sim"
                    />
                  </div>
                  <div className="divCriarQuiz">
                    <div className="secCriarQuiz">Não</div>
                    <input
                      type="checkbox"
                      checked={selectedPoderes === "Não"}
                      onChange={() => setSelectedPoderes(selectedPoderes === "Não" ? null : "Não")}
                      aria-label="Permitir Poderes Não"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="categoriasPerguntasDireitaCriarQuiz">
              <h1>Tempo/Questão</h1>
              <div className="CheckBoxCriarQuiz">
                <div className="divCriarQuiz">
                  <div className="secCriarQuiz">15 segundos</div>
                  <input
                    type="checkbox"
                    checked={selectedTempo === 0}
                    onChange={() => setSelectedTempo(selectedTempo === 0 ? null : 0)}
                    aria-label="15 segundos"
                  />
                </div>
                <div className="divCriarQuiz">
                  <div className="secCriarQuiz">30 segundos</div>
                  <input
                    type="checkbox"
                    checked={selectedTempo === 1}
                    onChange={() => setSelectedTempo(selectedTempo === 1 ? null : 1)}
                    aria-label="30 segundos"
                  />
                </div>
                <div className="divCriarQuiz">
                  <div className="secCriarQuiz">1 minuto</div>
                  <input
                    type="checkbox"
                    checked={selectedTempo === 2}
                    onChange={() => setSelectedTempo(selectedTempo === 2 ? null : 2)}
                    aria-label="1 minuto"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="categoriasBaixoCriarQuiz">
            <div className="categoriasPerguntasBaixoCriarQuiz">
              <div
                className={`difCriarQuiz ${selectedDifficulty === "Fácil" ? "difCriarQuiz-selected" : ""}`}
                onClick={() => toggleDifficulty("Fácil")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") toggleDifficulty("Fácil"); }}
              >
                Fácil
              </div>
              <div
                className={`difCriarQuiz ${selectedDifficulty === "Médio" ? "difCriarQuiz-selected" : ""}`}
                onClick={() => toggleDifficulty("Médio")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") toggleDifficulty("Médio"); }}
              >
                Médio
              </div>
              <div
                className={`difCriarQuiz ${selectedDifficulty === "Difícil" ? "difCriarQuiz-selected" : ""}`}
                onClick={() => toggleDifficulty("Difícil")}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") toggleDifficulty("Difícil"); }}
              >
                Difícil
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="containerPerguntasCriarQuiz">
        <h1>Desenvolver Perguntas</h1>
        <div className="perguntaCriarQuiz">
          <input type="text" className="nomePerguntaCriarQuiz" placeholder="Digite sua pergunta..." />
          <div className="respostasCriarQuiz">
            <div className="divCriarQuiz">
              <div className="letraCriarQuiz">A)</div>
              <input className="respostaCriarQuiz" type="text" placeholder="Digite sua primeira alternativa" />
              <input className="checkboxCriarQuiz" type="checkbox" />
            </div>
            <div className="divCriarQuiz">
              <div className="letraCriarQuiz">B)</div>
              <input className="respostaCriarQuiz" type="text" placeholder="Digite sua segunda alternativa" />
              <input className="checkboxCriarQuiz" type="checkbox" />
            </div>
            <div className="divCriarQuiz">
              <div className="letraCriarQuiz">C)</div>
              <input className="respostaCriarQuiz" type="text" placeholder="Digite sua terceira alternativa" />
              <input className="checkboxCriarQuiz" type="checkbox" />
            </div>
            <div className="divCriarQuiz">
              <div className="letraCriarQuiz">D)</div>
              <input className="respostaCriarQuiz" type="text" placeholder="Digite sua quarta alternativa" />
              <input className="checkboxCriarQuiz" type="checkbox" />
            </div>
          </div>
        </div>
      </div>
      <div id="btnCriarQuiz">
        <i className="material-icons">add</i>
      </div>
    </div>
  );
}

export default CriarQuiz;