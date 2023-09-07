import SideBar from "../components/Auth/SideBar";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addDoc, auth, db, githubProvider, googleProvider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  // github sign in
  const handleGithubSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const userData = {
        name: result.user.displayName,
        username: result.user.displayName
          .split(" ")
          .join("")
          .toLocaleLowerCase(),
        email: result.user.email,
        token: (await result.user.getIdToken()).toString(),
        avatar: result.user.photoURL,
        phone: result.user.phoneNumber,
        uid: result.user.uid,
        bio: "",
        location: "",
        joined: new Date(),
      };
      localStorage.setItem(
        "account_token",
        (await result.user.getIdToken()).toString()
      );
      localStorage.setItem("uid", result.user.uid.toString());
      localStorage.setItem("name", result.user.displayName);
      localStorage.setItem("img", result.user.photoURL);
      const docRef = doc(collection(db, "user"), result.user.uid);
      await setDoc(docRef, userData);
      console.log("Google Sign Up Successful:", result.user, docRef.id);
      navigate("/");
    } catch (error) {
      console.error("Google Sign Up Error:", error);
    }
  };
  // sign up with google
  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userData = {
        name: result.user.displayName,
        username: result.user.displayName
          .split(" ")
          .join("")
          .toLocaleLowerCase(),
        email: result.user.email,
        token: (await result.user.getIdToken()).toString(),
        image: result.user.photoURL,
        phone: result.user.phoneNumber,
        uid: result.user.uid,
      };
      localStorage.setItem(
        "account_token",
        (await result.user.getIdToken()).toString()
      );
      localStorage.setItem("uid", result.user.uid.toString());
      localStorage.setItem("name", result.user.displayName);
      localStorage.setItem("img", result.user.photoURL);
      const docRef = doc(collection(db, "user"), result.user.uid);
      await setDoc(docRef, userData);
      console.log("Google Sign Up Successful:", result.user, docRef.id);
      navigate("/");
    } catch (error) {
      console.error("Google Sign Up Error:", error);
    }
  };
  return (
    <div className="flex items-center h-screen">
      <SideBar />
      <div className="flex items-center justify-center h-screen px-10 w-screen">
        <div>
          <FontAwesomeIcon
            icon={faXTwitter}
            className="text-5xl pb-10 md:hidden"
          />
          <div className="text-5xl font-black py-10">Happening now</div>
          <div className="text-2xl font-black pb-10">Join X today.</div>
          <div
            onClick={handleGoogleSignUp}
            className="flex items-center gap-5 border-2 border-slate-700 text-center justify-center py-3 rounded-full mb-5 cursor-pointer hover:text-blue-400"
          >
            <img
              className=" w-8"
              src="https://img.icons8.com/?size=512&id=V5cGWnc9R4xj&format=png"
              alt=""
            />
            <div className="text-xl">Continue with Google</div>
          </div>
          <div
            onClick={handleGithubSignIn}
            className="flex items-center gap-5 border-2 bg-white text-black text-center justify-center py-3 rounded-full mb-5 cursor-pointer hover:text-blue-400"
          >
            <img
              className=" w-8"
              src="https://img.icons8.com/?size=512&id=AZOZNnY73haj&format=png"
              alt=""
            />
            <div className="text-xl">Continue with Github</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
