import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import apiCalls from '../../apiRequest';
import styles from "./style.module.css";
import { BiCamera } from 'react-icons/bi';
import { FaUserCircle } from 'react-icons/fa';
import { userContext } from '../../layout';

function Avatar({avatar,upload}) {
  const { user } = useContext(userContext)
  const [profileImage, setProfileImage] = useState(true);
  const photoInput = useRef();
  const [imageURL, setImageURL] = useState(avatar);

  const openFileExplorer = () => {
    if (upload){
      photoInput.current.click();
    } 
      return
  }
  
  const readPhoto = (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0], e.target.files[0].name);
    formData.append("email", user.email);
    apiCalls("post", 'user/uploadAvatar', formData)
    .then(res=>setImageURL(res.data))
  }

  return (
    <div className={styles.avatar}>
      <input className={styles.input_file}
        ref={photoInput}
        type="file"
        onInput={(e) => readPhoto(e)}
      />

      <span className={styles.avatarCircle} onClick={openFileExplorer}>
        {imageURL && profileImage ?
       <img className={styles.avatarImage} src={imageURL} alt="avatar" onError={()=>setProfileImage(false)}  />
          :
          <FaUserCircle className={styles.defultAvatar} />
        }
      </span>
    </div>
  )
}

export default Avatar