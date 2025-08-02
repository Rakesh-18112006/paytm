"use client";

import { SessionProvider } from "next-auth/react";
import Navbar from "../components/Navbar";

 function Provider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Navbar />
      {children}
    </SessionProvider>
  );
}
export default Provider;