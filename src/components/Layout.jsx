import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RightBar from "./RightBar";
import SideBar from "./SideBar";
import { faBell, faEnvelope, faHome, faMailBulk, faMessage, faPlus, faSearch, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import MobilePostButton from "./Posts/MobilePostButton";

const Layout = (props) => {
  return (
    <div className="max-w-5xl m-auto">
      <div className="flex md:gap-10">
        <div className="hidden md:block w-1/4 left-0 top-0 overflow-hidden md:w-1/5 lg:w-1/4">
          <SideBar />
        </div>
        <MobilePostButton />
        <div>
          <div className="md:hidden  bg-mgray overflow-hidden rounded-t-lg p-4 fixed bottom-0 left-0 w-full flex justify-between">
            <FontAwesomeIcon icon={faHome} className="text-white text-xl cursor-pointer active:text-blue-500" />
            <FontAwesomeIcon icon={faSearch} className="text-white text-xl cursor-pointer active:text-blue-500" />
            <FontAwesomeIcon icon={faBell} className="text-white text-xl cursor-pointer active:text-blue-500" />
            <FontAwesomeIcon icon={faEnvelope} className="text-white text-xl cursor-pointer active:text-blue-500" />
            <FontAwesomeIcon icon={faUserAlt} className="text-white text-xl cursor-pointer active:text-blue-500" />
          </div>
        </div>
        <div className="flex-1 overflow-auto">{props.children}</div>
      </div>
    </div>
  );
};

export default Layout;
