import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loaging';

const userApi = require('../services/userAPI');

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      carregando: false,
      user: '',
    };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = () => {
    this.setState({
      carregando: true,
    }, async () => {
      this.setState({
        user: await userApi.getUser(),
        carregando: false,
      });
    });
  }

  render() {
    const { carregando, user } = this.state;

    return (
      <div data-testid="page-profile">
        <Header />

        { carregando ? <Loading /> : (
          <>
            <h3>Profile Page</h3>
            <p>
              {' '}
              { `Seu Nome: ${user.name}` }
              {' '}
            </p>
            <p>
              {' '}
              { `Seu Email: ${user.email}` }
              {' '}
            </p>
            <img src={ user.image } alt={ user.name } data-testid="profile-image" />
            <p>
              {' '}
              { `Uma breve descrição: ${user.description}` }
              {' '}
            </p>
            <Link to="/profile/edit">Editar perfil</Link>
          </>
        )}
      </div>
    );
  }
}

export default Profile;
