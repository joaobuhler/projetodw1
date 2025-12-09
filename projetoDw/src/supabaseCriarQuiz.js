import { supabase } from "./supabase";

// =========================
// CRIAR QUIZ
// =========================
async function criarQuiz({ quizName, selectedCategory, selectedPoderes, selectedTempo, selectedDifficulty }) {
  const { data: { user } } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("quizzes")
    .insert({
      user_id: user.id,
      nome: quizName,
      categoria: selectedCategory,
      permitir_poderes: selectedPoderes === "Sim",
      tempo: selectedTempo,
      dificuldade: selectedDifficulty,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// =========================
// SALVAR PERGUNTAS
// =========================
async function salvarPerguntas(quizId, questions) {
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];

    const { data: pergunta } = await supabase
      .from("questions")
      .insert({
        quiz_id: quizId,
        pergunta: q.pergunta,
        ordem: i + 1,
      })
      .select()
      .single();

    await Promise.all(
      q.respostas.map((r) =>
        supabase.from("answers").insert({
          question_id: pergunta.id,
          letra: r.letra,
          texto: r.texto,
          correta: r.correta,
        })
      )
    );
  }
}

// =========================
// EXPORT
// =========================
export default {
  criarQuiz,
  salvarPerguntas,
};
