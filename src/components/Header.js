import React from 'react';
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
      <header data-testid="header-component">
        { carregando ? (
          <h2 data-testid="header-user-name">
            { `Bem Vindo, ${nameRender.name}` }
          </h2>
        ) : <Loading /> }
      </header>
    );
  }
}

export default Header;
