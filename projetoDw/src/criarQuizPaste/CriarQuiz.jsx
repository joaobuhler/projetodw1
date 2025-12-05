import "./criarQuiz.css";

function CriarQuiz() {
  return (
    <div className="ContainerCriarQuiz">
      <h1>Criando um Quiz</h1>

      <div className="cimaQuiz">
        <div className="CategoriasCriarQuiz">
          <h1>Categorias</h1>
          <div className="CheckBoxCriarQuiz">
            <div className="divCriarQuiz">
              <div className="textCriarQuiz">Matemática</div>
              <input type="checkbox" />
            </div>
            <div className="divCriarQuiz">
              <div className="textCriarQuiz">Química</div>
              <input type="checkbox" />
            </div>
            <div className="divCriarQuiz">
              <div className="textCriarQuiz">Computação</div>
              <input type="checkbox" />
            </div>
            <div className="divCriarQuiz">
              <div className="textCriarQuiz">Conhecimentos Gerais</div>
              <input type="checkbox" />
            </div>
          </div>
        </div>
        <div className="categoriasPerguntasCriarQuiz">
          <div className="categoriasCimaCriarQuiz">
            <div className="categoriasPerguntasDireitaCriarQuiz">
              <h1>N de Questões</h1>
              <div className="CheckBoxCriarQuiz">
                    <div className="divCriarQuiz">
                        <div className="TextQuestoes">10</div>
                        <input type="checkbox" />
                    </div>
                    <div className="divCriarQuiz">
                        <div className="TextQuestoes">15</div>
                        <input type="checkbox" />
                    </div>
                    <div className="divCriarQuiz">
                        <div className="TextQuestoes">20</div>
                        <input type="checkbox" />
                    </div>
              </div>
            </div>
            <div className="categoriasPerguntasDireitaCriarQuiz"></div>
          </div>
          <div className="categoriasBaixoCriarQuiz">
            <div className="categoriasPerguntasBaixoCriarQuiz"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CriarQuiz;
