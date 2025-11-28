import "./global.css";
import "./theme.css";
import Home from "./homePaste/Home";
import Login from "./loginCadastroPaste/LoginCadastro";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
