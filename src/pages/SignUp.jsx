import SideBar from "../components/Auth/SideBar";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { auth, db, githubProvider, googleProvider } from "../firebase";
import { getRedirectResult, signInWithRedirect } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const SignUp = () => {
  const accountToken = localStorage.getItem("account_token");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // github sign in
  const handleGithubSignIn = async () => {
    try {
      setLoading(true);
      await signInWithRedirect(auth, githubProvider);
    } catch (error) {
      console.error("Google Sign Up Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // sign up with google
  const handleGoogleSignUp = async () => {
    try {
      setLoading(true);
      if (!!navigator.userAgent && /iPhone|iPod/.test(navigator.userAgent)) {
        document
          .querySelector('link[rel="manifest"]')
          .setAttribute("rel", "no-on-ios");
      }
      await signInWithRedirect(auth, googleProvider);
    } catch (error) {
      console.error("Google Sign Up Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle the redirect sign-in response
  useEffect(() => {
    const handleRedirectSignIn = async () => {
      try {
        setLoading(true);
        const result = await getRedirectResult(auth);

        if (result.user) {
          // Handle the signed-in user and store data as needed.
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
          localStorage.setItem("account_token", userData.token);
          localStorage.setItem("uid", userData.uid);
          localStorage.setItem("name", userData.name);
          localStorage.setItem("img", userData.avatar);
          const docRef = doc(collection(db, "user"), userData.uid);
          await setDoc(docRef, userData);

          // Redirect to your desired route
          navigate("/");
        }
      } catch (error) {
        console.error("Redirect Sign In Error:", error);
      } finally {
        setLoading(false);
      }
    };

    handleRedirectSignIn();
  }, [navigate]);

  if (accountToken) {
    return <Navigate replace to="/" />;
  }

  if (loading) {
    return (
      <div className="hidden md:flex bg-mgray h-screen w-screen items-center justify-center text-center">
        <div
          class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        >
          <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center h-screen">
      <SideBar />
      <div className="flex items-center justify-center h-screen px-5 md:px-10 w-screen">
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
