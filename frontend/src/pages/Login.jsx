import { Box, Button, border } from "@chakra-ui/react";
import React, { useState } from "react";
import { Input, FormControl, FormLabel } from "@chakra-ui/react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div
      style={{
        marginTop: "50px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box maxW="700px" borderWidth="1px" borderRadius="lg" p="40px 150px">
        <FormControl>
          <FormLabel>Username: </FormLabel>
          <Input
            focusBorderColor="orange.700"
            style={{ margin: "10px" }}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password: </FormLabel>
          <Input
            focusBorderColor="orange.700"
            style={{ margin: "10px" }}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </FormControl>
        <Button>Log In</Button>
      </Box>
    </div>
  );
};

export default Login;
