'use client'
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import io from 'socket.io-client';

interface Message {
  sender: string;
  content: string;
}

const ChatPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [name, setName] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [users, setUsers] = useState<string[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const socket = io('http://localhost:5000');

  useEffect(() => {
    const name = searchParams.get('name');
    if (name) {
      setName(name);
      socket.emit('join', name);
      socket.on('chat-history', (history: Message[]) => setChatHistory(history));
      socket.on('users', (users: string[]) => {
        setUsers(users);
        if (users.length > 0) {
          setSelectedUser(users[0]);
        }
      });
      socket.on('new-message', (msg: Message) => setChatHistory((prev) => [...prev, msg]));
    } else {
      router.push('/');
    }

    return () => {
      socket.disconnect();
    };
  }, [searchParams]);

  const sendMessage = () => {
    if (message) {
      const msg: Message = { sender: name as string, content: message };
      socket.emit('send-message', { message: msg, to: selectedUser });
      setChatHistory((prev) => [...prev, msg]);
      setMessage('');
    }
  };

  if (!name) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="sidebar">
        <h2>Users</h2>
        <ul>
          {users.map((user) => (
            <li
              key={user}
              onClick={() => setSelectedUser(user)}
              style={{ cursor: 'pointer' }}
              className={selectedUser === user ? 'selected' : ''}
            >
              {user}
            </li>
          ))}
        </ul>
      </div>
      <div className="main">
        <h2>Chat with {selectedUser}</h2>
        <div className="chat-history">
          {chatHistory.length === 0 && <p>No messages yet. Start the conversation!</p>}
          {chatHistory.map((msg, index) => (
            <div key={index}>
              <strong>{msg.sender}: </strong>
              <span>{msg.content}</span>
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

