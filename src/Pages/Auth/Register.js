import React from "react";

import styles from "./auth.module.scss";
import loginImg from "../../assets/register.png";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/card/card";
import { useState } from "react";
import Loader from "../../components/loader/Loader";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase/config";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rpassword, setRpassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // console.log(email, password, rpassword);
    if (password !== rpassword) {
      toast.error("Passwords do not match");
    }
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setIsLoading(false);

        toast.success("Registration successful");
        navigate("/login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(error.message);
        setIsLoading(false);
        // ..
      });
  };

  return (
    <>
      {isLoading && <Loader />}
      <ToastContainer />
      <section className={`container ${styles.auth}`}>
        <Card>
          <div className={styles.form}>
            <h2>
              {" "}
              <b>Register</b>
            </h2>

            <form onSubmit={handleFormSubmit}>
              <input
                type="email"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />

              <input
                type="password"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <input
                type="password"
                placeholder="Retype Password"
                required
                value={rpassword}
                onChange={(e) => {
                  setRpassword(e.target.value);
                }}
              />
              <button className="--btn --btn-primary --btn-block" type="submit">
                Register
              </button>
              <div className={styles.links}></div>
            </form>
            <span styles={styles.register}>
              <p>
                Already have an account
                <b>
                  {" "}
                  <Link to="/login">Login</Link>
                </b>
              </p>
            </span>
          </div>
        </Card>

        <div className={styles.img}>
          <img src={loginImg} alt="loginImg" width="400" />
        </div>
      </section>
    </>
  );
};
export default Register;
