import './home.css'
import Cabecalho from './cabecalhoPaste/Cabecalho'
import Corpo from './corpoPaste/Corpo'
import Rodape from './rodapePaste/Rodape'

function Home(){
    return(
        <div className='telaHome'>
            <Cabecalho />
            <Corpo />
            <Rodape />
        </div>
    )
}

export default Home