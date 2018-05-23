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
    const { headers, contents } = this.props.data;
    const headerIds = Object.keys(headers);
    return (
      <Table>
        <tbody>
          <tr>
            {headerIds.map((headerId, index) =>
              <th key={index}>{headers[headerId]}</th>
            )}
          </tr>
          {contents.map((content, contentIndex) =>
            <tr key={contentIndex}>
              {headerIds.map((headerId, index) =>
                <td key={index}>{content[headerId]}</td>
              )}
            </tr>
          )}
        </tbody>
      </Table>
    )
  }
}