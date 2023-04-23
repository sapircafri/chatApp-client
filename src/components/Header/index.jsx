import React from 'react'
import Avatar from '../Avatar';
import styles from "./style.module.css";


function Header() {
    return (
        <div className={styles.header}>
            <div className={styles.icon}>
                <span> ChatApp </span>
            </div>
           

        </div>

    )
}

export default Header