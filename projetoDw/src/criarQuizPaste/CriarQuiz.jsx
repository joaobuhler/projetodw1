import "./criarQuiz.css";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import { useState } from "react";
import { criarQuiz } from "../supabaseCriarQuiz"


function CriarQuiz() {
  const navigate = useNavigate();

  const [quizName, setQuizName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTempo, setSelectedTempo] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [selectedPoderes, setSelectedPoderes] = useState(null);

  const [questions, setQuestions] = useState([
    {
      id: Date.now(),
      pergunta: "",
      respostas: [
        { letra: "A", texto: "", correta: false },
        { letra: "B", texto: "", correta: false },
        { letra: "C", texto: "", correta: false },
        { letra: "D", texto: "", correta: false },
      ],
    },
  ]);

  const [activeTab, setActiveTab] = useState(Date.now());

  const toggleDifficulty = (difficulty) => {
    setSelectedDifficulty(selectedDifficulty === difficulty ? null : difficulty);
  };

  const handleAddQuestion = () => {
    if (questions.length >= 24) {
      alert("Limite de 24 perguntas atingido.");
      return;
    }

    const newQuestion = {
      id: Date.now(),
      pergunta: "",
      respostas: [
        { letra: "A", texto: "", correta: false },
        { letra: "B", texto: "", correta: false },
        { letra: "C", texto: "", correta: false },
        { letra: "D", texto: "", correta: false },
      ],
    };

    setQuestions([...questions, newQuestion]);
    setActiveTab(newQuestion.id);
  };

  const handleDeleteQuestion = (id) => {
    const updated = questions.filter((q) => q.id !== id);
    setQuestions(updated);

    if (activeTab === id) {
      setActiveTab(updated.length > 0 ? updated[0].id : null);
    }
  };

  const handleUpdateQuestion = (questionId, updatedQuestion) => {
    setQuestions(
      questions.map((q) => (q.id === questionId ? updatedQuestion : q))
    );
  };

async function handleCreateQuiz() {
  const quiz = await supabaseCriaQuiz.criarQuiz({
    quizName,
    selectedCategory,
    selectedPoderes,
    selectedTempo,
    selectedDifficulty,
  });

  await supabaseCriaQuiz.salvarPerguntas(quiz.id, questions);

  alert("Quiz criado com sucesso!");
  navigate("/quiz/" + quiz.id);
}

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

      {/* CATEGORIAS E CONFIG */}
      <div className="cimaQuiz">
        {/* coluna categoria */}
        <div className="CategoriasCriarQuiz">
          <h1>Categorias</h1>

          <div className="CheckBoxCriarQuiz">
            {["Matemática", "Química", "Computação", "Conhecimentos Gerais"].map(
              (nome, i) => (
                <div key={i} className="divCriarQuiz">
                  <div className="textCriarQuiz">{nome}</div>
                  <input
                    type="checkbox"
                    checked={selectedCategory === i}
                    onChange={() =>
                      setSelectedCategory(
                        selectedCategory === i ? null : i
                      )
                    }
                  />
                </div>
              )
            )}
          </div>
        </div>

        {/* coluna lado direito */}
        <div className="categoriasPerguntasCriarQuiz">
          <div className="categoriasCimaCriarQuiz">
            <div className="categoriasPerguntasDireitaCriarQuiz">
              <h1>Nome do Quiz</h1>
              <input
                type="text"
                className="textCriarQuiz"
                value={quizName}
                onChange={(e) => setQuizName(e.target.value)}
              />

              <h1>Permitir Poderes</h1>

              <div className="CheckBoxCriarQuiz">
                {["Sim", "Não"].map((op) => (
                  <div key={op} className="divCriarQuiz">
                    <div className="secCriarQuiz">{op}</div>
                    <input
                      type="checkbox"
                      checked={selectedPoderes === op}
                      onChange={() =>
                        setSelectedPoderes(
                          selectedPoderes === op ? null : op
                        )
                      }
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="categoriasPerguntasDireitaCriarQuiz">
              <h1>Tempo/Questão</h1>

              <div className="CheckBoxCriarQuiz">
                {["15 segundos", "30 segundos", "1 minuto"].map(
                  (t, index) => (
                    <div key={t} className="divCriarQuiz">
                      <div className="secCriarQuiz">{t}</div>
                      <input
                        type="checkbox"
                        checked={selectedTempo === index}
                        onChange={() =>
                          setSelectedTempo(
                            selectedTempo === index ? null : index
                          )
                        }
                      />
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="categoriasBaixoCriarQuiz">
            <div className="categoriasPerguntasBaixoCriarQuiz">
              {["Fácil", "Médio", "Difícil"].map((d) => (
                <div
                  key={d}
                  className={`difCriarQuiz ${
                    selectedDifficulty === d
                      ? "difCriarQuiz-selected"
                      : ""
                  }`}
                  onClick={() => toggleDifficulty(d)}
                >
                  {d}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* PERGUNTAS */}
      <div className="containerPerguntasCriarQuiz">
        <h1>Desenvolver Perguntas</h1>

        {/* abas */}
        {questions.length > 0 && (
          <div className="abasPerguntasCriarQuiz">
            {questions.map((question, index) => (
              <div key={question.id} className="containerAbaQuiz">
                <div
                  className={`abaQuiz ${
                    activeTab === question.id ? "abaQuiz-active" : ""
                  }`}
                  onClick={() => setActiveTab(question.id)}
                >
                  <span>Pergunta {index + 1}</span>

                  <button
                    className="btnDeleteAba"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteQuestion(question.id);
                    }}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* conteúdo aba */}
        {activeTab &&
          questions.find((q) => q.id === activeTab) && (
            <div className="perguntaCriarQuiz">
              {(() => {
                const current = questions.find(
                  (q) => q.id === activeTab
                );

                return (
                  <>
                    <input
                      type="text"
                      placeholder="Digite sua pergunta..."
                      className="nomePerguntaCriarQuiz"
                      value={current.pergunta}
                      onChange={(e) =>
                        handleUpdateQuestion(activeTab, {
                          ...current,
                          pergunta: e.target.value,
                        })
                      }
                    />

                    <div className="respostasCriarQuiz">
                      {current.respostas.map((r, idx) => (
                        <div key={idx} className="divCriarQuiz">
                          <div className="letraCriarQuiz">
                            {r.letra})
                          </div>

                          <input
                            className="respostaCriarQuiz"
                            type="text"
                            value={r.texto}
                            placeholder="Digite alternativa"
                            onChange={(e) => {
                              const newR = [...current.respostas];
                              newR[idx].texto = e.target.value;

                              handleUpdateQuestion(activeTab, {
                                ...current,
                                respostas: newR,
                              });
                            }}
                          />

                          <input
                            type="checkbox"
                            className="checkboxCriarQuiz"
                            checked={r.correta}
                            onChange={(e) => {
                              const newR = current.respostas.map(
                                (item, i) => ({
                                  ...item,
                                  correta: i === idx ? e.target.checked : false,
                                })
                              );

                              handleUpdateQuestion(activeTab, {
                                ...current,
                                respostas: newR,
                              });
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </>
                );
              })()}
            </div>
          )}
      </div>

      <button id="btnCriarQuiz" onClick={handleCreateQuiz}>
        Criar Quiz
      </button>

      <button id="btnAddPergunta" onClick={handleAddQuestion}>
        +
      </button>
    </div>
  );
}

export default CriarQuiz;
