import { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
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

      <form className="absolute w-1/3 bg-black my-36 mx-auto p-12 left-0 right-0 text-white bg-opacity-80 rounded-lg">
        <h1 className="py-4 my-2 font-bold text-4xl">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-4 my-2 w-full bg-gray-700 text-white border rounded-lg bg-opacity-50"
          />
        )}

        <input
          type="text"
          placeholder="Email or mobile number"
          className="p-4 my-2 w-full bg-gray-700 text-white border rounded-lg bg-opacity-50"
        />

        <input
          type="passowrd"
          placeholder="Password"
          className="p-4 my-2 w-full bg-gray-700 text-white border rounded-lg bg-opacity-50"
        />
        <button className="p-2 my-2 bg-red-700 w-full rounded-lg font-bold">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

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
