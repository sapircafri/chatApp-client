import { useContext } from "react";
import apiCalls, { setToken } from "../../apiRequest";
import styles from "./style.module.css";
import { userContext } from "../../layout";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const { setUser } = useContext(userContext);
  const navigate = useNavigate();

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    apiCalls("post", "sign-up", {
      fname: e.target.fname.value,
      lname: e.target.lname.value,
      email: e.target.email.value,
      Password: e.target.password.value,
    })
      .then((res) => {
        if (res.data) {
          setToken(res.data[1]);
          setUser(res.data[0]);
          localStorage.token = JSON.stringify("Bearer " + res.data[1]);
          navigate('/')
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };



  return (
    <div className={styles.auth_container}>
      <div className={styles.auth_form}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSignupSubmit}>
          <div className={styles.form_control}>
            <label htmlFor="fname">First Name</label>
            <input
              type="fname"
              id="fname"
              placeholder="Enter your first name"
            />
          </div>
          <div className={styles.form_control}>
            <label htmlFor="lname">Last Name</label>
            <input
              type="lname"
              id="lname"
              placeholder="Enter your last name"
            />
          </div>
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