import { async } from "@firebase/util";
import React, { useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../../firebase.init";
import Loading from "../../Shared/Loading/Loading";
import SocialLogin from "../SocialLogin/SocialLogin";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const [sendPasswordResetEmail, sending, passeordResetError] =
    useSendPasswordResetEmail(auth);

  const from = location?.state?.from?.pathname || "/home";

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const resetPassword = () => {
    const email = emailRef.current.value;
    if (email) {
      sendPasswordResetEmail(email);
      toast("Reset email sended.");
    } else {
      toast("Please enter your email.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    await signInWithEmailAndPassword(email, password);
  };
  if (user) {
    navigate(from, { replace: true });
  }

  return (
    <div className="container">
      <div className="formContainer">
        <h3 className="text-center text-secondary pb-2">Login</h3>
        <form onSubmit={handleSubmit} action="">
          <div className="input-fields">
            <label htmlFor="email">Enter email</label>
            <input ref={emailRef} type="email" name="email" id="email" />
          </div>
          <div className="input-fields">
            <label htmlFor="password">Password</label>
            <input
              ref={passwordRef}
              type="password"
              name="password"
              id="password"
            />
          </div>
          <span className="text-danger">{error?.message}</span>
          <input className="submitBtn" type="submit" value="Login" />
          <p className="text-center mt-1 mb-1">
            <small>
              {" "}
              New to Genius?{" "}
              <Link className="text-decoration-none " to={`/register`}>
                Register
              </Link>
            </small>
          </p>
          <p className="text-center mb-1">
            <small>
              Forgot password?{" "}
              <span
                onClick={resetPassword}
                className="resetPasswordBtn text-primary"
              >
                Reset Here
              </span>
            </small>
          </p>
        </form>
        <Toaster />
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Login;
