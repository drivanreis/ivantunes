import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, updateUser } from '../../services/userAPI';
import { UserType, UserIni } from '../../types';
import Loading from '../../components/loading';
import './style.css';

export default function ProfileEdit() {
  const [dado, setDado] = useState<UserType>(UserIni);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const verificaInput = (objVerr: UserType) => {
    return (
      objVerr.name.length === 0
      || objVerr.email.length === 0
      || objVerr.image.length === 0
      || objVerr.description.length === 0
    );
  };

  const hEntraMudanca = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    const updatedDado = { ...dado, [id]: value };
    setDado(updatedDado);
  };

  useEffect(() => {
    const fetchPerfil = async () => {
      setIsLoading(true);
      const fdados = await getUser();
      setDado(fdados);
      setIsLoading(false);
    };

    fetchPerfil();
  }, []);

  const hSalva = async () => {
    setIsLoading(true);
    const salvoOK = await updateUser(dado);
    console.log(salvoOK);
    setIsLoading(false);
    navigate('/profile');
  };

  if (isLoading) return <Loading />;

  const btnSalva = verificaInput(dado);

  return (
    <div className="formulario">
      <label htmlFor="name">Nome</label>
      <br />
      <input
        data-testid="edit-input-name"
        type="text"
        name="name"
        id="name"
        value={ dado.name }
        onChange={ hEntraMudanca }
      />
      <br />
      <br />

      <label htmlFor="email">E-mail</label>
      <br />
      <input
        data-testid="edit-input-email"
        type="text"
        name="email"
        id="email"
        value={ dado.email }
        onChange={ hEntraMudanca }
      />
      <br />
      <br />
      <label htmlFor="image">Imagem</label>
      <br />
      <input
        data-testid="edit-input-image"
        type="text"
        name="image"
        id="image"
        value={ dado.image }
        onChange={ hEntraMudanca }
      />
      <br />
      <br />
      <label htmlFor="description">Descrição</label>
      <br />
      <input
        data-testid="edit-input-description"
        type="text"
        name="description"
        id="description"
        value={ dado.description }
        onChange={ hEntraMudanca }
      />
      <br />
      <br />
      <button
        data-testid="edit-button-save"
        className="btnBotao"
        disabled={ btnSalva }
        onClick={ hSalva }
      >
        Salvar
      </button>
    </div>
  );
}
