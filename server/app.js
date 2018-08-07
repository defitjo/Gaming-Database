const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const keys = require('./config/keys');

const app = express();

mongoose.connect(keys.mongodb.dbURI);
mongoose.connection.once('open', () => {
  console.log('Connected to gaming database');
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(4000, () => {
  console.log('running on port 4000');
});
