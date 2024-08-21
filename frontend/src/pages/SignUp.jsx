import React, { useContext, useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import {
  Input,
  FormControl,
  FormLabel,
  Box,
  Button,
  Text,
  HStack,
  useToast,
} from "@chakra-ui/react";
import { doCreateUserWithEmailAndPassword } from "../firebase/auth";
import AuthContext from "../context/AuthContext";

const SignUp = () => {
  const authCtx = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  // const [isSigningIn, setIsSigningIn] = useState(false);

  const { userLoggedIn } = authCtx;
  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log("logged in: " + userLoggedIn);
      await doCreateUserWithEmailAndPassword(email, password);
      toast({
        title: "Successfully Signed Up",
        description: "",
        status: "success",
        duration: 3500,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Invalid sign up details",
        description: "",
        status: "error",
        duration: 3500,
        isClosable: true,
      });
    }
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
      {userLoggedIn && <Navigate to={"/search"} replace={true} />}
      <Box
        borderColor="orange.700"
        maxW="700px"
        borderWidth="1px"
        borderRadius="lg"
        p="40px 150px"
      >
        <Text as="b" fontSize="20px">
          Sign Up
        </Text>
        <FormControl>
          <FormLabel mt="30px">Username: </FormLabel>
          <Input
            borderColor="orange.200"
            focusBorderColor="orange.700"
            style={{ marginBottom: "10px" }}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password: </FormLabel>
          <Input
            borderColor="orange.200"
            focusBorderColor="orange.700"
            style={{ marginBottom: "10px" }}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </FormControl>
        <HStack>
          <Button
            width="100%"
            alignItems="center"
            justifyContent="center"
            onClick={onSubmit}
          >
            Sign Up
          </Button>
        </HStack>
        <HStack>
          <Text fontSize="sm">Already have an account?</Text>
          <Text fontSize="sm" color="teal.500">
            <NavLink to="/">Log In</NavLink>
          </Text>
        </HStack>
      </Box>
    </div>
  );
};

export default SignUp;
