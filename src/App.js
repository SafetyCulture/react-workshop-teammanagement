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
          contents: [
            { name: 'HHH', email: 'huanhuan.huang@safetyculture.io', status: <Badge appearance="added" value="Active" /> },
            { name: 'Zhihao', email: 'zhihao.huang@safetyculture.io', status: <Badge appearance="primary" value="Invited" /> },
            { name: 'Kevin', email: 'kevin.mchugh@safetyculture.io', status: <Badge appearance="important" value="Deactive" /> },
          ],
          headers: { name: 'Name', email: 'Email', status: 'Status' },
        },
        {
          title: 'Groups',
          contents: [
            { name: 'Townsville', members: (<BaseLine>
              <Avatar name="small" size="small" presence="online" />
              <Avatar name="small" size="small" presence="online" />
              <Avatar name="small" size="small" presence="online" />
            </BaseLine>), createdBy: 'Tom dance' },
          ],
          headers: { name: 'Group names', members: 'Members', createdBy: 'Created by' },
        }
      ]
    };
  }

  render() {
    const { headers, contents, title } = this.state.pages[1];

    return (
      <Container>
        <div>
          <h1>{title}</h1>
          <Table data={{ headers, contents }} />
        </div>
      </Container>
    );
  }
}

export default App;
