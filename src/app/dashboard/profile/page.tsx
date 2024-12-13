"use client"

import styles from './page.module.scss';
import {useEffect, useState} from 'react';
import {redirect} from 'next/navigation';

type User = {
  id?: number,
  password?: string,
  email?: string,
  firstName?: string,
  lastName?: string,
}

const Profile = () => {
  const [user, setUser] = useState<User>({});

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const url = `http://localhost:8080/api/v1/user/${userId}`;

    fetch(url, { method: 'GET' })
      .then((response) => response.json())
      .then((result) => setUser(result))
  }, []);

  const logout = () => {
    localStorage.removeItem('userId');
    redirect('/');
  }

  const updateUser = () => {
    const userId = localStorage.getItem('userId');
    const url = `http://localhost:8080/api/v1/user/${userId}`;

    fetch(url, { method: 'PUT', body: JSON.stringify(user), headers: { 'Content-Type': 'application/json' } })
      .then((response) => response.json())
      .then((result) => setUser(result));
  };

  const deleteAccount = () => {
    const userId = localStorage.getItem('userId');
    const url = `http://localhost:8080/api/v1/user/${userId}`;

    fetch(url, { method: 'DELETE' })
      .then(() => {
        logout();
      });
  };

  return (
    <div className={styles.root}>
      <div className={styles.root__container}>
        <div className={styles.root__stack}>
          <div className={styles.root__input_stack}>
        <span>
          <b>1</b>
          <h2>Profile</h2>
        </span>
            <p>First name</p>
            <input
              value={user.firstName || ''}
              onChange={(event) => setUser((prev) => ({...prev, firstName: event.target.value}))}
              type="text"
            />
            <p>Last name</p>
            <input
              value={user.lastName || ''}
              onChange={(event) => setUser((prev) => ({...prev, lastName: event.target.value}))}
              type="text"
            />
          </div>
          <div className={styles.root__input_stack}>
        <span>
          <b>2</b>
          <h2>Credentials</h2>
        </span>
            <p>Password</p>
            <input
              value={user.password || ''}
              onChange={(event) => setUser((prev) => ({...prev, password: event.target.value}))}
              type="text"
            />
            <p>Email</p>
            <input
              value={user.email || ''}
              onChange={(event) => setUser((prev) => ({...prev, email: event.target.value}))}
              type="text"
            />
          </div>
        </div>

        <div>
          <button onClick={updateUser}>Save</button>
          <button onClick={deleteAccount}>Delete Account</button>
          <button onClick={logout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
