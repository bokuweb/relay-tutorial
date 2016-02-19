const GraphQL      = require('graphql');
const GraphQLRelay = require('graphql-relay');
const db           = require('./database');

var nodeDefinitions = GraphQLRelay.nodeDefinitions(function(globalId) {
  var idInfo = GraphQLRelay.fromGlobalId(globalId)
  if(idInfo == 'Todo') {
    return a;
  }
  return null;
});

function Conference(name) {
  this.name = name;
}

var a = new Conference('hoge');

var TodoType = new GraphQL.GraphQLObjectType({
  name: 'Todo',
  description: 'A conference',

  // Relay will use this function to determine if an object in your system is
  // of a particular GraphQL type
  isTypeOf: function(obj) { return obj instanceof Conference },

  fields: {
    id: GraphQLRelay.globalIdField('Todo'),
    name: {
      type: GraphQL.GraphQLString,
      description: 'The name of the conference',
    },
    //description: {
    //  type: GraphQL.GraphQLString,
    //  description: 'The description of the conference'
    //}
  },
  // This declares this GraphQL type as a Node
  interfaces: [nodeDefinitions.nodeInterface],
});



const commentsType = new GraphQL.GraphQLObjectType({
  name: 'Comments',
  //isTypeOf(obj) { return obj instanceof db.User },
  fields() {
    console.log('aa')
    return {
      //id: GraphQLRelay.globalIdField('User'),
      name: {
        type: GraphQL.GraphQLString,
        args: {
          id: { type: GraphQL.GraphQLInt }
        },
        resolve(_, arg) {
          return db.getUser(arg.id).name;
        }
      },
      comment: {
        type: GraphQL.GraphQLString,
        resolve(_, arg) {
          return 'hoge';
        }
      },
      hoge: {
        //type: TodosConnection,
        type: GraphQLRelay.connectionDefinitions({name: 'Todo', nodeType: TodoType}).connectionType,
        //type: GraphQL.GraphQLString,
        resolve(obj, args) { 
          //return 'hoge';
          console.log('asd')
          return GraphQLRelay.connectionFromArray([a], args)
        }
      }
    }
  },
});


module.exports = new GraphQL.GraphQLSchema({
  query: new GraphQL.GraphQLObjectType({
    name: 'Query',
    fields: {
      comments: {
        type: commentsType,
        resolve(parent, args, ast) {
          return {};
        },
      },
    },
  }),
});
