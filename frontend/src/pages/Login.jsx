import { border } from "@chakra-ui/react";
import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <label>Username: </label>
        <input
          style={{ border: "1px solid black", margin: "10px" }}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      <div>
        <label>Password: </label>
        <input
          style={{ border: "1px solid black", margin: "10px" }}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>
    </div>
  );
};

export default Login;
