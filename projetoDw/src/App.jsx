
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
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/CriarQuiz" element={<CriarQuiz />} />
        <Route path="/EntrarSala" element={<EntrarSala />} />
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        
        {/* ROTA CORRETA */}
        <Route path="/jogarQuiz/:id" element={<JogarQuiz />} />
        
        <Route path="/topglobal" element={<TopGlobal />} />
        <Route path="/rankingfinal" element={<RankingFinal />} />
        <Route path="/terminarQuiz" element={<TerminarQuiz />} />
      </Routes>
    </Router>
  );
}


export default App;
