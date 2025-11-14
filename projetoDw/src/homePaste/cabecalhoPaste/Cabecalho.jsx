import "./cabecalho.css";

function Cabecalho() {
  return (
    <div className="cabecalhoContainer">
      <div className="esquerdaCabecalho">
        <button><i class="material-icons">menu</i></button>
        <h1>Quizado</h1>
      </div>
      <div className="direitaCabecalho">
        <button className="botaoLogin">Entrar</button>
        <button className="botaoPerfil"><i class="material-icons">person</i></button>
      </div>
    </div>
  );
}

export default Cabecalho;
