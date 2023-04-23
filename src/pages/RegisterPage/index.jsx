import styles from "./style.module.css";

function RegisterPage() {
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
  
    const handleSignupSubmit = (e) => {
      e.preventDefault();
      console.log(`Email: ${e.target.email.value}, Password: ${e.target.password.value }`);
    }
  
  
    return (
        <div className={styles.auth_container}>
          <div className={styles.auth_form}>
          <h2>Sign Up</h2>
          <form onSubmit={handleSignupSubmit}>
              <div className={styles.form_control}>
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  placeholder="Enter your email" 
                />
              </div>
              <div className={styles.form_control}>
                <label htmlFor="password">Password</label>
                <input 
                  type="password" 
                  id="password" 
                  placeholder="Enter your password" 
                />
              </div>
              <button>Sign Up</button>
            </form>
          </div>
        </div>
    );
}

export default RegisterPage