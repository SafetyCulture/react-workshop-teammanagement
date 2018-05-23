import React, { Component } from 'react';
import styled from 'styled-components';
import Badge from '@atlaskit/badge';
import Avatar from '@atlaskit/avatar';
import Table from './components/Table';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 100px;
`;

const BaseLine = styled.div`
  display: flex;
  align-items: baseline;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: [
        {
          title: 'Team Members',
          rows: [
            { name: 'HHH', email: 'huanhuan.huang@safetyculture.io', status: 'Active', groups: 5, addedBy: 'Tom Dance' },
            { name: 'Zhihao', email: 'zhihao.huang@safetyculture.io', status: 'Invited', groups: 1, addedBy: 'Tristan Davey' },
            { name: 'Kevin', email: 'kevin.mchugh@safetyculture.io', status: 'Deactived', groups: 20, addedBy: 'Jo Walter' },
          ],
          headers: { name: 'Name', email: 'Email', status: 'Status', groups: 'Groups', addedBy: 'Added by' },
        },
        {
          title: 'Groups',
          rows: [
            { name: 'Townsville', members: (<BaseLine>
              <Avatar name="small" size="small" presence="online" />
              <Avatar name="small" size="small" presence="online" />
              <Avatar name="small" size="small" presence="online" />
            </BaseLine>), createdBy: 'Tom dance' },
          ],
          headers: { name: 'Group names', members: 'Members' },
        }
      ]
    };
  }

  render() {
    const { headers, rows, title } = this.state.pages[0];

    return (
      <Container>
        <div>
          <h1>{title}</h1>
          <Table data={{ headers, rows }} />
        </div>
      </Container>
    );
  }
}

export default App;
