import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import apiCalls from '../../apiRequest';
import styles from "./style.module.css";
import { BiCamera } from 'react-icons/bi';
import { FaUserCircle } from 'react-icons/fa';
import { userContext } from '../../layout';

function Avatar({avatar}) {
  const { user } = useContext(userContext)
  const [profileImage, setProfileImage] = useState(user.avatar);
  const photoInput = useRef();

  const openFileExplorer = () => {
    photoInput.current.click();

  }
  const readPhoto = (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0], e.target.files[0].name);
    formData.append("clientId", user._id);
    apiCalls("post", 'user/uploadAvatar', formData)
      .then(res => setProfileImage(user.avatar))
  }

  return (
    <div className={styles.avatar}>
      <input className={styles.input_file}
        ref={photoInput}
        type="file"
        onInput={(e) => readPhoto(e)}
      />

      <span className={styles.avatarCircle} onClick={openFileExplorer}>
        {avatar ?
          <img className={styles.avatarImage} src={avatar} alt="sas" />
          :
          <FaUserCircle className={styles.defultAvatar} />
        }
      </span>
    </div>
  )
}

export default Avatar