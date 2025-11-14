import { useState } from "react";
import "./cabecalho.css";
import Navbar from "../navbarPaste/Navbar";

function Cabecalho() {

  const [navbarAberta, setNavbarAberta] = useState(false);

  function toggleNavbar() {
    setNavbarAberta(!navbarAberta);
  }

  return (
    <>
    <div className="cabecalhoContainer">
      <div className="esquerdaCabecalho">
        <button onClick={toggleNavbar}><i class="material-icons" >menu</i></button>
        <h1>Quizado</h1>
      </div>
      <div className="direitaCabecalho">
        <button className="botaoLogin">Entrar</button>
        <button className="botaoPerfil"><i class="material-icons">person</i></button>
      </div>
    </div>

    <Navbar aberta={navbarAberta} />
    </>
  );
  
}



export default Cabecalho;
