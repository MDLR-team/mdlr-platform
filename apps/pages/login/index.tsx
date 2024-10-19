import { useRouter } from "next/router";
import { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  Input,
  FormHelperText,
  Box,
} from "@mui/material";

import { createClient } from "@/utils/supabase/component";
import { useAuth } from "@/components/services/app-services/auth/auth-provider";
import styled from "styled-components";

const LoginPage = () => {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and signup forms

  const { authService } = useAuth();

  const handleFormSubmit = () => {
    if (isLogin) {
      authService.logIn(email, password);
    } else {
      authService.signUp(email, password);
    }
  };

  return (
    <Wrapper>
      <AuthWrapper>
        <Box
          sx={{
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "24px",
            color: "black",
          }}
        >
          MDLR
        </Box>

        <main>
          <form>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                width: "100%",
                minWidth: "300px",
                maxWidth: "350px",
              }}
            >
              <FormControl>
                <Box>Email</Box>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <Box>Password</Box>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>

              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: "24px",
                  marginTop: "48px",
                }}
              >
                <Box>
                  By clicking the Log in button, you agree to MDLR{" "}
                  <u>Terms of Service</u> and <u>Privacy Policy</u>.
                </Box>

                <Button
                  size="large"
                  sx={{
                    height: "56px",
                    backgroundColor: "black !important",
                    borderRadius: "30px !important",
                    color: "white !important",
                  }}
                  variant="contained"
                  onClick={handleFormSubmit}
                >
                  {isLogin ? "Log in" : "Sign up"}
                </Button>
              </Box>
            </Box>
          </form>
        </main>

        {/* <Button variant="text" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Switch to Sign up" : "Switch to Log in"}
        </Button> */}
      </AuthWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & input {
    padding: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;

    height: 56px;
  }

  &,
  & * {
    font-size: 14px;
  }

  & .MuiInputBase-root {
    padding: 0px;
  }

  & .MuiFormControl-root {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

const AuthWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  row-gap: 36px;

  padding: 30px;
`;

export default LoginPage;
