import React from 'react';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import Routes from './pages/Routes';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <main>
          <p>TrybeTunes</p>
          <Routes />
        </main>
      </BrowserRouter>
    );
  }
}

export default App;
