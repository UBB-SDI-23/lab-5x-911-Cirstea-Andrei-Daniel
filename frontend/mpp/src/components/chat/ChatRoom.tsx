import React, { useEffect, useState } from 'react';
import { Frame, over } from 'stompjs';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import './ChatRoom.css';
import { ServerSettings } from '../ServerIP';

interface ChatMessage {
  senderName: string;
  receiverName?: string;
  message: string;
  status: string;
}

export const ChatRoom = () => {
  const [privateChats, setPrivateChats] = useState<Map<string, ChatMessage[]>>(new Map());
  const [publicChats, setPublicChats] = useState<ChatMessage[]>([]);
  const [tab, setTab] = useState<string>('CHATROOM');
  const [userData, setUserData] = useState({
    username: '',
    receivername: '',
    connected: false,
    message: '',
  });
  const [stompClient, setStompClient] = useState<Stomp.Client | null>(null)

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  useEffect(() => {
    if (stompClient != null) {  
      stompClient.connect(userData.username, "", onConnected, onError);
    }
    else {
      console.log("Stomp client is null")
    }
  }, [stompClient])

  const onError = (err: string | Frame) => {
    console.log(err);
  };

  const connect = () => {
    let Sock = new SockJS(ServerSettings.API_ENDPOINT + '/ws');
    setStompClient(over(Sock));    
  };

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    if (stompClient != null) {
      stompClient.subscribe('/chatroom/public', onMessageReceived);
      stompClient.subscribe('/user/' + userData.username + '/private', onPrivateMessage);
    }
    userJoin();
  };

  const userJoin = () => {
    if (stompClient != null) {
      var chatMessage: ChatMessage = {
        senderName: userData.username,
        status: 'JOIN',
        message: ''
      };
      stompClient.send('/app/message', {}, JSON.stringify(chatMessage));
    }
  };

  const onMessageReceived = (payload: Stomp.Message) => {
    var payloadData: ChatMessage = JSON.parse(payload.body);
    switch (payloadData.status) {
      case 'JOIN':
        if (!privateChats.get(payloadData.senderName)) {
          privateChats.set(payloadData.senderName, []);
          setPrivateChats(new Map(privateChats));
        }
        break;
      case 'MESSAGE':
        setPublicChats((prevChats) => [...prevChats, payloadData]);
        break;
    }
  };

  const onPrivateMessage = (payload: Stomp.Message) => {
    var payloadData: ChatMessage = JSON.parse(payload.body);
    if (privateChats.get(payloadData.senderName)) {
      privateChats.get(payloadData.senderName)?.push(payloadData);
      setPrivateChats(new Map(privateChats));
    } else {
      let list: ChatMessage[] = [];
      list.push(payloadData);
      privateChats.set(payloadData.senderName, list);
      setPrivateChats(new Map(privateChats));
    }
  };

  const handleMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUserData({ ...userData, message: value });
  };

  const sendValue = () => {
    console.log("Here")
    console.log(stompClient)
    if (stompClient != null) {
      console.log("Message is " + userData.message)
      var chatMessage: ChatMessage = {
        senderName: userData.username,
        message: userData.message,
        status: 'MESSAGE',
      };
      stompClient.send('/app/message', {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: '' });
    }
  };

  const sendPrivateValue = () => {
    if (stompClient) {
      var chatMessage: ChatMessage = {
        senderName: userData.username,
        receiverName: tab,
        message: userData.message,
        status: 'MESSAGE',
      };

      if (userData.username !== tab) {
        privateChats.get(tab)?.push(chatMessage);
        setPrivateChats(new Map(privateChats));
      }
      stompClient.send('/app/private-message', {}, JSON.stringify(chatMessage));
      setUserData({ ...userData, message: '' });
    }
  };

  const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUserData({ ...userData, username: value });
  };

  const registerUser = () => {
    connect();
  };

  return (
    <div className="container">
      {userData.connected ? (
        <div className="chat-box">
          <div className="member-list">
            <ul>
              <li onClick={() => setTab('CHATROOM')} className={`member ${tab === 'CHATROOM' && 'active'}`}>
                Chatroom
              </li>
              {[...privateChats.keys()].map((name, index) => (
                <li
                  onClick={() => setTab(name)}
                  className={`member ${tab === name && 'active'}`}
                  key={index}
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
          {tab === 'CHATROOM' && (
            <div className="chat-content">
              <ul className="chat-messages">
                {publicChats.map((chat, index) => (
                  <li className={`message ${chat.senderName === userData.username && 'self'}`} key={index}>
                    {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                    <div className="message-data">{chat.message}</div>
                    {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                  </li>
                ))}
              </ul>

              <div className="send-message">
                <input
                  type="text"
                  className="input-message"
                  placeholder="enter the message"
                  value={userData.message}
                  onChange={handleMessage}
                />
                <button type="button" className="send-button" onClick={sendValue}>
                  send
                </button>
              </div>
            </div>
          )}
          {tab !== 'CHATROOM' && (
            <div className="chat-content">
              <ul className="chat-messages">
                {[...(privateChats.get(tab) || [])].map((chat, index) => (
                  <li className={`message ${chat.senderName === userData.username && 'self'}`} key={index}>
                    {chat.senderName !== userData.username && <div className="avatar">{chat.senderName}</div>}
                    <div className="message-data">{chat.message}</div>
                    {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                  </li>
                ))}
              </ul>

              <div className="send-message">
                <input
                  type="text"
                  className="input-message"
                  placeholder="enter the message"
                  value={userData.message}
                  onChange={handleMessage}
                />
                <button type="button" className="send-button" onClick={sendPrivateValue}>
                  send
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="register">
          <input
            id="user-name"
            placeholder="Enter your name"
            name="userName"
            value={userData.username}
            onChange={handleUsername}
          />
          <button type="button" onClick={registerUser}>
            connect
          </button>
        </div>
      )}
    </div>
  );
};