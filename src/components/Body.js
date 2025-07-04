import { createBrowserRouter } from "react-router-dom";
import Login from "./Login";
import Browse from "./Browse";
import { RouterProvider } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element: <Browse />,
    },
  ]);

  //Since I only want to call this api "onAuthStateChanged" once not everytime so we use it inside useEffect with empty array
  // We could have used useDispatch for dispatching the actions for updating the userSlice of store in Login separately for sign in and sign up but we wanted to do it as one place so we are handling that logic in Body using firebase API
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // When User sign in or sign up
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL
          })
        );

        //If the user is able to sign in successfully it will be redirected to browse page 
        // navigate("/browse"); // Error : Since we have used routing in this component so we can use it only in children component like Login, Browse etc
      } else {
        // When User is signed out
        dispatch(removeUser());

        //Otherise if user sign out 
        // navigate("/"); // Error : Since we have used routing in this component so we can use it only in children component like Login, Browse etc
      }
    });
  }, []);

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
