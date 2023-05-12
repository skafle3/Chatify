import type { AuthProvider } from "firebase/auth";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { BsGoogle } from "react-icons/bs";
import { Navigate } from "react-router-dom";

import { AlertMessage } from "../../components";
import { useQueryParams } from "../../hooks";
import { firebaseAuth, useUserStore } from "../../library";

import "./style.css";

export function SignIn() {
  const { redirect } = useQueryParams();

  const currentUser = useUserStore((state) => state.currentUser);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleSignIn = (provider: AuthProvider) => {
    setLoading(true);

    signInWithPopup(firebaseAuth, provider)
      .then((res) => {
        console.log(res.user);
      })
      .catch((err) => {
        setIsAlertOpen(true);
        setError(`Error: ${err.code}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (currentUser) return <Navigate to={redirect || "/"} />;

  return (
    <>
      <div className="container">
        <div className="gif">
          <img src="illustration.gif" alt="gif image" />
        </div>
        <div className="wrapper">
          <h1>CHATIFY</h1>
          <p>
            Welcome to Chatify, the innovative messaging app that combines
            ease-of-use with powerful features, so you can chat with your
            friends and family anytime, anywhere, and in any way you want!"
          </p>

          <button
            disabled={loading}
            onClick={() => handleSignIn(new GoogleAuthProvider())}
          >
            <BsGoogle className="svg" aria-label="Sign In With Google" />
            Sign In With Google
          </button>
        </div>
        <AlertMessage
          isOpen={isAlertOpen}
          setIsOpen={setIsAlertOpen}
          text={error}
        />
      </div>
    </>
  );
}
