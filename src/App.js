import React, { Component } from 'react';
import styled from 'styled-components';
import MembersContainer from './containers/MembersContainer';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 100px;
`;

class App extends Component {
  render() {
    return (
      <Container>
        <MembersContainer />
      </Container>
    );
  }
}

export default App;
