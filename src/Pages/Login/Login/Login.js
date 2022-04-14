import React, { useEffect, useRef } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../../firebase.init";
import SocialLogin from "../SocialLogin/SocialLogin";
import "./Login.css";

const Login = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const resetPassword = () => {
    console.log("Hello reset");
  };

  return (
    <div className="container">
      <div className="formContainer">
        <h3 className="text-center text-secondary pb-2">Login</h3>
        <form action="">
          <div className="input-fields">
            <label htmlFor="email">Enter email</label>
            <input type="email" name="email" id="email" />
          </div>
          <div className="input-fields">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
          </div>
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
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Login;
