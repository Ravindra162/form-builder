"use client"; 

import React from "react";
import ClientProvider from "@/components/ClientProvider";


const layout = ({ children }: { children: React.ReactNode }) => {
  return (
      <ClientProvider>{children}</ClientProvider>
  );
};

export default layout;
