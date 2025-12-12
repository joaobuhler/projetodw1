import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./global.css";
import "./theme.css";

import Home from "./homePaste/Home";
import Login from "./loginCadastroPaste/LoginCadastro";
import CriarQuiz from "./criarQuizPaste/CriarQuiz";
import EntrarSala from "./entrarSalaPaste/EntrarSala";
import TopGlobal from "./rankingPaste/TopGlobal";
import JogarQuiz from "./jogarQuizPaste/JogarQuiz";
import TerminarQuiz from "./jogarQuizPaste/TerminarQuiz";
import RankingFinal from "./rankingPaste/RankingFinal";

function App() {

  // ====== MODO ESCURO GLOBAL =======
  const [modoEscuro, setModoEscuro] = useState(() => {
    const salvo = localStorage.getItem("modoEscuro");
    return salvo ? JSON.parse(salvo) : false;
  });

  useEffect(() => {
    const root = document.documentElement;

    if (modoEscuro) {
      root.style.setProperty("--cor-principal", "#024950");
      root.style.setProperty("--cor-fundo", "#161616");
      root.style.setProperty("--cor-detalhes", "#1c5966");
      root.style.setProperty("--cor-escura", "#172a3a");
      root.style.setProperty("--cor-navbar", "rgb(17, 17, 17)");
      root.style.setProperty("--cor-texto", "#ffffff");
    } else {
      root.style.setProperty("--cor-principal", "#82c0cc");
      root.style.setProperty("--cor-fundo", "#edf2f4");
      root.style.setProperty("--cor-detalhes", "#489fb5");
      root.style.setProperty("--cor-escura", "#16697a");
      root.style.setProperty("--cor-navbar", "#489fb5");
      root.style.setProperty("--cor-texto", "#000000");
    }

    localStorage.setItem("modoEscuro", JSON.stringify(modoEscuro));
  }, [modoEscuro]);
  // ==================================

  return (
    <Router>

      {/* BOTÃO GLOBAL DO TEMA */}
      <div 
        id='botaoMode'
        onClick={() => setModoEscuro(!modoEscuro)}
        role="button"
        aria-pressed={modoEscuro}
      >
        <i className="material-icons">
          {modoEscuro ? "dark_mode" : "light_mode"}
        </i>
      </div>

      <Routes>
        <Route path="/CriarQuiz" element={<CriarQuiz />} />
        <Route path="/EntrarSala" element={<EntrarSala />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />

        <Route path="/jogarQuiz/:id" element={<JogarQuiz />} />

        <Route path="/topglobal" element={<TopGlobal />} />
        <Route path="/rankingfinal" element={<RankingFinal />} />
        <Route path="/terminarQuiz" element={<TerminarQuiz />} />
      </Routes>
    </Router>
  );
}

export default App;
