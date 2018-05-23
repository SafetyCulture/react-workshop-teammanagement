import React, { Component } from 'react';
import styled from 'styled-components';
import { borderColor, backgroundLight } from '../styles-variables';

const border = `border: 1px solid ${borderColor};`

const Table = styled.table`
  border-collapse: collapse;
  ${border}

  th, td {
    ${border}
    padding: 1rem;
  }

  th {
    background-color: ${backgroundLight};
  }
`;

export default class extends Component {
  constructor(props) {
    super(props);
    const { headers, rows } = this.props.data;
    const headerIds = Object.keys(headers);
    const sortableHeaders = {};

    headerIds.forEach(headerId => {
      sortableHeaders[headerId] = {
        label: headers[headerId],
        asc: true
      }
    });

    this.state = { rows, headers: sortableHeaders }
  }

  sort = (headerId) => {
    let { headers, rows } = this.state;

    if (headers[headerId].asc) {
      rows = rows.sort((row1, row2) => row1[headerId] > row2[headerId])
    } else {
      rows = rows.sort((row1, row2) => row1[headerId] < row2[headerId])
    }
    headers[headerId].asc = !headers[headerId].asc;

    this.setState({ rows, headers });
  }

  render() {
    const { headers, rows } = this.state;
    const headerIds = Object.keys(headers);
    return (
      <Table>
        <tbody>
          <tr>
            {headerIds.map((headerId, index) =>
              <th key={index} onClick={() => this.sort(headerId)}>{headers[headerId].label}</th>
            )}
          </tr>
          {rows.map((row, rowIndex) =>
            <tr key={rowIndex}>
              {headerIds.map((headerId, index) =>
                <td key={index}>{row[headerId]}</td>
              )}
            </tr>
          )}
        </tbody>
      </Table>
    )
  }
}