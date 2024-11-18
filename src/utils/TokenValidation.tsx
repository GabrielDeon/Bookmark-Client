import Cookies from "js-cookie";
import { toast, Bounce } from "react-toastify";
import {jwtDecode} from "jwt-decode";

interface DecodedToken {
  exp: number; // Expiration timestamp of the token
  [key: string]: any; // Optional additional properties in the token
}

const AuthenticateToken = (): boolean => {
  const token = Cookies.get("token");

  if (token) {
    const dateNow = Math.floor(Date.now() / 1000);

    try {
      const decodedToken = jwtDecode<DecodedToken>(token);

      if (!(dateNow < decodedToken.exp)) {
        toast.info(`Your session expired! Please sign in again.`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });

        Cookies.remove("token");
        return false;
      }
      return true;
    } catch (error) {
      console.error("Failed to decode token:", error);
      Cookies.remove("token");
      return false;
    }
  } else {
    return false;
  }
};

export default AuthenticateToken;
