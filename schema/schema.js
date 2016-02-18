const GraphQL      = require('graphql');
const GraphQLRelay = require('graphql-relay');
const db           = require('./database');

const userType = new GraphQL.GraphQLObjectType({
  name: 'User',
  //isTypeOf(obj) { return obj instanceof db.User },
  fields() {
    return {
      //id: GraphQLRelay.globalIdField('User'),
      name: {
        type: GraphQL.GraphQLString,
        args: {
          id: { type: GraphQL.GraphQLInt }
        },
        resolve(_, arg) {
          console.log(_)
          return db.getUser(arg.id).name;
        }
      },
    }
  },
});


module.exports = new GraphQL.GraphQLSchema({
  query: new GraphQL.GraphQLObjectType({
    name: 'Query',
    fields: {
      user: {
        type: userType,
        resolve(parent, args, ast) {
          return new db.User(0, '');
        },
      },
    },
  }),
});
