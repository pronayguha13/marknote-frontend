import React, { useContext } from "react";

import { UserContext } from "../../global/UserContext";
const DashBoard = () => {
  const { user } = useContext(UserContext);
  return (
    <div>
      <span>{user.email}</span>
      {user.notes &&
        user.notes.map((note, idx) => <p key={idx}>{note.title}</p>)}
    </div>
  );
};

export default DashBoard;
