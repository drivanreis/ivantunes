import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Loading from '../../components/loading';
import { getUser } from '../../services/userAPI';
import { UserType } from '../../types';
import './style.css'; // Importe o arquivo CSS

export default function Profile() {
  const [perfil, setPerfil] = useState<UserType>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPerfil = async () => {
      setIsLoading(true);
      const dados = await getUser();
      setPerfil(dados);
      setIsLoading(false);
    };

    fetchPerfil();
  }, []);

  if (isLoading) return (<Loading />);

  return (
    <section>
      <br />
      <img data-testid="profile-image" src={ perfil?.image } alt="IcoPerfil" />
      <br />
      <br />
      <NavLink to="/profile/edit">Editar perfil</NavLink>

      <h4>Nome</h4>
      <h5>{ perfil?.name }</h5>

      <h4>E-mail</h4>
      <h5>{ perfil?.email}</h5>

      <h4>Descrição</h4>
      <h5>{ perfil?.description}</h5>
    </section>
  );
}
