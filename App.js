import React from 'react';
import Relay from 'react-relay';

class App extends React.Component {
  render() {
    console.dir(this.props);
    return(
      <h2>Hello!! { this.props.comments.name }</h2>
    );
  }
}

exports.Container = Relay.createContainer(App, {
  initialVariables: {
    id: 2
  },
  fragments: {
    comments: () => Relay.QL`
      fragment on Comments {
        name(id: $id)
        comment
        hoge {
          edges {
            node {
              name
}
}
        }
      }
    `,
  },
});

exports.queries = {
  name: 'Queries',
  params: {},
  queries: {
    comments: () =>  Relay.QL`query { comments }`,
  },
};

