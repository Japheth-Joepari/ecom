import { useState } from "react";

import styles from "./auth.module.scss";
import loginImg from "../../assets/forgot.png";
import { Link } from "react-router-dom";
import Card from "../../components/card/card";
import Loader from "../../components/loader/Loader";
import { sendPasswordResetEmail } from "firebase/auth";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../../Firebase/config";

const Reset = (e) => {
  const [loading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleResetPassword = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("emaill reset link sent successfully");
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setIsLoading(false);
        toast.success("Password reset email link sent");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error(error.message);
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
              <b>Reset Email</b>
            </h2>

            <form onSubmit={handleResetPassword}>
              <input
                type="email"
                placeholder="Enter your Email"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <button className="--btn --btn-primary --btn-block" type="submit">
                Reset Password
              </button>
              <div className={styles.links}>
                <Link to="/login"> {"--> "}Login</Link>
                <Link to="/register"> {"<--"} Register</Link>
              </div>
            </form>
          </div>
        </Card>
      </section>
    </>
  );
};
export default Reset;
