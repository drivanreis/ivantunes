import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUser } from '../../services/userAPI';
import Loading from '../loading';
import iconPesquisa from '../../images/pesquisa.svg';
import iconFavorito from '../../images/favorito.svg';
import iconPerfil from '../../images/perfil.svg';
import './style.css'; // Importe o arquivo CSS

export default function Header() {
  const [isLoading, setIsLoading] = useState<boolean>();
  const [userName, setUserName] = useState<string>();

  useEffect(() => {
    const userGet = async () => {
      setIsLoading(true);
      const user = await getUser();
      setUserName(user.name);
      setIsLoading(false);
    };

    userGet();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <header className="header" data-testid="header-component">
      <h1 className="header-user-name" data-testid="header-user-name">{userName}</h1>
      <NavLink
        to="/search"
        className="nav-link"
        data-testid="link-to-search"
      >
        <img className="rotating-image" src={ iconPesquisa } alt="iconPesquisa" />
        Pesquisa
      </NavLink>
      <br />
      <NavLink
        to="/favorites"
        className="nav-link"
        data-testid="link-to-favorites"
      >
        <img className="rotating-image" src={ iconFavorito } alt="iconFavorito" />
        Favoritas
      </NavLink>
      <br />
      <NavLink
        to="/profile"
        className="nav-link"
        data-testid="link-to-profile"
      >
        <img className="image" src={ iconPerfil } alt="iconPerfil" />
        Perfil
      </NavLink>
    </header>
  );
}
