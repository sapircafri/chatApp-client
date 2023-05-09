import React, { useContext, useState } from 'react'
import ChatsList from '../ChatsList'
import styles from "./style.module.css";
import { RiSearchLine } from 'react-icons/ri'
import Header from '../Header';
import Avatar from '../Avatar';
import { userContext } from '../../layout';

function SideBar() {
    const { user } = useContext(userContext);
    const [upload,setUpload] = useState(true);

    return (
        <div className={styles.sideBar}>
                
                <div className={styles.sideBar_header}>
                <Avatar avatar = {user.avatar} upload={upload}/>
                </div>
          
            <ChatsList />
        </div>
    )
}

export default SideBar