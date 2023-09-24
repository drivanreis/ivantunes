import './style.css'; // Importe o arquivo CSS
import iconSpinner from '../../images/iconSpinner.svg';

export default function Loading() {
  return (
    <div className="loading">
      <img className="rotating-image" src={ iconSpinner } alt="iconSpinner" />
      <h1>Carregando...</h1>
    </div>
  );
}
