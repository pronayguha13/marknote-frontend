import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer, toast } from "react-toastify";

const Success = () => {
  useEffect(() => {
    toast.success("🦄 Success", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
  }, []);

  return (
    <ToastContainer
      position="top-center"
      autoClose={1000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover={false}
    />
  );
};

export default Success;
