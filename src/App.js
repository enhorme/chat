import Sidebar from "components/Sidebar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserState, setUser } from "store/userSlice";
import { auth, db } from "services/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, doc, onSnapshot, collection } from "firebase/firestore";
import LoginPage from "components/LoginPage";
import Dialog from "components/Dialog";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUserState);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const { uid } = user;
        const docRef = doc(db, "users", uid);
        await onSnapshot(docRef, (snapshot) =>
          dispatch(setUser(snapshot.data()))
        );
      } else {
        dispatch(setUser(null));
      }
    });
  }, [dispatch]);

  return (
    <>
      {user?.uid ? (
        <div className="app">
          <Sidebar />
          <Dialog />
        </div>
      ) : (
        <LoginPage />
      )}
    </>
  );
}

export default App;
