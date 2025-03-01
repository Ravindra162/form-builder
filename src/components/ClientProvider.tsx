"use client"; // This directive ensures the component is treated as a client component

import React from "react";
import { Provider } from "react-redux";
import { store } from "@/store/store";

const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  return (
      <Provider store={store}>{children}</Provider>
  );
};

export default ClientProvider;
