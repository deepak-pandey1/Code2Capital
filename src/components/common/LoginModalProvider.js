"use client";

import { createContext, useContext, useMemo, useState } from "react";
import LoginModal from "@/components/common/LoginModal";

const LoginModalContext = createContext(null);

export const useLoginModal = () => useContext(LoginModalContext);

export default function LoginModalProvider({ children }) {
  const [open, setOpen] = useState(false);

  const value = useMemo(
    () => ({
      openLogin: () => setOpen(true),
      closeLogin: () => setOpen(false),
    }),
    []
  );

  return (
    <LoginModalContext.Provider value={value}>
      {children}
      <LoginModal open={open} setOpen={setOpen} />
    </LoginModalContext.Provider>
  );
}