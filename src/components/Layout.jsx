import SideBar from "./Nav/SideBar";
import MobilePostButton from "./Posts/MobilePostButton";
import BottomNav from "./Nav/BottomNav";

const Layout = (props) => {
  return (
    <div className="max-w-5xl m-auto">
      <div className="flex md:gap-10">
        <div className="hidden md:block w-1/4 left-0 top-0 overflow-hidden md:w-1/5 lg:w-1/4">
          <SideBar />
        </div>
        <MobilePostButton />
        <div>
          <BottomNav />
        </div>
        <div className="flex-1 overflow-auto">{props.children}</div>
      </div>
    </div>
  );
};

export default Layout;
