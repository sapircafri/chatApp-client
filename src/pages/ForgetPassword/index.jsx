import React from 'react'
import styles from "./style.module.css";

function ForgetPassword() {

    const handleSendToEmail = (e) => {
        e.preventDefault();
        console.log(`Email: ${e.target.email.value}`);
      }
  return (


    <div className={styles.auth_container}>
          <div className={styles.auth_form}>
          <h2>forgot password</h2>
          <form onSubmit={handleSendToEmail}>
              <div className={styles.form_control}>
                <label htmlFor="email">Email</label>
                <input 
                name='email'
                  type="email" 
                  id="email" 
                  placeholder="Enter your email" 
                />
              </div>
            
              <button className={styles.button}>Send</button>
            </form>
          </div>
        </div>
  )
}

export default ForgetPassword