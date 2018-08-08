import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

// components
import AddGame from './components/AddGame';
import GameList from './components/GameList';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <h1>Playstation 4 Game Library</h1>
          <GameList />
          <AddGame />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
