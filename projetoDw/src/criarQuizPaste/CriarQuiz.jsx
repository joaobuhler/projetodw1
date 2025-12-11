import "./criarQuiz.css";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase"; 
import { useState } from "react";


function CriarQuiz() {
  const navigate = useNavigate();

  // Mapeamento de categorias e tempos para salvar o texto/valor
  const categories = ["Matemática", "Química", "Computação", "Conhecimentos Gerais"];
  const tempos = ["15 segundos", "30 segundos", "1 minuto"];
  const poderes = ["Sim", "Não"];

  // Estados do Quiz (Configurações gerais)
  const [quizName, setQuizName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTempo, setSelectedTempo] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [selectedPoderes, setSelectedPoderes] = useState(null);
  const [isLoading, setIsLoading] = useState(false); 

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

  // ------------------------------------------------------------------
  // FUNÇÃO PRINCIPAL DE SALVAMENTO NO SUPABASE (CORRIGIDA)
  // ------------------------------------------------------------------

  async function handleCreateQuiz() {
    if (isLoading) return; 
    setIsLoading(true);

    // 1. Validação
    if (!quizName || selectedCategory === null || !selectedDifficulty || selectedTempo === null || selectedPoderes === null) {
      alert("Por favor, preencha todos os campos de configuração (Nome, Categoria, Dificuldade, Tempo, Poderes).");
      setIsLoading(false);
      return;
    }
    if (questions.length === 0 || questions.some(q => !q.pergunta.trim() || q.respostas.some(r => !r.texto.trim()))) {
        alert("Pelo menos uma pergunta e todas as suas alternativas devem ser preenchidas.");
        setIsLoading(false);
        return;
    }
    if (questions.some(q => q.respostas.every(r => r.correta === false))) {
        alert("Cada pergunta deve ter exatamente uma alternativa marcada como correta.");
        setIsLoading(false);
        return;
    }


    try {
        // Mapear IDs/Índices para valores de texto
        const categoryValue = categories[selectedCategory];
        const tempoValue = tempos[selectedTempo];
        const poderesValue = selectedPoderes === "Sim";

        // 2. INSERIR O QUIZ NA TABELA 'quizzes'
        const { data: quizData, error: quizError } = await supabase
            .from('quizzes') 
            .insert({
                nome: quizName,
                categoria: categoryValue,
                dificuldade: selectedDifficulty,
                tempo: tempoValue, 
                permitir_poderes: poderesValue, // <<--- CORRIGIDO: Agora é 'permitir_poderes'
                // user_id: (Adicione o ID do usuário se necessário)
            })
            .select() 
            .single();

        if (quizError) throw quizError;
        
        const quizId = quizData.id;

        // 3. ITERAR E INSERIR TODAS AS PERGUNTAS E RESPOSTAS
        for (let i = 0; i < questions.length; i++) {
            const question = questions[i];
            const ordem = i + 1; 

            // A. INSERIR A PERGUNTA NA TABELA 'questions'
            const { data: questionData, error: questionError } = await supabase
                .from('questions')
                .insert({
                    quiz_id: quizId,
                    pergunta: question.pergunta, 
                    ordem: ordem, 
                })
                .select()
                .single();

            if (questionError) throw questionError;

            const questionId = questionData.id;
            
            // B. Preparar as respostas para inserção
            const answersToInsert = question.respostas.map(r => ({
                question_id: questionId,
                letra: r.letra,
                texto: r.texto,
                correta: r.correta,
            }));
            
            // C. INSERIR AS RESPOSTAS NA TABELA 'answers'
            const { error: answersError } = await supabase
                .from('answers')
                .insert(answersToInsert);

            if (answersError) throw answersError;
        }

        // 4. SUCESSO
        alert("Quiz criado com sucesso!");
        navigate("/home");


    } catch (error) {
        console.error("Erro ao criar quiz:", error);
        alert(`Erro ao salvar no banco de dados: ${error.message}`);
    } finally {
        setIsLoading(false);
    }
  }

  // ------------------------------------------------------------------
  // RENDERIZAÇÃO
  // ------------------------------------------------------------------

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
            {categories.map(
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

              <div className="CheckBoxCriarQuiz inputPoderesCriarQuiz">
                {poderes.map((op) => (
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
                {tempos.map(
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
        <button id="btnAddPergunta" onClick={handleAddQuestion} disabled={questions.length >= 24}>
              +
        </button>

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
                              // Lógica para garantir que apenas uma resposta é correta
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

      <button id="btnCriarQuiz" onClick={handleCreateQuiz} disabled={isLoading}>
        {isLoading ? "Criando..." : "Criar Quiz"}
      </button>
    </div>
  );
}

export default CriarQuiz;