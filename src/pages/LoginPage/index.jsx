import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiCalls, { setToken } from "../../apiRequest";
import { userContext } from "../../layout";
import styles from "./style.module.css";

function LoginPage() {
  const { setUser } = useContext(userContext);
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    apiCalls("post", "login", {
      email: e.target.email.value,
      password: e.target.password.value,
    })
      .then((res) => {
        if (res.data) {
          setToken(res.data[1]);
          setUser(res.data[0]);
          localStorage.token = JSON.stringify("Bearer " + res.data[1]);
        }
      })
      .catch((error) => {
        // loginPopUp();
        console.log(error);
      });
  };


  // const handleForgetPass = async ()=>{

  // }

  return (
    <div className={styles.auth_container}>
      <div className={styles.auth_form}>
        <h2>Login</h2>
        <form onSubmit={handleLoginSubmit}>
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
            <span>
              <Link to={'/forgetPassword'}>
                forget Password?
              </Link>
            </span>
          </div>
          <button className={styles.button}>Login</button>
        </form>
        <span className={styles.register}>
          don't have an account?{" "}
          <Link to={'/register'}>
            sign-up
          </Link>
        </span>
      </div>
    </div>
  );
}

export default LoginPage;
