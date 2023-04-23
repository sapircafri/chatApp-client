import React, { useContext } from 'react'
import ChatsList from '../ChatsList'
import styles from "./style.module.css";
import { RiSearchLine } from 'react-icons/ri'
import Header from '../Header';
import Avatar from '../Avatar';
import { userContext } from '../../layout';

function SideBar() {
    const { user } = useContext(userContext);

    return (
        <div className={styles.sideBar}>
                
                <div className={styles.sideBar_header}>
                <Avatar avatar = {user.avatar}/>
                </div>
          
            <ChatsList />
        </div>
    )
}

export default SideBar