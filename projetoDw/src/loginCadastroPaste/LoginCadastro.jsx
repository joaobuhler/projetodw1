import './loginCadastro.css'
import { useState } from 'react'
import { registerUser, loginUser } from "../supabase";
import { useNavigate } from "react-router-dom";

function Login(){

    const [isCadastro, setIsCadastro] = useState(false)
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [nome, setNome] = useState("");
    const navigate = useNavigate();

    async function handleCadastro() {
        const { error } = await registerUser(email, senha, nome);
        if (error) {
            alert("Erro ao cadastrar: " + error.message);
        } else {
            alert("Cadastro realizado com sucesso!");
            setIsCadastro(true);
        }
    }

    async function handleLogin() {
        const { error } = await loginUser(email, senha);
        if (error) {
            alert("Erro ao fazer login: " + error.message);
        } else {
            navigate("/home");
        }
    }

    return(
        <div>
            <div className="bodyLogin">
                <div className='selectLoginCadastro'>
                    <label class="toogle">
                        <input className="inputLoginCadastro" 
                        type="checkbox"
                        checked={isCadastro}
                        onChange={() => setIsCadastro(!isCadastro)}
                        />
                        <span class="sliderBar"></span>
                    </label>
                </div>

                {isCadastro ? (
                <div className='loginContainer'>
                    <h1>Login</h1>
                    <div className="loginInputContainer">
                        <input 
                            className="inputLoginCadastro" 
                            type="text" 
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input 
                            className="inputLoginCadastro" 
                            type="password" 
                            placeholder='Senha'
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                    </div>
                    <div className="loginButtonContainer">
                        <button className='buttonRocket botaoLoginCadastro' onClick={handleLogin}>
                            <i class="material-icons">rocket_launch</i>
                            <span>Entrar</span>
                        </button>
                        <button className='botaoLoginCadastro'>
                            <span>Google</span>
                        </button>
                    </div>
                </div>

                ) : (

                <div className='cadastroContainer'>
                    <h1>Cadastro</h1>
                    <div className="loginInputContainer">
                        <input 
                            className="inputLoginCadastro" 
                            type="text" 
                            placeholder='Nome'
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                        <input 
                            className="inputLoginCadastro" 
                            type="text" 
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input 
                            className="inputLoginCadastro" 
                            type="password" 
                            placeholder='Senha'
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                        />
                    </div>
                    <div className="loginButtonContainer">
                        <button className='buttonRocket botaoLoginCadastro' onClick={handleCadastro}>
                            <i class="material-icons">rocket_launch</i>
                            <span>Cadastrar-se</span>
                        </button>
                    </div>
                </div>
                )}
            </div>
        </div>
    )
}

export default Login