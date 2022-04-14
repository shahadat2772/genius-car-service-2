import React, { useEffect, useRef } from "react";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../../firebase.init";
import Loading from "../../Shared/Loading/Loading";
import SocialLogin from "../SocialLogin/SocialLogin";
import "./Login.css";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [sendPasswordResetEmail, sending, error1] =
    useSendPasswordResetEmail(auth);

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  let errorElement;
  if (error) {
    errorElement = <p className="text-danger">Error: {error?.message}</p>;
  }

  if (loading || sending) {
    <Loading></Loading>;
  }

  const notify = () => toast("Here is your toast.");

  const emailRef = useRef("");
  const passwordRef = useRef("");

  const from = location?.state?.from?.pathname || "/";

  const resetPassword = async () => {
    const email = emailRef.current.value;
    if (email) {
      await sendPasswordResetEmail(email);
      toast("Reset email sended");
    } else {
      toast("Please enter Your email");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    signInWithEmailAndPassword(email, password);
  };

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user]);

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
          <input className="submitBtn" type="submit" value="Login" />
          {errorElement && errorElement}
          <p className="text-center mt-1 mb-1">
            <small>
              {" "}
              New to Genius?{" "}
              <Link className="text-decoration-none " to={`/register`}>
                Register
              </Link>
            </small>
          </p>
          <p onClick={resetPassword} className="text-center mb-1">
            <small>
              Forgot password? <span className="text-primary">Reset Here</span>
            </small>
          </p>
        </form>
        <Toaster></Toaster>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Login;
