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
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

  const [updateProfile, updating, updateError] = useUpdateProfile(auth);

  if (updating || loading) {
    <Loading></Loading>;
  }

  const [currentUser] = useAuthState(auth);

  const [agree, setAgree] = useState(false);
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const nameRef = useRef("");

  const navigate = useNavigate();

  if (currentUser) {
    console.log("user", currentUser);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    // const agree = event.target.terms.checked;

    await createUserWithEmailAndPassword(email, password);
    await updateProfile({ displayName: name });
    console.log("Updated profile");
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
            className={`d-flex align-items-center mt-1 ${
              agree || "text-danger"
            }`}
          >
            <input
              type="checkbox"
              name="terms"
              id="checkbox"
              className={`mt-1 me-1`}
              onClick={() => setAgree(!agree)}
            />
            <label htmlFor="checkbox">Accept terms and conditions</label>
          </div>

          <input
            disabled={!agree}
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
