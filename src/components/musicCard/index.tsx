import checkedHeart from '../../images/checked_heart.png';
import emptyHeart from '../../images/empty_heart.png';
import './style.css'; // Importe o arquivo CSS

type PropsMusicCard = {
  trackName: string,
  previewUrl: string,
  trackId: number,
  isChecked: boolean,
  hChange: () => void
};

function MusicCard({ trackName,
  previewUrl,
  trackId,
  isChecked = false,
  hChange }: PropsMusicCard) {
  return (
    <>
      <p>{trackName}</p>
      <audio data-testid="audio-component" src={ previewUrl } controls>
        <track kind="captions" />
        O seu navegador não suporta o elemento
        {' '}
        {' '}
        <code>audio</code>
        .
      </audio>

      <label
        data-testid={ `checkbox-music-${trackId}` }
        htmlFor={ `${trackId}` }
      >
        <input
          className="checkbox-favorite"
          id={ `${trackId}` }
          type="checkbox"
          checked={ isChecked }
          onChange={ hChange }
          // onClick={ hChange }
        />

        <img src={ isChecked ? checkedHeart : emptyHeart } alt="favorite" />

      </label>
    </>
  );
}

export default MusicCard;
