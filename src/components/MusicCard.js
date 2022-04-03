import React from 'react';
import propTypes from 'prop-types';
import Loading from '../pages/Loaging';

const favoriteSongsAPI = require('../services/favoriteSongsAPI');

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      checando: false,
      carregando: false,
    };
  }

  checandoFav = (favorites, trackId) => {
    const checkFav = favorites.some((element) => element.trackId === trackId);
    return checkFav;
  }

  adcionaFavSongs = async (song) => {
    this.setState({
      carregando: true,
    });
    await favoriteSongsAPI.addSong(song);
    this.setState({
      carregando: false,
      checando: true,
    });
  };

  render() {
    const { trackName, favoriteList, previewUrl, trackId, song } = this.props;
    const { carregando, checando } = this.state;

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
                checked={ this.checandoFav(favoriteList, trackId) || checando }
                data-testid={ `checkbox-music-${trackId}` }
                onChange={ () => this.adcionaFavSongs(song) }
              />
            </label>
          </>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  favoriteList: propTypes.arrayOf(propTypes.object).isRequired,
  trackName: propTypes.string.isRequired,
  previewUrl: propTypes.string.isRequired,
  trackId: propTypes.number.isRequired,
  song: propTypes.shape({
    artistId: propTypes.number,
  }).isRequired,
};

export default MusicCard;
