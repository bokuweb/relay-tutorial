import React from 'react';
import Relay from 'react-relay';

class App extends React.Component {
  render() {
    console.dir(this.props)
    return(
      <h2>Hello!! {this.props.user.name}</h2>
    );
  }
}

exports.Container = Relay.createContainer(App, {
  initialVariables: {
    id: 2
  },
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        name(id: $id)
      }
    `,
  },
});

exports.queries = {
  name: 'ConferenceQueries',
  params: {},
  queries: {
    user: () =>  Relay.QL`query { user }`,
  },
};

