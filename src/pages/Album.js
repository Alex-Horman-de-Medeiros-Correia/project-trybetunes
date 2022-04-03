import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from './Loaging';

const favoriteSongsAPI = require('../services/favoriteSongsAPI');

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      artista: '',
      album: '',
      musicas: [],
      favoritas: [],
      carregando: false,
    };
  }

  componentDidMount() {
    this.allMusics();
    this.favSongs();
  }

  favSongs = async () => {
    this.setState({
      carregando: true,
    });
    const favSongs1 = await favoriteSongsAPI.getFavoriteSongs();

    this.setState({
      carregando: false,
      favoritas: [...favSongs1],
    });
  }

  allMusics = async () => {
    const { match: { params: { id } } } = this.props;

    const requerimento = await getMusics(id);
    const filterMusics = requerimento.filter((element) => element.kind);
    // A respeito desse filter, peguei dicas com um Dev mais experiente

    this.setState({
      artista: requerimento[0].artistName,
      album: requerimento[0].collectionName,
      musicas: [...filterMusics],
    });
  }

  render() {
    const { artista, album, musicas, carregando, favoritas } = this.state;

    return (
      <div data-testid="page-album">
        <Header />

        { carregando ? <Loading /> : (
          <>
            <h1 data-testid="artist-name">
              {' '}
              { `Veja os maiores Hits de ${artista}!` }
              {' '}
            </h1>
            <h2 data-testid="album-name">
              {' '}
              { `Direto do Album: ${album}...` }
              {' '}
            </h2>

            { musicas.map((element) => (
              <MusicCard
                key={ element.trackId }
                trackName={ element.trackName }
                previewUrl={ element.previewUrl }
                trackId={ element.trackId }
                favoriteList={ favoritas }
                song={ element }
              />
            ))}
          </>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
