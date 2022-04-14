import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { auth } from "../../../firebase.init";
import SocialLogin from "../SocialLogin/SocialLogin";
import Loading from "../../Shared/Loading/Loading";

const Register = () => {
  // Navigate
  const navigate = useNavigate();

  // User creator hook
  const [createUserWithEmailAndPassword, user, loading, userCreateError] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
  // Users Profile update hook
  const [updateProfile, updating, updateProfileError] = useUpdateProfile(auth);

  // Getting value from the inputs
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [accept, setAccept] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const displayName = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    await createUserWithEmailAndPassword(email, password);
    await updateProfile({ displayName });

    if (loading || updating) {
      <Loading></Loading>;
    }

    console.log("Name updated");
    navigate(`/home`);
  };

  return (
    <div className="container">
      <div className="formContainer">
        <h3 className="text-center text-secondary pb-2">Register</h3>
        <form onSubmit={handleSubmit} action="">
          <div className="input-fields">
            <label htmlFor="password">Your Name</label>
            <input ref={nameRef} type="text" name="name" id="name" />
          </div>
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
          <div
            className={`input-fields d-flex align-items-center mt-1 ${
              accept || "text-danger"
            }`}
          >
            <input
              className="mt-1 me-1"
              type="checkbox"
              name="accept"
              id="accept"
              onClick={() => setAccept(!accept)}
            />
            <label htmlFor="checkbox">Accept terms and conditions</label>
          </div>
          <input
            disabled={accept ? false : true}
            className="submitBtn"
            type="submit"
            value="Register"
          />

          <p className="text-center mt-1">
            <small>
              {" "}
              Have an account?{" "}
              <Link className="text-decoration-none " to={`/login`}>
                Login
              </Link>
            </small>
          </p>
        </form>
        <SocialLogin></SocialLogin>
      </div>
    </div>
  );
};

export default Register;
