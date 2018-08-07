const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInt,
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
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
