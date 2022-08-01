import React from "react";
import GoogleButton from "react-google-button";
import { signInWithPopup } from "firebase/auth";
import { auth, provider, db } from "services/firebase";
import { arrayUnion, doc, setDoc } from "firebase/firestore";

export default () => {
  function handleLogin() {
    signInWithPopup(auth, provider)
      .then((cred) => {
        const data = {
          uid: cred.user.uid,
          displayName: cred.user.displayName,
          email: cred.user.email,
          threads: [],
          avatar: cred.user.photoURL,
        };
        return setDoc(doc(db, "users", cred.user.uid), data);
      })
      .catch((e) => alert(e.message));
  }

  return (
    <section className="login">
      <div className="login__button">
        <GoogleButton label="Sign in with Google" onClick={handleLogin} />
      </div>
    </section>
  );
};
