import './jogarQuiz.css';

function JogarQuiz(){
    return(
        <div className='bodyJogarQuiz'>
            <div className='containerJogarQuiz'>
                <div className='perguntaJogarQuiz'>
                    <div className='numAlternativa'>1</div>
                    <h1>Qual é o melhor amigo do Calestano Miguel de Andrade Sousa?</h1>
                </div>
                <div className='containerAlternativasJogar'>
                    <div className='alternativaJogar'>
                        <div className='numAlternativa'>a</div>
                        <div className='textAlternativa'>Minha banana é muito gigante e deliciosa</div>
                    </div>
                    <div className='alternativaJogar'>
                        <div className='numAlternativa'>b</div>
                        <div className='textAlternativa'>Minha banana é muito gigante e deliciosa</div>
                    </div>
                    <div className='alternativaJogar'>
                        <div className='numAlternativa'>c</div>
                        <div className='textAlternativa'>Minha banana é muito gigante e deliciosa</div>
                    </div>
                    <div className='alternativaJogar'>
                        <div className='numAlternativa'>d</div>
                        <div className='textAlternativa'>Minha banana é muito gigante e deliciosa</div>
                    </div>
                </div>
            </div>
            <div className='containerPoderes'>
                <div id='timerJogar'>00:27</div>
                <div className='containerContainerPoderes'>
                    <div className='poderesJogar'>
                        <i className="material-icons iconPoder">timer_off</i>
                        <div className='quantidadePoderes'>
                            1
                        </div>
                    </div>
                    <div className='poderesJogar'>
                        <i className="material-icons iconPoder">done_all</i>
                        <div className='quantidadePoderes'>
                            2
                        </div>
                    </div>
                    <div className='poderesJogar'>
                        <i className="material-icons iconPoder">leak_remove</i>
                        <div className='quantidadePoderes'>
                            0
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default JogarQuiz