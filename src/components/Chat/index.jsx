import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from "./style.module.css";
import { BsFillSendFill } from 'react-icons/bs'
import { MdAttachFile } from 'react-icons/md'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

import { messageContext, userContext } from '../../layout';
import websocket from 'websocket';
import Avatar from '../Avatar';
import apiCalls from '../../apiRequest';
const mime = require('mime');

function Chat({ socket }) {

  const { messages, setMessages, selectedUserId, otherUser } = useContext(messageContext);
  const { user } = useContext(userContext)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);


  const inputTextRef = useRef();
  const currentDateRef = useRef('');
  const inputFiles = useRef();


  const handleSend = () => {
    const message = {
      sender: user._id,
      receiver: selectedUserId,
      text: inputTextRef.current.value,
      file: null, // set file to null initially
      timestamp: new Date().toISOString()
    };
    if (inputFiles.current.files.length > 0) {
      const formData = new FormData();
      formData.append("file", inputFiles.current.files[0], inputFiles.current.files[0].name);
      formData.append("sender", user._id);
      formData.append("receiver", selectedUserId);
      formData.append("timestamp", new Date().toISOString());
  
      apiCalls("post", 'message/uploadFile', formData)
        .then(res => {
          message.file = res.data; 
          setMessages((prevMessages) => [...prevMessages, message]);
          socket.send(JSON.stringify(message));
          inputFiles.current.value = '';
          inputTextRef.current.value = '';
        });
    } else {
      setMessages((prevMessages) => [...prevMessages, message]);
      socket.send(JSON.stringify(message));
      inputTextRef.current.value = '';
    }
  };
  

  const shouldDisplayDate = (messageDate) => {
    if (messageDate !== currentDateRef.current) {
      currentDateRef.current = messageDate;
      return true;
    }
    return false;
  }

  const uploudFile = () => {
    inputFiles.current.click();
  }

  return (

    <div className={styles.chat_container}>
      {otherUser &&
        <div className={styles.user_details}>
          <span>
            {otherUser.avatar == 'default-avatar.png' ?
              <Avatar avatar={''} />
              :
              <Avatar avatar={otherUser.avatar} />
            }
            {otherUser.fname}{" "}{otherUser.lname}
          </span>
        </div>
      }
      {selectedUserId ? <>
        <div className={styles.messages}>
          {messages.map((message, index) => {
            console.log(message);
            const displayDate = shouldDisplayDate(new Date(message.timestamp).toLocaleDateString());
            return (
              <>
                {displayDate ?
                  <div className={styles.date}>
                    <span>{new Date(message.timestamp).toLocaleDateString([], { month: '2-digit', day: '2-digit', year: '2-digit', })}</span>
                  </div>
                  : null
                }
                <div className={`${message.sender === user._id ? styles.message_sender : styles.message_receiver}`} >
                  {/* <div className={styles.messageAvatar}><Avatar avatar={message.sender === user._id ? user.avatar : otherUser.avatar} /></div> */}
                    <div key={index} className={`${message.sender === user._id ? styles.text_sender : styles.text_receiver}`}>
                  {message.text ?
                  <span>
                      {message.text}
                  </span>:
                      mime.getType(message.file).startsWith('image/') ?
                        <img className={styles.imgMessage} src={message.file} alt="" /> :
                        <a href={message.file} download={message.file}>Download File</a>
                    }
                    </div>
                    
                  <span className={`${message.sender === user._id ? styles.timestamp_sender : styles.timestamp_receiver}`} >
                    {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </>
            );
          })}
        </div>


        <div className={styles.input_send}>
          <div className={styles.iconDiv} onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😊

            {showEmojiPicker && (
              <div className={styles.emojiSelector}>
                <Picker data={data} onEmojiSelect={(emoji) => inputTextRef.current.value += emoji.native} />
              </div>
            )}
          </div>
          <input type="file" style={{ display: 'none' }} ref={inputFiles} onInput={handleSend} />
          <div className={styles.iconDiv}><MdAttachFile style={{ transform: 'rotate(30deg)' }} className={styles.icon} onClick={uploudFile} /></div>
          <input type="text" placeholder='Type a message' ref={inputTextRef} />
          <div className={styles.iconDiv}><BsFillSendFill className={styles.icon} onClick={handleSend} /></div>
        </div>

      </>
        : <div className={styles.selectUser}>
          <span>&larr; Select a person from the sidebar</span>
        </div>

      }
    </div>
  )
}



export default Chat






