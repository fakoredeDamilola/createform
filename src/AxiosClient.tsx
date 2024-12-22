import React, { createContext, useContext } from "react";
import axiosClient from "./axiosMethod";

const AxiosContext = createContext(axiosClient);

export const AxiosProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <AxiosContext.Provider value={axiosClient}>
      {children}
    </AxiosContext.Provider>
  );
};

export const useAxios = () => {
  return useContext(AxiosContext);
};
