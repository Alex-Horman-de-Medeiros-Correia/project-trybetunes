import React from 'react';
import propTypes from 'prop-types';
import Loading from '../pages/Loaging';

const favoriteSongsAPI = require('../services/favoriteSongsAPI');

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      musicasFvoritas: [],
      carregando: false,
    };
  }

  componentDidMount() {
    this.adcionaFavSongs();
  }

  adcionaFavSongs = async () => {
    this.setState({
      musicasFvoritas: await favoriteSongsAPI
        .getFavoriteSongs(),
    });
  }

  check = async (song) => {
    const { musicasFvoritas } = this.state;

    if (musicasFvoritas.length > 0) {
      const fav = musicasFvoritas
        .some((elementOne) => elementOne.trackId === song.trackId);
      return fav;
    }
    return false;
  }

  addSongs = ({ target }, element) => {
    const { checked } = target;
    const { musicasFvoritas } = this.state;

    this.setState({
      carregando: true,
    }, async () => {
      if (checked) {
        await favoriteSongsAPI.addSong(element);
        this.setState(({
          musicasFvoritas: [...musicasFvoritas, element],
        }));
      } else {
        await favoriteSongsAPI.removeSong(element);
        this.setState({
          musicasFvoritas: musicasFvoritas
            .filter((elementFav) => elementFav.trackId !== element.trackId),
        });
      }
      this.setState({
        carregando: false,
      });
    });
  }

  render() {
    const { trackName, previewUrl,
      trackId, song, adcionaFavSongs, element, tela } = this.props;
    const { carregando, musicasFvoritas } = this.state;

    return (
      <div>
        { carregando ? <Loading /> : (
          <>
            <h1>
              {' '}
              { `${trackName}` }
              {' '}
            </h1>

            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
            </audio>
            <br />
            <br />
            <label htmlFor={ trackId }>
              Favorita
              <input
                id={ trackId }
                type="checkbox"
                checked={ musicasFvoritas
                  .some((elementOne) => elementOne.trackId === trackId) }
                data-testid={ `checkbox-music-${trackId}` }
                /* onChange={ (event) => this.addSongs(event, song) } */
                onChange={ tela === 'favorito'
                  ? (event) => adcionaFavSongs(event, element)
                  : (event) => this.addSongs(event, song) }
              />
            </label>
          </>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  adcionaFavSongs: propTypes.func.isRequired,
  element: propTypes.shape({
    artistName: propTypes.string,
  }).isRequired,
  tela: propTypes.string.isRequired,
  trackName: propTypes.string.isRequired,
  previewUrl: propTypes.string.isRequired,
  trackId: propTypes.number.isRequired,
  song: propTypes.shape({
    artistId: propTypes.number,
  }).isRequired,

};

export default MusicCard;
