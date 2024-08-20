import React, { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import {
  Input,
  FormControl,
  FormLabel,
  Box,
  Button,
  Text,
} from "@chakra-ui/react";
import { doSignInWithEmailAndPassword } from "../firebase/auth";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const authCtx = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [isSigningIn, setIsSigningIn] = useState(false);

  const { userLoggedIn } = authCtx;
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("logged in: " + userLoggedIn);
    await doSignInWithEmailAndPassword(email, password);
  };
  return (
    <div
      style={{
        marginTop: "50px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {console.log("logged in: " + userLoggedIn)}
      {userLoggedIn && <Navigate to={"/search"} replace={true} />}
      <Box
        borderColor="orange.700"
        maxW="700px"
        borderWidth="1px"
        borderRadius="lg"
        p="40px 150px"
      >
        <Text as="b" fontSize="20px">
          Log In
        </Text>
        <FormControl>
          <FormLabel mt="30px">Username: </FormLabel>
          <Input
            borderColor="orange.200"
            focusBorderColor="orange.700"
            style={{ margin: "10px" }}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password: </FormLabel>
          <Input
            borderColor="orange.200"
            focusBorderColor="orange.700"
            style={{ margin: "10px" }}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </FormControl>
        <Button onClick={onSubmit}>Log In</Button>
      </Box>
    </div>
  );
};

export default Login;
