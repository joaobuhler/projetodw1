import "./global.css";
import "./theme.css";
import Home from "./homePaste/Home";
import Login from "./loginCadastroPaste/LoginCadastro";
import CriarQuiz from "./criarQuizPaste/CriarQuiz";
import EntrarSala from "./entrarSalaPaste/EntrarSala";
import TopGlobal from "./rankingPaste/TopGlobal";
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
        <Route path="/topglobal" element={<TopGlobal />} />
        <Route path="/rankingfinal" element={<RankingFinal />} />
      </Routes>
    </Router>
  );
}

export default App;
