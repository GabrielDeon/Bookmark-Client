import { useState, ChangeEvent, FormEvent } from "react";
import "../styles/SigninPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import AuthenticateToken from "../utils/TokenValidation";
import { toast, Bounce } from "react-toastify";
import Cookies from "js-cookie";

export default function SigninPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(false);
  const navigate = useNavigate();

  // If already authenticated, navigate to home page
  if (AuthenticateToken()) {
    navigate("/");
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Sending login request
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
        rememberme: remember,
      });

      const { access_token } = response.data;

      // Decode the JWT token with correct type inference
      const decodedToken = jwtDecode<{ exp: number }>(access_token);

      // Calculate expiration date
      const expiration = decodedToken.exp
        ? new Date(decodedToken.exp * 1000)
        : 0;

      // Store token in cookies
      Cookies.set("token", access_token, { expires: expiration });

      // Display success toast
      toast.success("Login successful! Welcome back!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        onClose: () => navigate("/home"),
      });
    } catch (error) {
      // Display error toast
      console.error("Login error:", error);
      toast.error("Login failed. Please check your credentials and try again.", {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="page">
      <div className="form">
        <div className="formContent">
          <h1>Welcome Back!</h1>
          <p className="forminstruction">
            Enter your credentials to access your account
          </p>
          <form className="formContent" onSubmit={handleSubmit}>
            <label className="inputLabel">Email Address</label>
            <input
              value={email}
              className="input"
              type="email" // Changed to `email` for validation
              placeholder="Enter your email"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
              }}
              required
            />

            <label className="inputLabel">Password</label>
            <input
              value={password}
              className="input"
              type="password"
              placeholder="Enter your password"
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
              }}
              required
            />

            <div className="rememberme">
              <p>Remember for 30 days</p>
              <input
                checked={remember} // Used `checked` for boolean input
                type="checkbox"
                id="terms-checkbox"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  setRemember(e.target.checked);
                }}
              />
            </div>

            <button type="submit" id="btnSignin">
              Login
            </button>
          </form>

          <div className="OrText">
            <p>Or</p>
          </div>
          <div className="outsideSignups">
            <button>
              <FontAwesomeIcon className="brand" icon={faGoogle} />
              Sign in with Google
            </button>
            <button>
              <FontAwesomeIcon className="brand" icon={faApple} />
              Sign in with Apple
            </button>
          </div>
          <div className="SingInRedirection">
            <p>
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
          </div>
        </div>
      </div>
      <div className="leftSideImage"></div>
    </div>
  );
}
