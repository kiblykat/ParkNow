import React, { useEffect } from "react";
import { auth } from "../firebase/firebase";
import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return unsubscribe; //unsubscribe() function to be invoked when we want to unsub the user
  }, []);

  async function initializeUser(user) {
    if (user) {
      setCurrentUser({ ...user }); //spread to create shallow copy
      setUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setUserLoggedIn(false);
    }
    setLoading(false);
  }

  const context = {
    currentUser,
    userLoggedIn,
    loading,
  };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
}

export default AuthContext;
