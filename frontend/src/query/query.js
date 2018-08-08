import { gql } from 'apollo-boost';

const getGamesQuery = gql`
  {
    games{
      name
      id
    }
  }
`;

const getDevelopersQuery = gql`
  {
    developers{
      name
      id
    }
  }
`;

const addGameMutation = gql`
  mutation AddGame($name: String!, $genre: String!, $date: String!, $developerId: ID!){
    addGame(name: $name, genre: $genre, date: $date, developerId: $developerId){
      name
      id
    }
  }
`;

const getGameQuery = gql`
  query($id: ID){
    game(id: $id){
      id
      name
      genre
      date
      developer{
        id
        name
        games{
          name
          id
        }
      }
    }
  }
`;

export { getGamesQuery, getDevelopersQuery, addGameMutation, getGameQuery };
