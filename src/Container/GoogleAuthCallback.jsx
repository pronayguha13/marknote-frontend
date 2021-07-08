import React, { useContext, useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import uuid from "react-uuid";
import Swal from "sweetalert2";
import { LoginContext } from "../global/LoginContext";
import { UserContext } from "../global/UserContext";

function GoogleAuthCallback() {
  const location = useLocation();
  const history = useHistory();
  const { setIsAuthenticated, setAuthToken } = useContext(LoginContext);
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    if (!location) {
      return;
    }
    const { search } = location;
    axios({
      method: "GET",
      url: `http://localhost:1337/auth/google/callback?${search}`,
    }).then((res) => setAuthHandler(res.data));
  }, [location]);

  const setAuthHandler = (authData) => {
    window.sessionStorage.setItem("authToken", authData.jwt);
    setAuthToken(authData.jwt);
    setUser(authData.user);
    //chechk whether there is any entry in the locaStorage
    if (localStorage.getItem("title")) {
      //if present create a note and forward to editor
      copyNoteHandler(authData.user, authData.jwt);
    } else {
      //else go tot dashboard
      history.push("/dashboard");
    }
  };

  const copyNoteHandler = (user, authToken) => {
    const title = localStorage.getItem("title");
    const content = localStorage.getItem("content");
    axios
      .post(
        "http://localhost:1337/notes",
        {
          title: title,
          author: user.email,
          content: content,
          user: user,
          UUID: uuid(),
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((res) => {
        localStorage.clear();
        window.location.replace(`/note/${res.data.UUID}`);
      })
      .catch((err) => {
        Swal.fire("Something went wrong!", "Cannot create note", "error");
        history.push("/dashboard");
      });
  };

  return <div></div>;
}

export default GoogleAuthCallback;
