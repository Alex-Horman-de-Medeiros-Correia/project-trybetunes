import React from 'react';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../components/Header';
import Loading from './Loaging';

const userApi = require('../services/userAPI');

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      carregando: false,
      atualizando: false,
      user: '',
    };
  }

  componentDidMount() {
    this.userName();
  }

  userName = () => {
    this.setState({
      carregando: true,
    }, async () => {
      this.setState({
        user: await userApi.getUser(),
        carregando: false,
        disabled: true,
      }, () => {
        this.checkForm();
      });
    });
  }

  // O código abaixo até o início do render foi feito com base nas dicas do grupo do projeto FrontEnd Online Store...
  hereInput = ({ target }) => {
    this.setState((prevState) => ({
      ...prevState,
      user: {
        ...prevState.user,
        [target.name]: target.value,
      },
    }), () => this.checkForm());
  }

  checkForm = () => {
    const { user } = this.state;

    const verEmail = user.email.match(/[\w.!#$%&'*+=?^_`{|}~-]+@[\w.-]+\.[A-Z]{2,}/gi);
    const inputs = [user.name, user.email, user.description, user.image];
    const verInp = inputs.every((element) => element !== '');
    const valid = verEmail && verInp;
    this.setState({
      disabled: !valid,
    });
  }

  atualizarUser = (event) => {
    event.preventDefault();

    this.setState({
      carregando: true,
    }, async () => {
      const { user } = this.state;

      await userApi.updateUser(user);

      this.setState({
        carregando: false,
        atualizando: true,
      });
    });
  }

  render() {
    const { carregando, user, disabled, atualizando } = this.state;

    return (
      <div data-testid="page-profile-edit">
        <Header />

        { carregando ? <Loading /> : (
          <form>
            <input
              type="text"
              name="name"
              value={ user.name }
              data-testid="edit-input-name"
              onChange={ this.hereInput }
            />
            <br />
            <br />
            <input
              type="email"
              name="email"
              value={ user.email }
              data-testid="edit-input-email"
              onChange={ this.hereInput }
            />
            <br />
            <br />
            <input
              type="text"
              name="description"
              value={ user.description }
              data-testid="edit-input-description"
              onChange={ this.hereInput }
            />
            <br />
            <br />
            <input
              type="text"
              name="image"
              value={ user.image }
              data-testid="edit-input-image"
              onChange={ this.hereInput }
            />
            <br />
            <br />
            <button
              type="button"
              onClick={ this.atualizarUser }
              data-testid="edit-button-save"
              disabled={ disabled }
            >
              Salvar
            </button>
          </form>
        )}
        { atualizando && <Redirect to="/profile" /> }
      </div>
    );
  }
}

export default ProfileEdit;
