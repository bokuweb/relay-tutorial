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

exports.Container = Relay.createContainer(App, {
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

exports.queries = {
  name: 'ConferenceQueries',
  params: {id: 1},
  queries: {
    // user in this case matches the fragment in the container above
    user: () => Relay.QL`query { user }`   
  },
}

