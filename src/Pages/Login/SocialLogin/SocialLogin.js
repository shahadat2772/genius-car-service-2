import React from "react";
import {
  useSignInWithGithub,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import { auth } from "../../../firebase.init";
import google from "../../../images/social/google.png";
import facebook from "../../../images/social/facebook.png";
import github from "../../../images/social/github.png";
import "./SocialLogin.css";
import { useNavigate } from "react-router-dom";
import Loading from "../../Shared/Loading/Loading";

const SocialLogin = () => {
  const navigate = useNavigate();

  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const [signInWithGithub, user1, loading1, error1] = useSignInWithGithub(auth);

  let errorElement;

  if (loading || loading1) {
    return <Loading></Loading>;
  }

  if (error || error1) {
    errorElement = (
      <p className="text-danger">
        Error: {error?.message} {error1?.message}
      </p>
    );
  }
  if (user || user1) {
    navigate(`/home`);
  }

  return (
    <div>
      <div className="d-flex align-items-center">
        <div style={{ height: "1px" }} className="bg-secondary w-50 mx-2"></div>
        or
        <div style={{ height: "1px" }} className="bg-secondary w-50 mx-2"></div>
      </div>
      {errorElement && errorElement}
      <button
        onClick={() => signInWithGoogle()}
        className="border-0 p-1 px-4 rounded d-block my-1 w-100"
      >
        <img className="google" src={google} alt="" />{" "}
        <span style={{ fontSize: "13px", fontWeight: "500" }} className="">
          Continue with Google
        </span>
      </button>
      <button
        onClick={() => signInWithGithub()}
        className="border-0 p-1 px-4 rounded d-block my-1 w-100"
      >
        <img className="google" src={github} alt="" />
        <span style={{ fontSize: "13px", fontWeight: "500" }} className="">
          Continue with GitHub
        </span>
      </button>
      <button className="border-0 p-1 px-4 rounded d-block my-1 w-100">
        <img className="google" src={facebook} alt="" />{" "}
        <span style={{ fontSize: "13px", fontWeight: "500" }} className="">
          Continue with Facebook
        </span>
      </button>
    </div>
  );
};

export default SocialLogin;
