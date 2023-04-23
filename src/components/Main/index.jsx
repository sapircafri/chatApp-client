import React, { useContext, useEffect, useState } from 'react'
import { messageContext, userContext } from '../../layout';
import Chat from '../Chat'
import ChatsList from '../ChatsList'
import Header from '../Header';
import styles from "./style.module.css";
import SideBar from '../Sidebar';

function Main() {
  const { messages, setMessages, selectedUserId } = useContext(messageContext);
  const { user } = useContext(userContext)
  const [onlineUsers, setOnlineUsers] = useState([]);

  function showOnlinePeople(peopleArray) {
    const people = [];
    peopleArray.forEach((userId) => {
      people[userId] = userId;
    });
    console.log(people);
    // setOnlineUsers(people)

  }

  const socket = new WebSocket(`ws://localhost:4000/:user_id=${user._id}`);
  useEffect(() => {
    connectToWs();
    return () => {
      socket.close();
    };
  }, [selectedUserId]);

  function connectToWs() {
    console.log(1111);
    socket.onmessage = async (e) => {
      const message = await JSON.parse(e.data);
      if ('online' in message) {
        // console.log(message.online);
        // showOnlinePeople(message.online)
      }
      else if ('text' in message) {
        if (selectedUserId === message.sender) {
          setMessages((prevMessages) => [...prevMessages, message])
          // console.log(message);
        }
        else {
          console.log(message);
        }
      }
    }



    // return () => {
    //   socket.close();
    // };
  }


  return (
    <div className={styles.main}>
      {/* <Header /> */}
      <SideBar />

      <div className={styles.chat} >
        <Chat socket={socket} />
      </div>
    </div>

  )
}

export default Main