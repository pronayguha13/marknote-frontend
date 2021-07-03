import React from "react";

const Login = () => {
  return (
    <button
      onClick={() => (window.location = "http://localhost:1337/connect/google")}
    ></button>
  );
};

export default Login;
