const GraphQL      = require('graphql');
const GraphQLRelay = require('graphql-relay');
const db           = require('./database');

const userType = new GraphQL.GraphQLObjectType({
  name: 'User',
  isTypeOf(obj) { return obj instanceof db.User },
  fields() {
    return {
      id: GraphQLRelay.globalIdField('User'),
      name: {
        type: GraphQL.GraphQLString,
        args: {
          userToShow: { type: GraphQL.GraphQLInt }
        },
        resolve(a, b) {
          console.log('<-----')
          console.log(b)
          console.log('----->')
          return 'hoge'
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
        resolve() {
          console.log(db.getUser(1))
          return db.getUser(1)
        },
      },
    },
  }),
});
