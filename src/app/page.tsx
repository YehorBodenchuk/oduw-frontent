"use client"

import styles from './page.module.scss';
import { useState } from 'react';
import {useRouter} from 'next/navigation';

const SignPage = () => {
  const router = useRouter();
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerFirstName, setRegisterFirstName] = useState('');
  const [registerLastName, setRegisterLastName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const register = () => {
    const url = `http://localhost:8080/api/v1/user/register`;
    const request = {
      firstName: registerFirstName,
      lastName: registerLastName,
      email: registerEmail,
      password: registerPassword
    };

    fetch(url, { method: 'POST', body: JSON.stringify(request), headers: { 'Content-Type': 'application/json' } })
      .then((response) => response.json())
      .then((result) => {
        localStorage.setItem('userId', result.id)
        localStorage.setItem('userFullName', `${result.firstName} ${result.lastName}`)
        router.push('/dashboard/profile');
      }).catch((err) => console.log(err))
  };

  const login = () => {
    const url = `http://localhost:8080/api/v1/user/login`;
    const request = {
      email: loginEmail,
      password: loginPassword
    };

    fetch(url, { method: 'POST', body: JSON.stringify(request), headers: { 'Content-Type': 'application/json' } })
      .then((response) => response.json())
      .then((result) => {
        localStorage.setItem('userId', result.id)
        localStorage.setItem('userFullName', `${result.firstName} ${result.lastName}`)
        router.push('/dashboard/profile');
      }).catch((err) => console.log(err));
  };

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.sign_in}>
          <div>
            <h2>LOGIN TO ACCOUNT</h2>
          </div>
          <input
            placeholder="Enter your email..."
            value={loginEmail}
            onChange={(event) => setLoginEmail(event.target.value)}
            type="text"
          />
          <input
            placeholder="Enter your password..."
            value={loginPassword}
            onChange={(event) => setLoginPassword(event.target.value)}
            type="password"
          />
          <button onClick={login}>LOGIN</button>
        </div>
        <div className={styles.sign_up}>
          <div>
            <h2>OR REGISTER NEW ONE</h2>
          </div>
          <input
            placeholder="Enter your first name..."
            value={registerFirstName}
            onChange={(event) => setRegisterFirstName(event.target.value)}
            type="text"
          />
          <input
            placeholder="Enter your last name..."
            value={registerLastName}
            onChange={(event) => setRegisterLastName(event.target.value)}
            type="text"
          />
          <input
            placeholder="Enter your email..."
            value={registerEmail}
            onChange={(event) => setRegisterEmail(event.target.value)}
            type="text"
          />
          <input
            placeholder="Enter your password..."
            value={registerPassword}
            onChange={(event) => setRegisterPassword(event.target.value)}
            type="password"
          />
          <button onClick={register}>REGISTER</button>
        </div>
      </div>
    </div>
  );
};

export default SignPage;
