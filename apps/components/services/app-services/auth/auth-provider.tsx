import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import AuthService, { Message, UserMetadata } from "./auth-service";
import { createClient } from "@/utils/supabase/component";
import { Alert, Snackbar } from "@mui/material";
import { useRouter } from "next/router";

const AuthContext = createContext<AuthContentProps | undefined>(undefined);

interface AuthContentProps {
  authService: AuthService;
  userMetadata: UserMetadata | null;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const router = useRouter();
  const supabase = createClient();
  const [authStatus, setAuthStatus] = useState<"pending" | "done">("pending");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [userMetadata, setUserMetadata] = useState<UserMetadata | null>(null);
  const [needsAuth, setNeedsAuth] = useState(false);
  const [isAuthPage, setIsAuthPage] = useState(false);
  const [message, setMessage] = useState<Message | null>(null);

  const [authService] = useState(() => new AuthService(router, supabase));

  useEffect(() => {
    authService.provideStates({
      setAuthStatus,
      setIsAuthorized,
      setNeedsAuth,
      setMessage,
      setUserMetadata,
    });

    authService.init();

    checkAuthPage();

    return () => {
      authService.dispose();
    };
  }, []);

  useEffect(() => {
    checkAuthPage();
  }, [router.pathname]);

  useEffect(() => {
    handleRedirect();
  }, [isAuthorized, isAuthPage, authStatus]);

  useEffect(() => {
    let messageTimer: NodeJS.Timeout;
    if (message) {
      messageTimer = setTimeout(() => {
        setMessage(null);
      }, 2000);
    }
    return () => {
      if (messageTimer) {
        clearTimeout(messageTimer);
      }
    };
  }, [message]);

  const checkAuthPage = useCallback(() => {
    const isLoginPage = router.pathname === "/login";
    setIsAuthPage(isLoginPage);
  }, [router.pathname]);

  const handleRedirect = useCallback(() => {
    if (authStatus === "pending") return;

    if (typeof window !== "undefined" && !isAuthorized && !isAuthPage) {
      window.location.href = "/login";
    }
  }, [isAuthorized, isAuthPage, authStatus]);

  return (
    <AuthContext.Provider
      value={{
        authService,
        userMetadata,
      }}
    >
      <Snackbar
        open={message !== null}
        autoHideDuration={1000}
        onClose={() => setMessage(null)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Alert severity={message?.type || "error"}>
          {message?.message || ""}
        </Alert>
      </Snackbar>

      {(isAuthorized || isAuthPage) && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
