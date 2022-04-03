import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../pages/Loaging';

const userAPI = require('../services/userAPI');

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      nameRender: '',
      carregando: false,
    };
  }

  componentDidMount() {
    this.getApi();
  }

  getApi = async () => {
    this.setState({
      nameRender: await userAPI.getUser(),
    });
    this.setState({
      carregando: true,
    });
  }

  render() {
    const { nameRender, carregando } = this.state;

    return (
      <main>
        <Link to="/search" data-testid="link-to-search">Página de Pesquisa</Link>
        <br />
        <br />
        <Link to="/favorites" data-testid="link-to-favorites">Músicas Favoritas</Link>
        <br />
        <br />
        <Link to="/profile" data-testid="link-to-profile">Perfil Inicial</Link>
        <br />
        <br />
        <Link to="/">Login Page</Link>

        <header data-testid="header-component">
          { carregando ? (
            <h2 data-testid="header-user-name">
              { `Bem Vindo, ${nameRender.name}` }
            </h2>
          ) : <Loading /> }
        </header>
      </main>
    );
  }
}

export default Header;
