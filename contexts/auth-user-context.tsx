import jwtDecode from "jwt-decode";
import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

import { JWTPayload } from "../types/jwt-payload";
import { User } from "../types/user";

export type AuthUser = {
  user: User | null;
  jwtPayload: JWTPayload | null;
};

type AuthUserContextType = {
  authProcessFinished: boolean;
  authUser: AuthUser | null;
  logout: () => void;
  persistBearer: (bearerToken: string) => void;
  loginWithBearer: (bearerToken: string) => Promise<void>;
};

const AuthUserContext = createContext<AuthUserContextType | undefined>(
  undefined
);

const useAuthUser = (): AuthUserContextType => {
  const context = useContext(AuthUserContext);

  if (!context) {
    throw new Error(
      "useAuthUser must be used within AuthUserProvider wrapper component"
    );
  }

  return context;
};

const tokenVarName = `${process.env.NEXT_PUBLIC_ADS_BEARER_TOKEN_VARNAME}`;

const AuthUserProvider = (props: { children: ReactNode }): ReactElement => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [authProcessFinished, setAuthProcessFinished] = useState(false);

  const loginWithBearer = async (bearerToken: string) => {
    try {
      // decode
      const jwtPayload = jwtDecode<JWTPayload>(bearerToken);

      // validate against backend & get user data object
      let myHeaders = new Headers();

      myHeaders.append("Authorization", `Bearer ${bearerToken}`);

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_ADS_BACKEND_URL}auth/me`,
        requestOptions
      );

      if (!response.ok || response.status !== 200) {
        throw new Error("Error while hiting me endpoint");
      }

      const user = await response.json();

      // console.log("jwtPayload", jwtPayload);
      // console.log("user", user);
      setAuthUser({ jwtPayload, user });
    } catch (error) {
      // console.log("error", error);
      setAuthUser(null);
    }

    // Server delay example
    // await new Promise((r) => setTimeout(r, 2000));
    setAuthProcessFinished(true);
  };

  const logout = () => {
    try {
      localStorage.removeItem(tokenVarName);
      setAuthUser(null);
      setAuthProcessFinished(true);
    } catch (error) {
      // console.log("error", error);
    }
  };

  const persistBearer = async (bearerToken: string) => {
    try {
      localStorage.setItem(tokenVarName, bearerToken);
    } catch (error) {
      // console.log("error", error);
    }
  };

  useEffect(() => {
    if (!tokenVarName) {
      throw new Error(
        "Env var process.env.NEXT_PUBLIC_ADS_BEARER_TOKEN_VARNAME must be defined"
      );
    }

    const bearerToken = localStorage.getItem(tokenVarName);

    if (!bearerToken) {
      setAuthProcessFinished(true);

      return;
    }

    loginWithBearer(bearerToken);
  }, []);

  return (
    <AuthUserContext.Provider
      {...props}
      value={{
        authUser,
        authProcessFinished,
        loginWithBearer,
        logout,
        persistBearer,
      }}
    />
  );
};

export { useAuthUser, AuthUserProvider };
