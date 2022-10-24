import styles from "./Header.module.scss";
import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { HiMenuAlt1 } from "react-icons/hi";
import adImg from "../../assets/Free-delivery-top-strip.gif";
import Loader from "../loader/Loader";
import { onAuthStateChanged } from "firebase/auth";
import ShowOnLogin from "../hiddenLinks/hiddenLinks";

import { auth } from "../../Firebase/config";
import { signOut } from "firebase/auth";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// redux tolkit
import { useDispatch } from "react-redux";

// importing the actions from redux-toolkit
import {
  REMOVE_ACTIVE_USER,
  SET_ACTIVE_USER,
} from "../../redux/slice/authSlice";

// Reusable logo component
const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2>
        <b>one</b>
        <span>
          <b>mart</b>
        </span>
        .
      </h2>
    </Link>
  </div>
);

// Reusable Cart component
const Cart = (
  <span className={styles.cart}>
    <Link to="/cart">
      {/* Cart */}
      <FaShoppingCart size={20} />
      <p>0</p>
    </Link>
  </span>
);

// Reusable active link
const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Header = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [displayName, setDisplayName] = useState("");

  // monitoring the currently signed user
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName === null) {
          const u1 = user.email.substring(0, user.email.indexOf("@"));
          setDisplayName(u1);
        } else {
          setDisplayName(user.displayName);
        }

        // dispatching actions using redux
        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userID: user.uid,
          })
        );
      } else {
        setDisplayName("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, displayName]);

  // state for togling of trhe menu
  const [menu, showMenu] = useState(false);
  const toggleMenu = () => {
    showMenu(!menu);
  };

  // state for hiding of the menu
  const hideMenu = () => {
    showMenu(false);
  };

  const logout = (e) => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        // console.log("current user is logged out");
        setIsLoading(false);
        toast.success("Logout successfull");
        navigate("/");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error("validation failed");
      });
  };
  return (
    <>
      {isLoading && <Loader />}
      <ToastContainer />
      <header>
        {/* Nav bar for the  pages  (Logo section)*/}
        <header>
          <img src={adImg} alt="loginImg" style={{ width: "100vw" }} />
        </header>
        <div className={styles.header}>
          {logo}

          <nav
            className={menu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`}
          >
            <div
              className={
                showMenu
                  ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                  : `${styles["nav-wrapper"]}`
              }
              onClick={hideMenu}
            ></div>

            {/*Home and contact us section */}
            <ul onClick={hideMenu}>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={activeLink}>
                  Contact Us
                </NavLink>
              </li>
            </ul>

            {/*Cart and login section */}
            <div className={styles["header-right"]} onClick={hideMenu}>
              <span className={styles.links}>
                <NavLink to="/login" className={activeLink}>
                  Login
                </NavLink>

                <a href="#home">
                  <FaUserCircle size={16} />
                  Hi {displayName}
                </a>
                <NavLink to="/register" className={activeLink}>
                  Register
                </NavLink>
                <NavLink to="/order-history" className={activeLink}>
                  My Orders
                </NavLink>

                <ShowOnLogin>
                  <NavLink to="/" onClick={logout}>
                    Logout
                  </NavLink>
                </ShowOnLogin>
              </span>
              {Cart}
            </div>
          </nav>

          <div className={styles["menu-icon"]}>
            {Cart}
            <span className={styles.cart}>
              <HiMenuAlt1 size={28} onClick={toggleMenu} />
            </span>
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;
