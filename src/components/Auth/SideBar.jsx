import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SideBar = () => {
  return (
    <div className="hidden md:flex bg-mgray h-screen w-7/12 items-center justify-center text-center">
      <div className="">
        <FontAwesomeIcon icon={faXTwitter} className="text-9xl" />
      </div>
    </div>
  );
};

export default SideBar;
