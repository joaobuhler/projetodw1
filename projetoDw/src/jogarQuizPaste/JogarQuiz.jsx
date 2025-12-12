import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import "./jogarQuiz.css";

function converterTempoParaSegundos(texto) {
  if (!texto) return 30;
  const lower = texto.toLowerCase().trim();
  if (lower.includes("seg")) return parseInt(lower) || 30;
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

  // Agora só existem 2 poderes
  const [poderes, setPoderes] = useState({ congelar: 0, eliminar: 0 });
  const poderesRef = useRef(poderes);
  useEffect(() => { poderesRef.current = poderes; }, [poderes]);

  const [eliminadas, setEliminadas] = useState([]);
  const [bloqueado, setBloqueado] = useState(false);

  const [tempoInicial, setTempoInicial] = useState(30);
  const [timer, setTimer] = useState(30);
  const timerRef = useRef(timer);
  useEffect(() => { timerRef.current = timer; }, [timer]);

  const perguntaAtual = questions[indexAtual];

  // Feedback
  const [respostaSelecionada, setRespostaSelecionada] = useState(null);

  // =======================================
  // CARREGAR QUIZ
  // =======================================
  useEffect(() => {
    async function carregar() {
      const { data: quizData } = await supabase
        .from("quizzes")
        .select("*")
        .eq("id", id)
        .single();

      setQuiz(quizData);

      const tempoConvertido = converterTempoParaSegundos(quizData?.tempo ?? "30 segundos");
      setTempoInicial(tempoConvertido);
      setTimer(tempoConvertido);

      const { data: questionsData } = await supabase
        .from("questions")
        .select("*")
        .eq("quiz_id", id)
        .order("ordem", { ascending: true });

      const perguntasComRespostas = await Promise.all((questionsData || []).map(async (q) => {
        const { data: answersData } = await supabase
          .from("answers")
          .select("*")
          .eq("question_id", q.id)
          .order("letra", { ascending: true });
        return { ...q, answers: answersData || [] };
      }));

      setQuestions(perguntasComRespostas);
    }

    carregar();
  }, [id]);

  // =======================================
  // SORTEIO DE PODERES (apenas 2 agora)
  // =======================================
  useEffect(() => {
    if (!quiz || questions.length === 0) {
      setPoderes({ congelar: 0, eliminar: 0 });
      return;
    }

    if (!quiz.permitir_poderes) {
      setPoderes({ congelar: 0, eliminar: 0 });
      return;
    }

    const total = questions.length;
    const totalP = Math.floor(total * 0.5);
    let congelar = 0, eliminar = 0;

    for (let i = 0; i < totalP; i++) {
      const r = Math.floor(Math.random() * 2);
      if (r === 0) congelar++;
      if (r === 1) eliminar++;
    }

    setPoderes({ congelar, eliminar });
  }, [quiz, questions]);

  // =======================================
  // TIMER (sem vida extra)
  // =======================================
  useEffect(() => {
    if (!perguntaAtual) return;

    setEliminadas([]);
    setRespostaSelecionada(null);
    setTimer(tempoInicial);
    setBloqueado(false);

    let interval = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          clearInterval(interval);
          proximaPergunta(null);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [indexAtual, perguntaAtual, tempoInicial, quiz]);

  // =======================================
  // ESCOLHER RESPOSTA (sem vida)
  // =======================================
  function escolherResposta(a) {
    if (bloqueado) return;
    if (eliminadas.includes(a.id)) return;

    setBloqueado(true);

    if (a.correta) {
      setRespostaSelecionada({ id: a.id, status: "correta" });
    } else {
      setRespostaSelecionada({ id: a.id, status: "errada" });
    }

    proximaPergunta(a);
  }

  // =======================================
  // PROXIMA PERGUNTA
  // =======================================
  function proximaPergunta(resposta, config = {}) {
    const tempoGasto = tempoInicial - (timerRef.current ?? timer);

    const registro = {
      perguntaId: perguntaAtual?.id ?? null,
      correta: config.ignorarErro ? false : !!resposta?.correta,
      respostaId: resposta?.id ?? null,
      tempoGasto,
    };

    const novo = [...respostasMarcadas, registro];
    setRespostasMarcadas(novo);

    if (indexAtual + 1 >= questions.length)
      return finalizarQuiz(novo);

    setTimeout(() => {
      setIndexAtual((i) => i + 1);
    }, 600);
  }

  // =======================================
  // PODERES
  // =======================================
  function usarCongelar() {
    if (!quiz?.permitir_poderes) return;
    if (poderes.congelar <= 0) return;
    setPoderes((p) => ({ ...p, congelar: p.congelar - 1 }));
    setTimer((t) => t + 10);
  }

  function usarEliminar() {
    if (!quiz?.permitir_poderes) return;
    if (poderes.eliminar <= 0) return;
    if (!perguntaAtual) return;

    const incorretas = perguntaAtual.answers.filter((a) => !a.correta);
    const escolhidas = incorretas
      .sort(() => Math.random() - 0.5)
      .slice(0, 2)
      .map((a) => a.id);

    setEliminadas(escolhidas);
    setPoderes((p) => ({ ...p, eliminar: p.eliminar - 1 }));
  }

  // =======================================
  // FINALIZAR
  // =======================================
  function finalizarQuiz(respostasFinais) {
    const total = questions.length;
    const acertos = respostasFinais.filter((r) => r.correta).length;
    const totalTempo = respostasFinais.reduce((acc, x) => acc + x.tempoGasto, 0);
    const tempoMedio = totalTempo / respostasFinais.length;

    let pontosPorQuestao = 500;
    if (quiz?.dificuldade === "Médio") pontosPorQuestao = 750;
    if (quiz?.dificuldade === "Difícil") pontosPorQuestao = 1000;

    navigate("/terminarQuiz", {
      state: { acertos, total, tempoMedio, pontos: acertos * pontosPorQuestao },
    });
  }

  if (!quiz || questions.length === 0)
    return <div className="bodyJogarQuiz">Carregando...</div>;

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
              className={`alternativaJogar 
                ${bloqueado ? "alternativaDesativada" : ""}
                ${eliminadas.includes(a.id) ? "alternativaEliminada" : ""}
                ${respostaSelecionada?.id === a.id && respostaSelecionada.status === "correta" ? "alternativaCorreta" : ""}
                ${respostaSelecionada?.id === a.id && respostaSelecionada.status === "errada" ? "alternativaErrada" : ""}
              `}
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

        {quiz.permitir_poderes && (
          <div className="containerContainerPoderes">
            {/* Congelar */}
            <div
              className={`poderesJogar ${poderes.congelar <= 0 ? "poder-bloqueado" : ""}`}
              onClick={usarCongelar}
            >
              <i className="material-icons iconPoder">ac_unit</i>
              <div className="quantidadePoderes">{poderes.congelar}</div>
            </div>

            {/* Eliminar */}
            <div
              className={`poderesJogar ${poderes.eliminar <= 0 ? "poder-bloqueado" : ""}`}
              onClick={usarEliminar}
            >
              <i className="material-icons iconPoder">block</i>
              <div className="quantidadePoderes">{poderes.eliminar}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default JogarQuiz;
