const graphql = require('graphql');
const Game = require('../models/game');
const Developer = require('../models/developer');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema,
} = graphql;

const GameType = new GraphQLObjectType({
  name: 'Game',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    date: { type: GraphQLString },
    developer: {
      type: DeveloperType,
      resolve(parent, args) {
        return Developer.findById(parent.developerId);
      },
    },
  }),
});

const DeveloperType = new GraphQLObjectType({
  name: 'Developer',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    games: {
      type: new GraphQLList(GameType),
      resolve(parent, args) {
        return Game.find({ developerId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    game: {
      type: GameType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Game.findById(args.id);
      },
    },
    developer: {
      type: DeveloperType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Developer.findById(args.id);
      },
    },
    games: {
      type: new GraphQLList(GameType),
      resolve(parent, args) {
        return Game.find({});
      },
    },
    developers: {
      type: new GraphQLList(DeveloperType),
      resolve(parent, args) {
        return Developer.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addDeveloper: {
      type: DeveloperType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parent, args) {
        const developer = new Developer({
          name: args.name,
        });
        return developer.save();
      },
    },
    addGame: {
      type: GameType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        date: { type: new GraphQLNonNull(GraphQLString) },
        developerId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const game = new Game({
          name: args.name,
          genre: args.genre,
          date: args.date,
          developerId: args.developerId,
        });
        return game.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
