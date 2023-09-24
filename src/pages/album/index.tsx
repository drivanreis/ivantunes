import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import getMusics from '../../services/musicsAPI';
import Loading from '../../components/loading';
import MusicCard from '../../components/musicCard';
import './style.css'; // Importe o arquivo CSS

import { AlbumType, SongType } from '../../types';
import { addSong, getFavoriteSongs, removeSong } from '../../services/favoriteSongsAPI';

export type FavoriteProps = {
  trackName: string,
  previewUrl: string,
  trackId: number,
};

export default function Album() {
  // Estado para controlar o carregamento da página
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { id } = useParams();
  // Estado para armazenar os detalhes do álbum
  const [album, setAlbum] = useState<AlbumType>();
  // Estado para armazenar a lista de músicas do álbum
  const [songsList, setSongsList] = useState<SongType[]>();
  // Estado para armazenar a lista de músicas favoritas
  const [favoritesList, setFavoritesList] = useState<FavoriteProps[]>([]);
  // Estado para controlar mudanças na página
  const [change, setChange] = useState(true);
  // Estado para armazenar os índices das músicas favoritas
  const [favoritesIndex, setFavoritesIndex] = useState<boolean[]>([]);
  // Estado para armazenar a música favorita atual
  const [actualFavorite, setActualFavorite] = useState<SongType>();
  // Estado para controlar a adição ou remoção de músicas favoritas
  const [addRemove, setAddRemove] = useState<boolean>();

  // Função para pesquisar músicas favoritas
  const fPesquisaFavoritos = async (songList: SongType[]) => {
    const favsList = await getFavoriteSongs();
    // Verificar se cada música na lista é favorita e armazenar os resultados nos índices
    const checkArray = songList.map((song: SongType) => {
      const checkFavs = favsList.map((favs) => (favs.trackId === song.trackId));
      return !!checkFavs.includes(true);
    });

    setFavoritesIndex([...checkArray]);
    setFavoritesList(favsList);
  };

  useEffect(() => {
    // Função para buscar as músicas do álbum e informações relacionadas
    const fetchMusics = async () => {
      setIsLoading(true);
      const data = await getMusics(id ?? '');
      setAlbum(data[0]);
      // Slice para obter apenas as músicas após os detalhes do álbum
      const musics = data.slice(1) as SongType[];
      setSongsList([...musics]);
      fPesquisaFavoritos(musics);
      setIsLoading(false);
    };

    fetchMusics();
  }, [id]);

  useEffect(() => {
    // Função para adicionar ou remover músicas favoritas via API
    const addRemoveApi = async (actualFavoriteSong: SongType, addOrRemove: boolean) => {
      if (!addOrRemove) {
        removeSong(actualFavoriteSong);
      } else {
        addSong(actualFavoriteSong);
      }
    };

    if (addRemove !== undefined
      && actualFavorite !== undefined) addRemoveApi(actualFavorite, addRemove);
  }, [favoritesList, addRemove, actualFavorite]);

  // Função para lidar com a alteração na lista de favoritos
  const hFavListaAlterada = (idOfTrack: number) => {
    const actualFav = songsList?.find((fav) => fav.trackId === idOfTrack);
    if (actualFav !== undefined && songsList) {
      const index = songsList.indexOf(actualFav);
      if (favoritesList.find((fav) => fav.trackId === idOfTrack)) {
        removeFavorite(actualFav, index);
        setActualFavorite(actualFav);
        setAddRemove(false);
      } else {
        addFavorite(actualFav, index);
        setActualFavorite(actualFav);
        setAddRemove(true);
      }
    }
    setChange(!change);
  };

  // Função para remover uma música dos favoritos
  const removeFavorite = async (actualFav: SongType, index: number) => {
    const auxArray = favoritesIndex;
    auxArray.splice(index, 1);
    auxArray.splice(index, 0, false);
    const filtered = favoritesList
      .filter((favorite) => favorite.trackId !== actualFav.trackId);
    setFavoritesList(filtered);
  };

  // Função para adicionar uma música aos favoritos
  const addFavorite = async (actualFav: SongType, index: number) => {
    const auxArray = favoritesIndex;
    auxArray.splice(index, 1);
    auxArray.splice(index, 0, true);
    setFavoritesList([...favoritesList, actualFav]);
  };

  if (isLoading) return <Loading />;

  return (
    <>
      {/* Exibir nome do artista e nome do álbum */}
      <h2 data-testid="artist-name">{album?.artistName}</h2>
      <h2 data-testid="album-name">{album?.collectionName}</h2>
      <section>
        {/* Mapear e exibir as músicas do álbum como cartões */}
        {songsList?.map((song, index) => (<MusicCard
          key={ song.trackId }
          previewUrl={ song.previewUrl }
          trackName={ song.trackName }
          trackId={ song.trackId }
          hChange={ () => hFavListaAlterada(song.trackId) }
          isChecked={ favoritesIndex[index] }
        />))}
      </section>
    </>
  );
}
