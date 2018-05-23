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
  render() {
    const { headers, rows } = this.props.data;
    const headerIds = Object.keys(headers);
    return (
      <Table>
        <tbody>
          <tr>
            {headerIds.map((headerId, index) =>
              <th key={index}>{headers[headerId]}</th>
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