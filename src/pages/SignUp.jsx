import SideBar from "../components/Auth/SideBar";
import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const SignUp = () => {
  return (
    <div className="flex items-center h-screen">
      <SideBar />
      <div className="flex items-center justify-center h-screen px-10 w-screen">
        <div>
          <FontAwesomeIcon icon={faXTwitter} className="text-5xl pb-10 md:hidden" />
          <div className="text-5xl font-black py-10">Happening now</div>
          <div className="text-2xl font-black pb-10">Join X today.</div>
          <div className="flex items-center gap-5 border-2 border-slate-700 text-center justify-center py-3 rounded-full mb-5 cursor-pointer hover:text-blue-400">
            <img
              className=" w-8"
              src="https://img.icons8.com/?size=512&id=V5cGWnc9R4xj&format=png"
              alt=""
            />
            <div className="text-xl">Continue with Google</div>
          </div>
          <div className="text-xl bg-white text-black py-3 text-center rounded-full cursor-pointer hover:text-blue-400">
            Already have an account? Login
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
