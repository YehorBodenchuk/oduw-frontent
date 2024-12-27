import './Popup.scss';
import { useState } from 'react';
import { GraphQLClient, gql } from 'graphql-request';

const colors = [
  '#fdf3b4',
  '#d1eaed',
  '#ffdadb',
  '#ffd4aa'
]

const endpoint = 'http://localhost:9091/graphql';

const addTask = async (name, description, color, author) => {
  const client = new GraphQLClient(endpoint);

  // GraphQL Mutation
  const mutation = gql`
      mutation AddTask($name: String!, $description: String!, $color: String!, $author: String!) {
          addTask(name: $name, description: $description, color: $color, author: $author) {
              id
              name
              description
              color
              author
          }
      }
  `;

  // Отправка запроса
  const variables = { name, description, color, author };

  try {
    const data = await client.request(mutation, variables);
    return data.addTask;
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
};

const Popup = (props) => {
  // eslint-disable-next-line react/prop-types
  const { setOpen, saveTask, refetch } = props;
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const save = () => {
    addTask(name, description, colors[Math.floor(Math.random() * colors.length)], 'system')
      .then(() => {
        refetch();
        setOpen(false);
      })
      .catch(err => console.log(err))
  }


  return (
    <div className="popup">
      <div className="popup__container">
        <button onClick={() => setOpen(false)}>Close</button>
        <input type="text" value={name} onChange={(event) => setName(event.target.value)}/>
        <textarea value={description} onChange={(event) => setDescription(event.target.value)}/>

        <div>
          <button onClick={() => setOpen(false)}>Discard</button>
          <button onClick={save}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
