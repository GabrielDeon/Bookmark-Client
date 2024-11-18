import "../styles/Header.css";
import Cookies from "js-cookie";
import { toast, Bounce } from "react-toastify";

function Header() {

  const handleLogOut = () => {
    Cookies.remove("token");
    toast.info(`User logged out.`, {
      position: "top-right",
      autoClose: 3500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });

    window.location.href = "/";
  };

  return (
    <header className="theHeader">
      <ul>
        <li><a href="/home">Home</a></li>
        <li><a href="/bookshelf">Bookshelf</a></li>
        <li><a href="/about">About</a></li>
        <li><a onClick={handleLogOut}>Logout</a></li>
      </ul>
    </header>
  );
}

export default Header;