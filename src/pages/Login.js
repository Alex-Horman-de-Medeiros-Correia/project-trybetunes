import React from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Loading from './Loaging';

const userAPI = require('../services/userAPI');

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      botaoDesabilitar: true,
      infoRecebida: false,
      carregando: false,
    };
  }

  funcInput = ({ target: { value } }) => {
    const minDigite = 3;
    const digitado = value.length;

    this.setState({
      name: value,
      botaoDesabilitar: digitado < minDigite,
    });
  }

  funcApi = async () => {
    const { name } = this.state;
    this.setState({
      carregando: true,
    });

    await userAPI.createUser({ name });
    this.setState({
      infoRecebida: true,
      carregando: false,
    });
  }

  render() {
    const { name, botaoDesabilitar, carregando,
      infoRecebida } = this.state;

    return (
      <div data-testid="page-login">
        { carregando ? (<Loading />)
          : (
            <form>
              <input
                type="text"
                name="name"
                value={ name }
                placeholder="Digite aqui seu nome"
                data-testid="login-name-input"
                onChange={ (event) => this.funcInput(event) }
              />
              <br />
              <br />
              <button
                type="button"
                name="botao"
                onClick={ this.funcApi }
                disabled={ botaoDesabilitar }
                data-testid="login-submit-button"
              >
                Entrar
              </button>
            </form>
          )}
        { infoRecebida ? <Redirect to="/search" /> : null }
        ;
      </div>
    );
  }
}

export default Login;
