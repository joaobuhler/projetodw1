import { useState, useEffect } from "react";
import './corpo.css';

function Corpo() {
    const [modoEscuro, setModoEscuro] = useState(false);

    useEffect(() => {
        const root = document.documentElement;

        if (modoEscuro) {
            root.style.setProperty("--cor-principal", "#024950");
            root.style.setProperty("--cor-fundo", "#161616");
            root.style.setProperty("--cor-detalhes", "#1c5966");
            root.style.setProperty("--cor-escura", "#172a3a");
            root.style.setProperty("--cor-navbar", "rgb(17, 17, 17)");
        } else {
            root.style.setProperty("--cor-principal", "#82c0cc");
            root.style.setProperty("--cor-fundo", "#edf2f4");
            root.style.setProperty("--cor-detalhes", "#489fb5");
            root.style.setProperty("--cor-escura", "#16697a");
            root.style.setProperty("--cor-navbar", "#489fb5");
        }
    }, [modoEscuro]);

    return (
        <div className='corpoContainer'>
            <div 
                id='botaoMode' 
                onClick={() => setModoEscuro(!modoEscuro)}
            >
                <i className="material-icons">
                    {modoEscuro ? "dark_mode" : "light_mode"}
                </i>
            </div>
        </div>
    );
}

export default Corpo;
