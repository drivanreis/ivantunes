import { useEffect, useState } from 'react';
import MusicCard from '../../components/musicCard';
import { getFavoriteSongs, removeSong } from '../../services/favoriteSongsAPI';
import { SongType } from '../../types';
import Loading from '../../components/loading';
import './style.css'; // Importe o arquivo CSS

export default function Favorites() {
  // Estado para armazenar as músicas favoritas
  const [favorites, setFavorites] = useState<SongType[]>();
  // Estado para controlar a mudança de chave (usado para forçar uma atualização)
  const [changeKey, setChangeKey] = useState(true);
  // Estado para controlar o carregamento
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Função para buscar músicas favoritas
    const fetchFavorites = async () => {
      setIsLoading(true);
      // Chamar a API para obter as músicas favoritas
      const data = await getFavoriteSongs();
      setFavorites([...data]);
      setIsLoading(false);
    };

    fetchFavorites();
  }, [changeKey]);

  // Função para remover uma música dos favoritos
  const hRemovefav = (favorite: SongType) => {
    // Chamar a API para remover a música dos favoritos
    removeSong(favorite);
    // Mudar a chave para forçar uma nova busca de músicas favoritas
    setChangeKey(!changeKey);
  };

  if (isLoading) return (<Loading />);

  return (
    <section>
      {/* Mapear e exibir músicas favoritas como cartões */}
      {favorites?.map((fav) => (
        <MusicCard
          key={ fav.trackId }
          previewUrl={ fav.previewUrl }
          trackId={ fav.trackId }
          trackName={ fav.trackName }
          isChecked
          hChange={ () => hRemovefav(fav) }
        />
      ))}
    </section>
  );
}
