import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      artista: '',
      album: '',
      musicas: [],
    };
  }

  componentDidMount() {
    this.allMusics();
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
    const { artista, album, musicas } = this.state;

    return (
      <div data-testid="page-album">
        <Header />

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
          />
        ))}
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
