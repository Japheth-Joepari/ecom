import { useState } from "react";

import styles from "./auth.module.scss";
import loginImg from "../../assets/login.png";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Card from "../../components/card/card";
import Loader from "../../components/loader/Loader";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { signInWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../Firebase/config";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const provider = new GoogleAuthProvider();
  const handleGoogleLogin = (e) => {
    // setIsLoading(true);
    // console.log("social login successfull");

    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        navigate("/");
        toast.success("logged in with email successfull");
      })
      .catch((error) => {
        // setIsLoading(false);
        toast.error(error.message);
      });
  };

  const handleUserSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // console.log(email, password);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setIsLoading(false);
        navigate("/");
        toast.success("successfully loginedin");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        toast.error(error.message);
        setIsLoading(false);
      });
  };

  return (
    <>
      {loading && <Loader />}
      <ToastContainer />
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={loginImg} alt="loginImg" width="400" />
        </div>

        <Card>
          <div className={styles.form}>
            <h2>
              {" "}
              <b>Login</b>
            </h2>

            <form onSubmit={handleUserSubmit}>
              <input
                type="email"
                placeholder="Email"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />

              <input
                type="password"
                placeholder="Password"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              <button className="--btn --btn-primary --btn-block" type="submit">
                Login
              </button>
              <div className={styles.links}>
                <Link to="/reset">Forgot Password</Link>
              </div>
              <p> {/* <b>or</b> */}</p>
            </form>
            <button
              className="--btn --btn-block --btn-danger"
              onClick={handleGoogleLogin}
            >
              <FaGoogle color="white" /> Login with Google
            </button>
            <span styles={styles.register}>
              <p>
                Don't have an account{" "}
                <b>
                  <Link to="/register">Register</Link>
                </b>
              </p>
            </span>
          </div>
        </Card>
      </section>
    </>
  );
};
export default Login;
