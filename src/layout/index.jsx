import React, { createContext, useEffect, useState } from "react";
import styles from "./style.module.css";
import Chat from "../components/Chat";
import ChatsList from "../components/ChatsList";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import { Route, Routes } from "react-router-dom";
import apiCalls, { setToken } from "../apiRequest";
import ForgetPassword from "../pages/ForgetPassword";
import Header from "../components/Header";
import Main from "../components/Main";

export const userContext = createContext();
export const messageContext = createContext();

function Layout() {
  const [user, setUser] = useState();
  const [selectedUserId, setSelectedUserId] = useState();
  const [otherUser, setOtherUser] = useState()
  const [messages, setMessages] = useState([]);

  const handleUser = (otheruser) => {
    apiCalls("get", `message/getMessages/${user._id}/${otheruser._id}`)
      .then(res => {
        setSelectedUserId(otheruser._id)
        setOtherUser(otheruser)
        setMessages(res.data)
      })

  }

  useEffect(() => {
    const startApp = async () => {
      const haveToken = JSON.parse(localStorage.token);
      if (haveToken) {
        await setToken(haveToken.replace("Bearer ", ""));
        apiCalls("get", "checkToken").then((res) =>
          setUser(res.data)
        );
      }
    };
    if (!user && localStorage.token) startApp();
  }, []);

  return (
    <div className={styles.layout}>

      <userContext.Provider value={{ user, setUser }}>
        <messageContext.Provider value={{ handleUser, messages, setMessages, selectedUserId, setSelectedUserId, otherUser }}>
          <Routes>
            {!user && (
              <>
                <Route path="/" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgetPass" element={<ForgetPassword />} />

              </>

            )}
            {user && (
              <>
                <Route path="/" element={<Main />} />

              </>
            )}
          </Routes>

        </messageContext.Provider>
      </userContext.Provider>
    </div>
  );
}

export default Layout;
