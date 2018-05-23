import React, { Component } from 'react';
import Badge from '@atlaskit/badge';
import Table from '../components/Table';

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: [
        { name: 'HHH', email: 'huanhuan.huang@safetyculture.io', status: <Badge appearance="added" value="Active" />, groups: 5, addedBy: 'Tom Dance' },
        { name: 'Zhihao', email: 'zhihao.huang@safetyculture.io', status: <Badge appearance="primary" value="Invited" />, groups: 1, addedBy: 'Tristan Davey' },
        { name: 'Kevin', email: 'kevin.mchugh@safetyculture.io', status: <Badge appearance="important" value="Deactived" />, groups: 20, addedBy: 'Jo Walter' },
      ],
      headers: { name: 'Name', email: 'Email', status: 'Status', groups: 'Groups', addedBy: 'Added by' },
    };
  }

  render() {
    const { headers, rows } = this.state;

    return (
      <div>
        <h1>Team Members</h1>
        <Table data={{ headers, rows }} />
      </div>
    );
  }
}