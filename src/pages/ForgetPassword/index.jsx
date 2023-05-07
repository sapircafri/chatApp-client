import React, { useState } from 'react'
import styles from "./style.module.css";
import { useNavigate } from 'react-router-dom';
import apiCalls from '../../apiRequest';

function ForgetPassword() {

  const [codeToReset, setCodeToReset] = useState();
  const [userEmail, setUserEmail] = useState()
  const navigate = useNavigate();

  const handleSendToEmail = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    setUserEmail(email)
    const code = Math.floor(Math.random() * 9000 + 1000);
    apiCalls('post', 'forgetPassword', { email, code });
    setCodeToReset(code);
  }

  const verifyCode = (e) => {
    e.preventDefault();
    if (codeToReset == e.target.code.value) {
      navigate("/resetPassword", { state: { email: userEmail } })
      console.log("good");
    }
    else {
      console.log("no");
    }

  }

  return (


    <div className={styles.auth_container}>
      <div className={styles.auth_form}>
        <h2>forgot password</h2>
        {!codeToReset ?

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
          :
            <form onSubmit={verifyCode} >
            <div className={styles.form_control}>
            <label htmlFor="code">We sent you a code to your email address</label>
                <input
                  name='code'
                  type="code"
                  id="code"
                  placeholder="Enter the code"
                />

              </div>
                <button className={styles.button}>Send</button>
            </form>
        }
      </div>
    </div>
  )
}

export default ForgetPassword