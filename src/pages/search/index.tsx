import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import searchAlbumsAPI from '../../services/searchAlbumsAPI';
import Loading from '../../components/loading';
import { AlbumType } from '../../types';
import './style.css'; // Importe o arquivo CSS

export default function Search() {
  // Estado para o nome do artista
  const [artistName, setArtistName] = useState({ artist: '' });
  // Estado para controlar se o botão de pesquisa está desabilitado
  const [btnDisabled, setBtnDisabled] = useState(true);
  // Estado para controlar o carregamento
  const [isLoading, setIsLoading] = useState<boolean>();
  // Estado para armazenar os álbuns encontrados
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  // Estado para armazenar o nome do artista atual
  const [actualArtist, setActualArtist] = useState('');

  useEffect(() => {
    // Função para verificar se o nome do artista é maior que 1 caractere
    const verifyLength = () => ((artistName.artist.length > 1)
      ? setBtnDisabled(false)
      : setBtnDisabled(true));
    verifyLength();
  }, [artistName.artist]);

  // Função para lidar com o clique no botão de pesquisa
  const hPerquisaClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsLoading(true);
    e.preventDefault(); // Prevenir o comportamento padrão do formulário
    // Chamar a API de pesquisa de álbuns
    const albumsList = await searchAlbumsAPI(artistName.artist);
    // Atualizar o estado com o nome do artista atual
    setActualArtist(artistName.artist);
    // Limpar o campo de pesquisa
    setArtistName({ artist: '' });
    // Atualizar o estado com a lista de álbuns encontrados
    setAlbums(albumsList);
    setIsLoading(false);
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <form action="">
        {/* Campo de entrada para o nome do artista */}
        <label htmlFor="artist-input">
          <input
            type="text"
            id="artist-input"
            placeholder="Digite sua pesquisa"
            data-testid="search-artist-input"
            value={ artistName.artist }
            onChange={ (e) => setArtistName({ artist: e.target.value }) }
          />
        </label>
        {/* Botão de pesquisa */}
        <button
          onClick={ (e) => hPerquisaClick(e) }
          data-testid="search-artist-button"
          disabled={ btnDisabled }
        >
          Pesquisar
        </button>
      </form>
      {albums.length > 0
      && <h2>{`Resultado de álbuns de: ${actualArtist}`}</h2>}
      {albums.length === 0
        ? <h2>Nenhum álbum foi encontrado</h2>
        : albums.map((album, index) => (
          // Lista de álbuns encontrados
          <div key={ index }>
            <NavLink
              to={ `/album/${album.collectionId}` }
              data-testid={ `link-to-album-${album.collectionId}` }
            >
              {album.collectionName}
            </NavLink>
            <br />
          </div>
        ))}
    </>
  );
}
