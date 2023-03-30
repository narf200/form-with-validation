import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: (email, password) => {},
});

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const chekUserLogin = localStorage.getItem("userLogined");

  useEffect(() => {
    if (chekUserLogin === "logined") {
      setIsLoggedIn(true);
    }
  }, []);

  const logInHandler = () => {
    localStorage.setItem("userLogined", "logined");
    setIsLoggedIn(true);
  };
  const logOutHandler = () => {
    localStorage.removeItem("userLogined");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogout: logOutHandler,
        onLogin: logInHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
