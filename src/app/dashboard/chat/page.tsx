"use client"

import {useEffect, useState} from 'react';
import styles from './page.module.scss';

const Chat = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:9090/chat");
    setSocket(ws);

    ws.onmessage = (event) => {
      const receivedMessage = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, receivedMessage]);
    };

    return () => ws.close();
  }, []);

  const sendMessage = () => {
    if (socket && message.trim()) {
      socket.send(JSON.stringify({ author: localStorage.getItem("userFullName"), text: message }));
      setMessage("");
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.chat}>
          {messages.map((msg, index) => (
            <p key={index}>
              <strong>{msg.author}:</strong> {msg.text}
            </p>
          ))}
        </div>
        <div>
          <input
            type="text"
            onChange={(event) => setMessage(event.target.value)}
            value={message}
          />
          <button onClick={sendMessage}>Send message</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
