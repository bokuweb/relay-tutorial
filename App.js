import React from 'react';
import Relay from 'react-relay';

class App extends React.Component {
  render() {
    console.dir(this.props)
    return(
      <div className="container">
        <h2>{this.props.user.name} Conferencess</h2>
        {this.props.user.conferences.edges.map(edge =>
          <Conference edge={edge} />
        )}
      </div>
    );
  }  
}


class Conference extends React.Component {
  render() {
    var edge = this.props.edge;
    return (
      <div className="col-sm-4">
        <div className="panel panel-default" key={edge.node.id}>
          <div className="panel-heading">
            <h3>{edge.node.name}</h3>
          </div>
          <div className="panel-body">
            {edge.node.description}
          </div>
        </div>
      </div>
    )
  }
}

// The component we need to export is a Relay wrapper around our App component
// from above. It declares the GraphQL fragments where we list the properties
// we want to be fetched – eg, user.name, user.widgets.edges, etc
exports.Container = Relay.createContainer(App, {
  // The property name here reflects what is added to `this.props` above.
  // This template string will be parsed by babel-relay-plugin when we browserify.
  initialVariables: {
    userToShow: 2
  },
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        name,
        conferences(userToShow: $userToShow) {
          edges {
            node {
              id,
              name,
              description
            },
          },
        },
      }
    `
  },
});

// The Relay root container needs to know what queries will occur at the top
// level – these configurations are currently called Routes in Relay, but this
// name is misleading and under review so we don't use it here.
exports.queries = {
  name: 'ConferenceQueries',
  params: {},
  queries: {
    // user in this case matches the fragment in the container above
    user: () =>  Relay.QL`query { user }`   
  },
}

