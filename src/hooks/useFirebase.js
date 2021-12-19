import { useEffect, useState } from "react";
import initAuth from "../pages/Authentication/Firebase/firebase.Init";
import Swal from "sweetalert2";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
  getIdToken,
} from "firebase/auth";

initAuth();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [admin, setAdmin] = useState(false);
  const [token, setToken] = useState("");
  const auth = getAuth();

  const provider = new GoogleAuthProvider();

  //register new user with email password
  const registerUser = (email, password, name, navigate) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        // const user = result.user;

        setError("");
        const newUser = { email, displayName: name };
        setUser(newUser);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully Registered",
          text: "Have a fun!",
          showConfirmButton: false,
          timer: 2000,
        });

        saveUser(email, name, "POST");

        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {
            setError("");
          })
          .catch((error) => {
            const errorMessage = error.message;
            setError(errorMessage);
          });

        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Oops..",
          text: `${error.message}`,
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .finally(() => setIsLoading(false));
  };

  //sign in with email password
  const loginWithEmail = (email, password, location, navigate) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully Logged in!!",
          text: "Have a fun!",
          showConfirmButton: false,
          timer: 2000,
        });
        const destination = location?.state?.from || "/";
        navigate(destination);
        setError("");
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Oops..",
          text: `${error.message}`,
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .finally(() => setIsLoading(false));
  };

  //sign in with google
  const loginWithGoogle = (location, navigate) => {
    setIsLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully Logged in!",
          text: "Have a fun!",
          showConfirmButton: false,
          timer: 2000,
        });
        saveUser(user.email, user.displayName, "PUT");
        const destination = location?.state?.from || "/";
        navigate(destination);
        setError("");
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetch(`http://localhost:5000/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => setAdmin(data.admin));
  }, [user.email]);

  //log out
  const logOut = () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully Logged out!",
          text: "Have a fun!",
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Oops..",
          text: `${error.message}`,
          showConfirmButton: false,
          timer: 2000,
        });
      })
      .finally(() => setIsLoading(false));
  };

  //onAuth State Change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        getIdToken(user).then((idToken) => {
          setToken(idToken);
        });
      } else {
        setUser({});
      }
      setIsLoading(false);
    });
    return () => unsubscribe;
  }, []);

  // save user
  const saveUser = (email, displayName, method) => {
    const user = { email, displayName };
    fetch("http://localhost:5000/users", {
      method: method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    }).then();
  };
  return {
    user,
    admin,
    token,
    registerUser,
    logOut,
    loginWithEmail,
    error,
    isLoading,
    loginWithGoogle,
  };
};

export default useFirebase;
