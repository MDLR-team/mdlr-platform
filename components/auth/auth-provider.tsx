import { createContext, useContext, useEffect, useState } from "react";
import AuthService, { Message } from "./auth-service";
import { useRouter } from "next/router";
import { createClient } from "@/utils/supabase/component";
import { Alert, Snackbar } from "@mui/material";

interface AuthContentProps {
  authService: AuthService;
}

const AuthContext = createContext<AuthContentProps | undefined>(undefined);

export function AuthProvider({ children }: any) {
  const router = useRouter();
  const supabase = createClient();

  const [isAuthorized, setIsAuthorized] = useState(false);
  const [needsAuth, setNeedsAuth] = useState(false);

  const [authService] = useState(() => new AuthService(router, supabase));

  const [isAuthPage, setIsAuthPage] = useState(false);

  const [message, setMessage] = useState<Message | null>(null);

  console.log("message", message);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(null);
      }, 2000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [message]);

  useEffect(() => {
    authService.provideStates({
      setIsAuthorized,
      setNeedsAuth,
      setMessage,
    });

    authService.init();

    return () => {
      authService.dispose();
    };
  }, []);

  useEffect(() => {
    if (needsAuth && !isAuthPage) {
      router.push("/login");
    }
  }, [needsAuth, isAuthPage]);

  useEffect(() => {
    if (router.pathname === "/login") {
      setIsAuthPage(true);
    } else {
      setIsAuthPage(false);
    }
  }, [router.pathname]);

  return (
    <AuthContext.Provider
      value={{
        authService,
      }}
    >
      <Snackbar
        open={message !== null}
        autoHideDuration={1000}
        onEnded={() => setMessage(null)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert severity={message?.type || "error"}>
          {message?.message || ""}
        </Alert>
      </Snackbar>

      {(isAuthorized || isAuthPage) && <>{children}</>}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}
