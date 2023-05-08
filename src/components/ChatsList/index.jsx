import React, { useContext, useEffect, useRef, useState } from 'react'
import apiCalls from '../../apiRequest';
import { messageContext, userContext } from '../../layout';
import styles from "./style.module.css";
import { TbMessageCircle, TbPointFilled } from 'react-icons/tb'
import Avatar from '../Avatar';
import { RiSearchLine } from 'react-icons/ri';
import { BsArrowLeft } from 'react-icons/bs';

function ChatsList({ onlineUsers }) {
  const { user } = useContext(userContext);
  const { handleUser, selectedUserId } = useContext(messageContext);
  const [chatList, setChatList] = useState([])
  const [filteredChatList, setFilteredChatList] = useState([]);
  const [startNewChat, setStartNewChat] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    apiCalls("get", `user/getUsers/${user._id}`)
      .then(res => {
        setChatList(res.data)
        setFilteredChatList(res.data);

      })
  }, [])

  const searchUser = (input) => {
    if (!startNewChat) {
      setFilteredChatList([]);
      setStartNewChat(false)
    }
    else {
      if (startNewChat) {
        if(input==''){
          setFilteredChatList(null)
          return
        }
        apiCalls("get", `user/getUsersByName/${input}`)
          .then(res => {
            res.data.length ==0 ?
              setFilteredChatList(null)
              :
              setFilteredChatList(res.data);
          })
      }
      else {
        const filteredList = chatList.filter((v) =>
          v.fname.toLowerCase().includes(input.toLowerCase()) || v.lname.toLowerCase().includes(input.toLowerCase()));
        setFilteredChatList(filteredList);

      }
    }
  }
  const searchFromAllUsers = () => {
    setStartNewChat(true);
    setFilteredChatList(null);
    inputRef.current.focus();
  }



  return (
    <>
      <div className={styles.search_peaple}>
        {startNewChat?
          <BsArrowLeft className={styles.search_icon} onClick={()=>setStartNewChat(false)} />
          :
          <RiSearchLine className={styles.search_icon} />
        }
        <input
          ref={inputRef}
          className={styles.search_input}
          type="text"
          placeholder='search..'
          onChange={(e) => searchUser(e.target.value)}
        />
      </div>

      <div className={styles.chatList_container}>
        {chatList.length === 0 && !startNewChat ? (
          <div className={styles.selectUser}>
            <span>To start a chat, search for a person!</span>
          </div>
        ) : (
          filteredChatList &&
          filteredChatList.map((v) =>
            user._id !== v._id && (
              <div
                id={v._id}
                className={`${styles.user} ${selectedUserId === v._id ? styles.selectedUser : ''}`}
                onClick={() => handleUser(v)}
              >
                {v.avatar === 'default-avatar.png' ? (
                  <div className={styles.avatar}><Avatar /></div>
                ) : (
                  <div className={styles.avatar}><Avatar avatar={v.avatar} /></div>
                )}
                <div>
                  {v.fname} {v.lname}
                </div>
              </div>
            )
          )
        )}
        <div className={styles.newChat}><TbMessageCircle className={styles.newChatIcon} onClick={searchFromAllUsers} /></div>
      </div>
    </>
  );
}

export default ChatsList;