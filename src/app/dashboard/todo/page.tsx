"use client"

import {ApolloClient, gql, InMemoryCache, useQuery} from '@apollo/client';
import styles from './page.module.scss';
import {useState} from 'react';
import Popup from '@/app/dashboard/todo/popup';

const client = new ApolloClient({
  uri: "http://localhost:9091/graphql",
  cache: new InMemoryCache(),
});

const GET_ALL_TASKS = gql`
    query GetAllTasks {
        getAllTasks {
            id
            name
            description
            color
            author
        }
    }
`;

const TodoList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { loading, error, data, refetch } = useQuery(GET_ALL_TASKS, { client });

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.root}>
      {data?.getAllTasks.map((task) => (
        <div className={styles.card} style={{ backgroundColor: task.color }}>
          <h2>{task.name}</h2>
          <p>{task.description}</p>
          <p>Author: {task.author}</p>
        </div>
      ))}
      <div className={styles.add_btn} onClick={() => setIsOpen(true)}>
        <p>+</p>
      </div>
      {
        isOpen && (
          <Popup setOpen={setIsOpen} refetch={refetch} />
        )
      }
    </div>
  );
}

export default TodoList;
