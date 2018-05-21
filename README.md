## Create a table with content
```
        <table>
          <tbody>
          <tr>
          <th>Name</th><th>Email</th><th>Status</th>
          </tr>
          <tr>
            <td>HHH</td><td>huanhuan.huang@safetyculture.io</td><td>Active</td>
          </tr>
          <tr>
            <td>Zhihao</td><td>zhihao.huang@safetyculture.io</td><td>Invited</td>          
          </tr>
          <tr>
            <td>Kevin</td><td>kevin.mchugh@safetyculture.io</td><td>Deactive</td>
          </tr>
          </tbody>
        </table>
```

## Add style to table

```
import { borderColor, backgroundLight } from './styles-variables';


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

**Reused style variables**

Create a new file called `styles-variables`, then put it under `src`.

````
export const borderColor = '#EBEBEB';
export const backgroundLight = '#F5F5F5';
````

## Pass data into tables

Imagined that we have some data passed from the API

```
{
      data: [
        { name: 'HHH', email: 'huanhuan.huang@safetyculture.io', status: 'Active' },
        { name: 'Zhihao', email: 'zhihao.huang@safetyculture.io', status: 'Invited' },
        { name: 'Kevin', email: 'kevin.mchugh@safetyculture.io', status: 'Deactive' },
      ],
      headers: { name: 'Name', email: 'Email', status: 'Status' }
}
```

**Dynamically generate table header**

- Set initial state in the app constructor

```
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { name: 'HHH', email: 'huanhuan.huang@safetyculture.io', status: 'Active' },
        { name: 'Zhihao', email: 'zhihao.huang@safetyculture.io', status: 'Invited' },
        { name: 'Kevin New', email: 'kevin.mchugh@safetyculture.io', status: 'Deactive' },
      ],
      headers: { name: 'Name', email: 'Email', status: 'Status' }
    };
  }
```

- Read headers from the data when `render`

```
    const { headers, data } = this.state;
    const headerIds = Object.keys(this.state.headers);
```

- Dynamically general table header

```
            {headerIds.map((headerId, index) =>
              <th key={index}>{headers[headerId]}</th>
            )}
```

Full code snippet

```
  render() {
    const { headers, data } = this.state;
    const headerIds = Object.keys(this.state.headers);

    return (
      <Container>
        <Table>
          <tbody>
          <tr>
            {headerIds.map((headerId, index) =>
              <th key={index}>{headers[headerId]}</th>
            )}
          </tr>
          <tr>
            <td>HHH</td><td>huanhuan.huang@safetyculture.io</td><td>Active</td>
          </tr>
          <tr>
            <td>Zhihao</td><td>zhihao.huang@safetyculture.io</td><td>Invited</td>
          </tr>
          <tr>
            <td>Kevin</td><td>kevin.mchugh@safetyculture.io</td><td>Deactive</td>
          </tr>
          </tbody>
        </Table>
      </Container>
    );
  }
```

**Your turn: dynamically generated table content

**What you have**
You have the data from previous exercise



**Expectation**
Replace hard coded table content with the one from data
Time frame: 10 minutes
  
<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

**Solution**

```
          {contents.map((content, contentIndex) =>
            <tr key={contentIndex}>
              {headerIds.map((headerId, index) =>
                <td key={index}>{content[headerId]}</td>
              )}
            </tr>
          )}
```

## Apply the badge component

We need to massage the data to include the badge component
```
{
      data: [
        { name: 'HHH', email: 'huanhuan.huang@safetyculture.io', status: <Badge appearance="added" value="Active" /> },
        { name: 'Zhihao', email: 'zhihao.huang@safetyculture.io', status: <Badge appearance="primary" value="Invited" /> },
        { name: 'Kevin', email: 'kevin.mchugh@safetyculture.io', status: <Badge appearance="important" value="Deactived" /> },
      ],
      headers: { name: 'Name', email: 'Email', status: 'Status' }
}
```

## Extract table component

**Create a new file under `components` folder called `Table.js`**

Define a Table component. We can pass headers and content into the component as its properties. We decide what to pass in. And table will be in charge of rendering those data.

We slowly migrate the table related JSX from App.js to Table.js.

Finally, Table.js becomes
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
```

`render` function in App.js becomes
```
  render() {
    const { headers, contents } = this.state;

    return (
      <Container>
        <Table data={{ headers, contents }} />
      </Container>
    );
  }
```


##Introducing pages**

Both pages have table components, but the render content are different.

Let's modify the data to has the concept of pages

```
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
            { name: 'Townsville', members: 'huanhuan.huang@safetyculture.io', createdBy: 'Tom dance' },
          ],
          headers: { name: 'Group names', members: 'Members', createdBy: 'Created by' },
        }
      ]
    };
```

And then in `render` function

```
  render() {
    const { headers, contents, title } = this.state.pages[0];

    return (
      <Container>
        <div>
          <h1>{title}</h1>
          <Table data={{ headers, contents }} />
        </div>
      </Container>
    );
  }
```

##Challenge: Change the members data in 'Groups' page into 3 avatars
Tips: use library [https://atlaskit.atlassian.com/packages/core/avatar](https://atlaskit.atlassian.com/packages/core/avatar)

**Expectation**

![alt text](https://github.com/SafetyCulture/react-workshop-teammanagement/raw/master/src/assets/challenge2.png)


<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

**Solution**

In terminal
```
yarn add @atlaskit/avatar
```

Import Avatar to App component

```
import Avatar from '@atlaskit/avatar';
```

Replace `members` in the second page data with this.
```
            <div>
              <Avatar name="small" size="small" presence="online" />
              <Avatar name="small" size="small" presence="online" />
              <Avatar name="small" size="small" presence="online" />
            </div>
```







