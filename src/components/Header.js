import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGPTSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const gpt = useSelector((store) => store.gpt);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  //Since I only want to call this api "onAuthStateChanged" once not everytime so we use it inside useEffect with empty array
  // We could have used useDispatch for dispatching the actions for updating the userSlice of store in Login separately for sign in and sign up but we wanted to do it as one place so we are handling that logic in Body using firebase API
  useEffect(() => {
    let unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // When User sign in or sign up
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
        //If the user is able to sign in successfully it will be redirected to browse page
        // navigate("/browse"); // Error : Since we have used routing in this component so we can use it only in children component like Login, Browse etc
      } else {
        // When User is signed out
        dispatch(removeUser());
        navigate("/");
        //Otherise if user sign out
        // navigate("/"); // Error : Since we have used routing in this component so we can use it only in children component like Login, Browse etc
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGPTSearchClick = () => {
    dispatch(toggleGPTSearchView(gpt.showGPTSearch));
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute px-8 py-2 bg-gradient-to-b from-black w-screen z-10 flex justify-between bg-opacity-80">
      <img className="w-44 mx-6" src={LOGO} alt="netflix-logo" />
      {user && (
        <div className="flex m-4">
          {gpt.showGPTSearch && <select
            className="m-2 p-3 bg-slate-900 font-bold text-l text-white rounded"
            onChange={handleLanguageChange}>
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.identfier} value={lang.identfier}>
                {lang.name}
              </option>
            ))}
          </select>}
          <button
            className="bg-red-700 outline-none m-2  text-white px-4 items-center rounded text-l font-bold"
            onClick={handleGPTSearchClick}>
            {gpt.showGPTSearch ? "Home" : "GPT Search"}
          </button>
          <img
            className="w-10 h-10 m-2 rounded"
            src={user?.photoURL}
            alt="user-logo"
          />
          <button onClick={handleSignOut} className="font-bold text-white">
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
