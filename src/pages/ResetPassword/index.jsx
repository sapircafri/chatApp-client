import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import styles from "./style.module.css";
import apiCalls from '../../apiRequest';

// creator: sapir 

function ResetPassword() {
const location = useLocation();
const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    const newPassword = e.target.newPassword.value;
    const confirmNewPassword = e.target.confirmNewPassword.value
    if(newPassword===confirmNewPassword){
       const email = location.state.email;
        apiCalls('post', 'resetPassword', { email, newPassword })
        .then(res=>{
            console.log(res)
            navigate('/')
        })

    }

}

  return (
      
    <div className={styles.auth_container}>
    <div className={styles.auth_form}>
    <h2>Reset password</h2>
    <form onSubmit={handleReset}>
        <div className={styles.form_control}>
          <label></label>
          <input 
            name='newPassword'
            type="password" 
            id="password" 
            placeholder="Enter new password" 
          />
          <label ></label>
          <input 
            name='confirmNewPassword'
            type="password" 
            id="password" 
            placeholder="Confirm password" 
          />
        </div>
      
        <button className={styles.button}>Reset</button>
      </form>
    </div>
  </div>
    
  )
}

export default ResetPassword