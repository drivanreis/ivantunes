import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/userAPI';
import Loading from '../../components/loading';
import './style.css'; // Importe o arquivo CSS

export default function Login() {
  // Estado para o nome de usuário
  const [userName, setUserName] = useState({ name: '' });
  // Estado para controlar se o botão de cadastro está desabilitado
  const [btnDisabled, setBtnDisabled] = useState(true);
  // Estado para controlar o carregamento
  const [isLoading, setIsLoading] = useState<boolean>();

  useEffect(() => {
    // Função para verificar se o nome de usuário possui mais de 2 caracteres
    const verificaLen = () => ((userName.name.length > 2)
      ? setBtnDisabled(false)
      : setBtnDisabled(true));

    verificaLen();
  }, [userName.name]);

  // Hook para navegar entre as rotas
  const navigate = useNavigate();

  // Função para lidar com o clique no botão de cadastro
  const hCadastrar = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsLoading(true);
    e.preventDefault(); // Prevenir o comportamento padrão do formulário
    // Chamar a API para criar um usuário
    const users = await createUser(userName);
    console.log(users);
    setIsLoading(false);
    // Navegar para a página '/search'
    navigate('/search');
  };

  if (isLoading) return <Loading />;

  return (
    <div className="login">
      <h1>Trybetunes</h1>
      <h2>Login</h2>
      <form action="submit">
        {/* Campo de entrada para o nome de usuário */}
        <label htmlFor="login">
          Nome:
          <input
            type="text"
            data-testid="login-name-input"
            id="login"
            placeholder="Digite seu nome"
            value={ userName.name }
            onChange={ (e) => setUserName({ name: e.target.value }) }
          />
        </label>
        {/* Botão de cadastro */}
        <button
          disabled={ btnDisabled }
          data-testid="login-submit-button"
          onClick={ (e) => hCadastrar(e) }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
