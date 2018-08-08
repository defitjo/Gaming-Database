import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getGameQuery } from '../query/query';

class GameInfo extends Component {
  showGameInfo() {
    const { game } = this.props.data;
    if (game) {
      return(
        <div>
          <h2>{game.name}</h2>
          <p>{game.genre}</p>
          <p>{game.date}</p>
          <p>{game.developer.name}</p>
          <p>Games by {game.developer.name}:</p>
          <ul className="more-games">
            { game.developer.games.map(item => {
              return <li key={item.id}>{item.name}</li>
            })}
          </ul>
        </div>
      )
    } else {
      return(
        <div>Select a game</div>
      );
    }
  }
  render() {
    return(
      <div id="game-info">
        {this.showGameInfo()}
      </div>
    );
  }
}

export default graphql(getGameQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.gameId,
      }
    }
  }
})(GameInfo);
