import React, { useEffect, useState } from 'react';
import { Frame, over } from 'stompjs';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import './ChatRoom.css';
import { ServerSettings } from '../ServerIP';
import * as Authentication from '../../helpers/Authentication';
import { EndPoints } from '../../Endpoints';
import { UserNickname } from '../../models/UserNickname';
import { AxiosError } from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, CircularProgress, Snackbar } from '@mui/material';
import { UserChatMessage } from '../../models/UserChatMessage';

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
  const [failed_dialog, set_failed_dialog] = useState(false)
  const [failed_dialog_message, set_failed_dialog_message] = useState("")
  const [go_to_connect, set_go_to_connect] = useState(false)
  const [snackbarOpen, setSnakcbarOpen] = useState(false);

  const handleSnackbarOpen = () => {
    setSnakcbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnakcbarOpen(false);
  };

  const handle_failed_dialog_open = () => {
    set_failed_dialog(true)
}

  const handle_failed_dialog_close = () => {
      set_failed_dialog(false)
  }

  useEffect(() => {
    if (Authentication.getAuthId() != -1) {
      let endpoint = EndPoints.backendUserNickname(Authentication.getAuthId());
      Authentication.make_request('GET', endpoint, "")
      .then((data) => {
        let response_data = data.data;
        if (response_data != "") {
          console.log("Existing nickname " + response_data);
          setUserData({ ...userData, username: response_data });
          set_go_to_connect(true)
        }
      })
      .catch(
        (exception: AxiosError) => { console.log(exception.message) }
      )
    }
  }, [])

  useEffect(() => {
    if (go_to_connect) {
      connect()
    }
  }, [go_to_connect])

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
    handleSnackbarOpen()
    let Sock = new SockJS(ServerSettings.API_ENDPOINT + '/ws');
    setStompClient(over(Sock));    
  };

  const onConnected = () => {
    setUserData({ ...userData, connected: true });
    handleSnackbarClose()
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

  const store_message_to_database = () => {
    if (Authentication.getAuthId() != -1) {
      let user_chat_message = new UserChatMessage();
      user_chat_message.user.id = Authentication.getAuthId();
      user_chat_message.date = new Date();
      user_chat_message.message = userData.message;
      Authentication.make_request('POST', ServerSettings.API_ENDPOINT + EndPoints.BACKEND_SAVE_CHAT_MESSAGE, user_chat_message);
    }
  }

  const sendValue = () => {
    if (stompClient != null) {
      console.log("Message is " + userData.message)
      var chatMessage: ChatMessage = {
        senderName: userData.username,
        message: userData.message,
        status: 'MESSAGE',
      };
      stompClient.send('/app/message', {}, JSON.stringify(chatMessage));
      store_message_to_database()
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
      store_message_to_database()
      setUserData({ ...userData, message: '' });
    }
  };

  const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUserData({ ...userData, username: value });
  };

  const registerUser = () => {
    if (Authentication.getAuthId() != -1) {
      let user_nickname = new UserNickname();
      user_nickname.nickname = userData.username;
      user_nickname.user.id = Authentication.getAuthId();
      Authentication.make_request('POST', ServerSettings.API_ENDPOINT + EndPoints.BACKEND_USER_NICKNAME, user_nickname)
      .then()
      .catch(
        (exception: AxiosError) => { set_failed_dialog_message(exception.message); handle_failed_dialog_open() }
      )
    }
    connect();
  };

  let failed_dialog_element;
  if (failed_dialog) {
      failed_dialog_element = <div>
          <Dialog
          open={failed_dialog}
          onClose={handle_failed_dialog_open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          >
          <DialogTitle id="alert-dialog-title">
              {"Failure"}
          </DialogTitle>
          <DialogContent>
              <DialogContentText id="alert-dialog-description">
                  {failed_dialog_message}
              </DialogContentText>
          </DialogContent>
          <DialogActions>
              <Button onClick={handle_failed_dialog_close} autoFocus>
                  OK
              </Button>
          </DialogActions>
          </Dialog>
      </div>
  }


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
                  Send
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
                  Send
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
          <button disabled={snackbarOpen} type="button" onClick={registerUser}>
            Connect
          </button>
        </div>
      )}
      {failed_dialog}

      <Snackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message="Loading..."
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <CircularProgress color="inherit" />
      </Snackbar>

    </div>
  );
};