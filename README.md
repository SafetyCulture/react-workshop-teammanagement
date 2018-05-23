# React tutorial - Team management page

## Purpose
* Build a web page using react
* Extract reusable component
* Containers and component

## Step by step tutorial

### Create a table to display team members' information
```
        <table>
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>HHH</td><td>huanhuan.huang@safetyculture.io</td><td>Active</td>
            </tr>
            <tr>
              <td>Zhihao</td><td>zhihao.huang@safetyculture.io</td><td>Invited</td>          
            </tr>
            <tr>
              <td>Kevin</td><td>kevin.mchugh@safetyculture.io</td><td>Deactived</td>
            </tr>
          </tbody>
        </table>
```

### Add some styles to the table

**Shared style variables**

Create a new file called `styles-variables`, then put it under `src`.

````
export const borderColor = '#EBEBEB';
export const backgroundLight = '#F5F5F5';
````

**Define `Table` styled component in App.js**
```
const Table = styled.table`
  border-collapse: collapse;
  border: 1px solid ${borderColor};

  th, td {
    border: 1px solid ${borderColor};
    padding: 0.5rem 1rem;
  }

  th {
    background-color: ${backgroundLight};
  }
`;
```

**Extract styles like a mixin**

```
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
```

## Dynamic table

Imagined that we have some data is passed from the API

```
{
    data: [
      { name: 'HHH', email: 'huanhuan.huang@safetyculture.io', status: 'Active', groups: 5, addedBy: 'Tom Dance' },
      { name: 'Zhihao', email: 'zhihao.huang@safetyculture.io', status: 'Invited', groups: 1, addedBy: 'Tristan Davey' },
      { name: 'Kevin', email: 'kevin.mchugh@safetyculture.io', status: 'Deactived', groups: 20, addedBy: 'Jo Walter' },
    ]
}
```

**Massage the data to displayable**

```
{
    rows: [
      { name: 'HHH', email: 'huanhuan.huang@safetyculture.io', status: 'Active', groups: 5, addedBy: 'Tom Dance' },
      { name: 'Zhihao', email: 'zhihao.huang@safetyculture.io', status: 'Invited', groups: 1, addedBy: 'Tristan Davey' },
      { name: 'Kevin', email: 'kevin.mchugh@safetyculture.io', status: 'Deactived', groups: 20, addedBy: 'Jo Walter' },
    ],
    headers: {name: 'Name', email: 'Email', status: 'Status', groups: 'Groups', addedBy: 'Added by' }
}
```

**Dynamically generate table header**

- Set initial state in the app constructor

```
  constructor(props) {
    super(props);
    this.state = {
      rows: [
        { name: 'HHH', email: 'huanhuan.huang@safetyculture.io', status: 'Active', groups: 5, addedBy: 'Tom Dance' },
        { name: 'Zhihao', email: 'zhihao.huang@safetyculture.io', status: 'Invited', groups: 1, addedBy: 'Tristan Davey' },
        { name: 'Kevin', email: 'kevin.mchugh@safetyculture.io', status: 'Deactived', groups: 20, addedBy: 'Jo Walter' },
      ],
      headers: { name: 'Name', email: 'Email', status: 'Status' }
    };
  }
```

- Get headers from the state in `render` method

```
    const { headers } = this.state;
    const headerIds = Object.keys(this.state.headers);
```

- Dynamically generate table header

```
            {headerIds.map((headerId, index) =>
              <th key={index}>{headers[headerId]}</th>
            )}
```

Full code snippet

```
  render() {
    const { headers } = this.state;
    const headerIds = Object.keys(this.state.headers);

    return (
      <Container>
        <Table>
          <thead>
            <tr>
              {headerIds.map((headerId, index) =>
                <th key={index}>{headers[headerId]}</th>
              )}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>HHH</td><td>huanhuan.huang@safetyculture.io</td><td>Active</td>
            </tr>
            <tr>
              <td>Zhihao</td><td>zhihao.huang@safetyculture.io</td><td>Invited</td>
            </tr>
            <tr>
              <td>Kevin</td><td>kevin.mchugh@safetyculture.io</td><td>Deactived</td>
            </tr>
          </tbody>
        </Table>
      </Container>
    );
  }
```

## Your turn: dynamically generated table content

**What you have**

Data from the previous exercise



**Expectation**

Replace hard coded table content with the one from data

**Time frame**

10 minutes
  
<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

**Solution**

```
          {rows.map((row, rowIndex) =>
            <tr key={rowIndex}>
              {headerIds.map((headerId, index) =>
                <td key={index}>{row[headerId]}</td>
              )}
            </tr>
          )}
```

### Apply the badge component

We need to massage the data to include the badge component
```
{
      rows: [
        { name: 'HHH', email: 'huanhuan.huang@safetyculture.io', status: <Badge appearance="added" value="Active" />, groups: 5, addedBy: 'Tom Dance' },
        { name: 'Zhihao', email: 'zhihao.huang@safetyculture.io', status: <Badge appearance="primary" value="Invited" />, groups: 1, addedBy: 'Tristan Davey' },
        { name: 'Kevin', email: 'kevin.mchugh@safetyculture.io', status: <Badge appearance="important" value="Deactived" />, groups: 20, addedBy: 'Jo Walter' },
      ],
      headers: { name: 'Name', email: 'Email', status: 'Status' }
}
```

### Extract table component

**Create a new file under `components` folder called `Table.js`**

If we have a table component. We can reuse it in other page. All we need to do is to pass data to it for rendering.

Let's slowly migrate the table related JSX from `App.js` to `Table.js`.

Table.js
```
import React, { Component } from 'react';
import styled from 'styled-components';
import { borderColor, backgroundLight } from '../styles-variables';

const Table = styled.table`
  border-collapse: collapse;
  border: 1px solid ${borderColor};

  th, td {
    border: 1px solid ${borderColor};
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
          {rows.map((row, contentIndex) =>
            <tr key={contentIndex}>
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
```

`render` function in App.js becomes
```
  render() {
    const { headers, rows } = this.state;

    return (
      <Container>
        <Table data={{ headers, rows }} />
      </Container>
    );
  }
```


### Containers & components

What is the difference between containers and component? [https://medium.com/@learnreact/container-components-c0e67432e005](https://medium.com/@learnreact/container-components-c0e67432e005)


**Let's create our first container**

Create a new file called `MembersContainer.js` in new folder `containers`

Extract most code related to members to `MembersContainer.js`

In MembersContainer.js

```
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
```

In App.js

```
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
```

### Advanced on table component - sorting

**Allow sorting information stored in the headers in `Table.js`**
```
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
```

**Add an `onClick` Event to table header**

```

              <th key={index} onClick={() => this.sort(headerId)}>{headers[headerId].label}</th>
```

**The sorting logic**

```
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
```




