import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from './Loaging';

const favoriteSongsAPI = require('../services/favoriteSongsAPI');

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      musicasFvoritas: [],
      carregando: false,
    };
  }

  componentDidMount() {
    this.requisicao();
  }

  requisicao = () => {
    this.setState({
      carregando: true,
    }, async () => {
      const favorite = await favoriteSongsAPI.getFavoriteSongs();

      this.setState({
        musicasFvoritas: favorite,
        carregando: false,
      });
    });
  }

  adcionaFavSongs = ({ target }, element) => {
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
    const { carregando, musicasFvoritas } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />

        { carregando ? <Loading /> : (
          <>
            { musicasFvoritas.map((element) => (
              <div key={ element.trackId }>
                <MusicCard
                  trackName={ element.trackName }
                  trackId={ element.trackId }
                  song={ element }
                  previewUrl={ element.previewUrl }
                  adcionaFavSongs={ this.adcionaFavSongs }
                  element={ element }
                  tela="favorito"
                />
              </div>
            )) }
          </>
        )}
      </div>
    );
  }
}

export default Favorites;
