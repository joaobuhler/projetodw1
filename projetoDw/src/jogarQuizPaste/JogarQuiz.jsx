import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import "./jogarQuiz.css";

// ================================================
// 🔥 Conversor universal de tempo (text → segundos)
// ================================================
function converterTempoParaSegundos(texto) {
  if (!texto) return 30;

  const lower = texto.toLowerCase().trim();

  if (lower.includes("seg")) {
    return parseInt(lower) || 30;
  }

  if (lower.includes("min")) {
    const n = parseInt(lower);
    return n ? n * 60 : 60;
  }

  return 30;
}

function JogarQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [indexAtual, setIndexAtual] = useState(0);
  const [respostasMarcadas, setRespostasMarcadas] = useState([]);

  // poderes corrigidos
  const [poderes, setPoderes] = useState({
    congelar: 1,
    eliminar: 1,
    vida: 1,
  });

  // para guardar alternativas eliminadas
  const [eliminadas, setEliminadas] = useState([]);

  const [tempoInicial, setTempoInicial] = useState(30);
  const [timer, setTimer] = useState(30);

  const timerRef = useRef(timer);
  useEffect(() => {
    timerRef.current = timer;
  }, [timer]);

  const perguntaAtual = questions[indexAtual];

  // ================================================
  // 🔥 Carregar quiz + perguntas
  // ================================================
  useEffect(() => {
    async function carregar() {
      const { data: quizData, error: quizErr } = await supabase
        .from("quizzes")
        .select("*")
        .eq("id", id)
        .single();

      if (quizErr) {
        console.error("Erro ao buscar quiz:", quizErr);
        return;
      }

      setQuiz(quizData);

      const tempoTexto = quizData?.tempo ?? "30 segundos";
      const tempoConvertido = converterTempoParaSegundos(tempoTexto);

      setTempoInicial(tempoConvertido);
      setTimer(tempoConvertido);

      const { data: questionsData } = await supabase
        .from("questions")
        .select("*")
        .eq("quiz_id", id)
        .order("ordem", { ascending: true });

      const perguntasComRespostas = await Promise.all(
        (questionsData || []).map(async (q) => {
          const { data: answersData } = await supabase
            .from("answers")
            .select("*")
            .eq("question_id", q.id)
            .order("letra", { ascending: true });

          return { ...q, answers: answersData || [] };
        })
      );

      setQuestions(perguntasComRespostas);
    }

    carregar();
  }, [id]);

  // ================================================
  // ⏳ Timer por pergunta
  // ================================================
  useEffect(() => {
    if (!perguntaAtual) return;

    setEliminadas([]); // resetar eliminações quando trocar pergunta
    setTimer(tempoInicial);

    const interval = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          clearInterval(interval);

          // se tiver vida → usa
          if (poderes.vida > 0) {
            setPoderes((p) => ({ ...p, vida: p.vida - 1 }));
            proximaPergunta(null, { ignorarErro: true });
            return 0;
          }

          proximaPergunta(null);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [indexAtual, perguntaAtual, tempoInicial]);

  // ================================================
  // Registrar resposta
  // ================================================
  function escolherResposta(resposta) {
    // se alternativa eliminada, não deixa clicar
    if (eliminadas.includes(resposta.id)) return;

    // se errou e tem vida
    if (!resposta.correta && poderes.vida > 0) {
      setPoderes((p) => ({ ...p, vida: p.vida - 1 }));
      proximaPergunta(null, { ignorarErro: true });
      return;
    }

    proximaPergunta(resposta);
  }

  function proximaPergunta(resposta, config = {}) {
    const tempoGasto = tempoInicial - (timerRef.current ?? timer);

    const registro = {
      perguntaId: perguntaAtual?.id ?? null,
      correta: config.ignorarErro ? true : !!resposta?.correta,
      respostaId: resposta?.id ?? null,
      tempoGasto,
    };

    const novo = [...respostasMarcadas, registro];
    setRespostasMarcadas(novo);

    if (indexAtual + 1 >= questions.length) {
      finalizarQuiz(novo);
      return;
    }

    setIndexAtual((i) => i + 1);
  }

  // ================================================
  // 🧠 Poderes
  // ================================================

  // ❄ CONGELAR TEMPO — adiciona EXACT 10s
  function usarCongelar() {
    if (poderes.congelar <= 0) return;
    setPoderes((p) => ({ ...p, congelar: p.congelar - 1 }));
    setTimer((t) => t + 10);
  }

  // ✂ ELIMINAR 2 alternativas incorretas
  function usarEliminar() {
    if (poderes.eliminar <= 0) return;
    if (!perguntaAtual) return;

    const incorretas = perguntaAtual.answers.filter((a) => !a.correta);

    // pega 2 aleatórias
    const selecionadas = incorretas
      .sort(() => Math.random() - 0.5)
      .slice(0, 2)
      .map((a) => a.id);

    setEliminadas(selecionadas);
    setPoderes((p) => ({ ...p, eliminar: p.eliminar - 1 }));
  }

  // ================================================
  // 🏁 Finalizar quiz
  // ================================================
  function finalizarQuiz(respostasFinais) {
    const total = questions.length;
    const acertos = respostasFinais.filter((r) => r.correta).length;
    const totalTempo = respostasFinais.reduce((acc, x) => acc + x.tempoGasto, 0);
    const tempoMedio = totalTempo / respostasFinais.length;

    let pontosPorQuestao = 500;
    if (quiz?.dificuldade === "Médio") pontosPorQuestao = 750;
    if (quiz?.dificuldade === "Difícil") pontosPorQuestao = 1000;

    const pontos = acertos * pontosPorQuestao;

    navigate("/terminarQuiz", {
      state: { acertos, total, tempoMedio, pontos },
    });
  }

  if (!quiz || questions.length === 0) {
    return <div className="bodyJogarQuiz">Carregando...</div>;
  }

  return (
    <div className="bodyJogarQuiz">
      <div className="containerJogarQuiz">
        <div className="perguntaJogarQuiz">
          <div className="numAlternativa">{indexAtual + 1}</div>
          <h1>{perguntaAtual?.pergunta}</h1>
        </div>

        <div className="containerAlternativasJogar">
          {perguntaAtual.answers?.map((a) => (
            <div
              key={a.id}
              className={`alternativaJogar ${
                eliminadas.includes(a.id) ? "alternativaEliminada" : ""
              }`}
              onClick={() => escolherResposta(a)}
            >
              <div className="numAlternativa">{a.letra.toUpperCase()}</div>
              <div className="textAlternativa">{a.texto}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="containerPoderes">
        <div id="timerJogar">
          {String(Math.floor(timer / 60)).padStart(2, "0")}:
          {String(timer % 60).padStart(2, "0")}
        </div>

        <div className="containerContainerPoderes">
          <div className="poderesJogar" onClick={usarCongelar}>
            <i className="material-icons iconPoder">ac_unit</i>
            <div className="quantidadePoderes">{poderes.congelar}</div>
          </div>

          <div className="poderesJogar" onClick={usarEliminar}>
            <i className="material-icons iconPoder">block</i>
            <div className="quantidadePoderes">{poderes.eliminar}</div>
          </div>

          <div className="poderesJogar">
            <i className="material-icons iconPoder">favorite</i>
            <div className="quantidadePoderes">{poderes.vida}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JogarQuiz;
