import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getGamesQuery } from '../query/query';
import GameInfo from './GameInfo';

class GameList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosen: null,
    };
  }
  showGames() {
    const data = this.props.data;
    if (data.loading) {
      return (<div>Games Loading...</div>);
    } else {
      return data.games.map(game => {
        return(
          <li key={game.id} onClick={(e) => this.setState({chosen: game.id})}>{game.name}</li>
        )
      })
    }
  }
  render() {
    return (
      <div className="game-list">
        <ul id="ps4-game-list">
          {this.showGames()}
        </ul>
        <GameInfo gameId={this.state.chosen} />
      </div>
    );
  }
}

export default graphql(getGamesQuery)(GameList);
