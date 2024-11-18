import { useState, ChangeEvent, FormEvent } from "react";
import "../styles/SignupPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast, Bounce } from "react-toastify";

export default function SignUpPage() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post("http://localhost:3000/user", {
        username,
        email,
        password,
        role: "USER",
      });

      toast.success("User account created successfully! Welcome aboard!!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        onClose: () => navigate("/"),
      });
    } catch (err: any) {
      console.error(`Error signing up:`, err);

      if (err.response?.status === 400) {
        setError("Invalid signup details. Please check your input.");
      } else if (err.response?.status === 409) {
        setError("User already exists. Please try logging in.");
      } else {
        setError("Server error. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="form">
        <div className="formContent">
          <h1>Get Started Now</h1>
          <p className="forminstruction">
            Enter your credentials to create your account
          </p>
          <form className="formContent" onSubmit={handleSubmit}>
            <label className="inputLabel">Name</label>
            <input
              value={username}
              className="input"
              type="text"
              placeholder="Enter your name"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUsername(e.target.value)
              }
              required
            />

            <label className="inputLabel">Email Address</label>
            <input
              value={email}
              className="input"
              type="email" // Changed type for email validation
              placeholder="Enter your email"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              required
            />

            <label className="inputLabel secret">Password</label>
            <input
              value={password}
              className="input"
              type="password"
              placeholder="Enter your password"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setPassword(e.target.value)
              }
              required
            />

            <div className="terms">
              <p>
                I agree to the <a href="#">terms & policy</a>
              </p>
              <input type="checkbox" id="terms-checkbox" required />
            </div>

            <button type="submit" id="btnSignup" disabled={loading}>
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          {error && <p className="error">{error}</p>}

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
              Have an account? <Link to="/">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
      <div className="leftSideImage"></div>
    </div>
  );
}
