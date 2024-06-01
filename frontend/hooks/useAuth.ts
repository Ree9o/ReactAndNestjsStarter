import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Payload } from "../types/payload.type";

type AuthInfoType = {
  checked: boolean;
  isAuthenticated: boolean;
};

export const useAuth = () => {
  const [authInfo, setAuthInfo] = useState<AuthInfoType>({
    checked: false,
    isAuthenticated: false,
  });

  const updateAuthStatus = (token: string | null) => {
    if (!token) {
      setAuthInfo({ checked: true, isAuthenticated: false });
      return;
    }
    try {
      const decodedToken = jwtDecode<Payload>(token);
      const isTokenExpired = decodedToken.exp * 1000 < Date.now();
      if (isTokenExpired) {
        localStorage.removeItem("token");
        setAuthInfo({ checked: true, isAuthenticated: false });
      } else {
        setAuthInfo({ checked: true, isAuthenticated: true });
      }
    } catch (error) {
      setAuthInfo({ checked: true, isAuthenticated: false });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    updateAuthStatus(token);
  }, []);

  return authInfo;
};
