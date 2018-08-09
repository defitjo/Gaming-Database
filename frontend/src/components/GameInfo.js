import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getGameQuery } from '../query/query';

class GameInfo extends Component {
  showGameInfo() {
    const { game } = this.props.data;
    if (game) {
      return(
        <div>
          <h2><span>Title:</span> {game.name}</h2>
          <p>Genre: {game.genre}</p>
          <p>Release Date: {game.date}</p>
          <p>Developer: {game.developer.name}</p>
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
        <div id="game-select">Select a game</div>
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
