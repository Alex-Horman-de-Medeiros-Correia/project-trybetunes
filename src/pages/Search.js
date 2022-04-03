import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from './Loaging';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      artista: '',
      artistName: '',
      botaoRender: true,
      albuns: [],
      carregando: false,
      exibir: false,
    };
  }

  renderMin = ({ target: { value } }) => {
    const minDigite = 2;
    const digitado = value.length;

    this.setState({
      artista: value,
      botaoRender: digitado < minDigite,
    });
  }

  pesquisar = async () => {
    const { artista } = this.state;

    this.setState({
      artistName: artista,
      botaoRender: true,
      artista: '',
      carregando: true,
    });

    const pedido = await searchAlbumsAPI(artista);

    this.setState({
      albuns: [...pedido],
      carregando: false,
      exibir: true,
    });
  }

  render() {
    const { botaoRender, artista, carregando, exibir, albuns, artistName } = this.state;

    return (
      <div data-testid="page-search">
        <Header />

        {carregando ? (<Loading />) : (
          <>
            <form>
              <input
                type="text"
                name="artista"
                value={ artista }
                data-testid="search-artist-input"
                onChange={ (event) => this.renderMin(event) }
              />
              <br />
              <br />
              <button
                type="button"
                disabled={ botaoRender }
                data-testid="search-artist-button"
                onClick={ this.pesquisar }
              >
                Pesquisar
              </button>
            </form>

            <section>
              { albuns.length > 1 && exibir ? (
                <>
                  <h2>
                    {' '}
                    {`Resultado de álbuns de: ${artistName}`}
                    {' '}
                  </h2>
                  <ul>
                    {albuns.map((element) => (
                      <li key={ element.collectionId }>
                        <Link
                          data-testid={ `link-to-album-${element.collectionId}` }
                          to={ `/album/${element.collectionId}` }
                        >
                          <h1>
                            {' '}
                            { element.collectionName }
                            {' '}
                          </h1>
                          <img
                            src={ element.artworkUrl100 }
                            alt={ element.collectionName }
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : <h2>Nenhum álbum foi encontrado</h2> }
            </section>
          </>
        )}
      </div>
    );
  }
}

export default Search;
