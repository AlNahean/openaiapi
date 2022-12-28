import React, { useState, useEffect, useReducer, useContext } from "react";
export const GlobalContext = React.createContext();

export const GlobalProvider = ({ children, testProp = "" }) => {
  const [globalTest, setGlobalTest] = useState("Global Test Success");
  return (
    <GlobalContext.Provider value={{ globalTest, testProp }}>
      {children}
    </GlobalContext.Provider>
  );
};
export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
