import './home.css'
import Cabecalho from './cabecalhoPaste/Cabecalho'
import Navbar from './navbarPaste/Navbar'
import Corpo from './corpoPaste/Corpo'

function Home(){
    return(
        <div>
            <div className='homeContainer'>
                <Cabecalho />
                <div className='homeBaixoCabecalho'>
                    <Navbar />
                    <Corpo />
                </div>
            </div>
        </div>
    )
}

export default Home