import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      artista: '',
      botaoRender: true,
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

  render() {
    const { botaoRender, artista } = this.state;

    return (
      <div data-testid="page-search">
        <Header />

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
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
