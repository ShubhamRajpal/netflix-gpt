import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import checkValidFormData from "../utils/validateForm";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    console.log(email);
    console.log(password);
    const message = isSignInForm
      ? checkValidFormData(email.current.value, password.current.value)
      : checkValidFormData(
          email.current.value,
          password.current.value,
          name.current.value
        );

    setErrorMessage(message);

    if (message) return;

    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://avatars.githubusercontent.com/u/88403275?v=4",
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              navigate("/browse");
              console.log(user);
            })
            .catch((error) => {
              // An error occurred
              setErrorMessage(errorMessage);
              // ...
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          navigate("/browse");
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const handleToggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/75b0ed49-75ab-4a63-bd45-37bc2c95cb73/web/IN-en-20250623-TRIFECTA-perspective_ae5833b7-6ce5-4e88-853e-014f38c506f1_large.jpg"
          alt="background-logo"
        />
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute w-1/3 bg-black my-36 mx-auto p-12 left-0 right-0 text-white bg-opacity-80 rounded-lg">
        <h1 className="py-4 my-2 font-bold text-4xl">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            type="text"
            ref={name}
            placeholder="Full Name"
            className="p-4 my-2 w-full bg-gray-700 text-white border rounded-lg bg-opacity-50"
          />
        )}

        <input
          type="text"
          ref={email}
          placeholder="Email or mobile number"
          className="p-4 my-2 w-full bg-gray-700 text-white border rounded-lg bg-opacity-50"
        />

        <input
          type="password"
          ref={password}
          placeholder="Password"
          className="p-4 my-2 w-full bg-gray-700 text-white border rounded-lg bg-opacity-50"
        />

        <button
          className="p-2 my-2 bg-red-700 w-full rounded-lg font-bold"
          onClick={handleButtonClick}>
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p className="text-red-600">{errorMessage}</p>

        <p className="py-4 cursor-pointer" onClick={handleToggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign up now."
            : "Already registered? Sign in now."}
        </p>
      </form>
    </div>
  );
};

export default Login;
