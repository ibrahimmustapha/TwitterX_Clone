import RightBar from "./RightBar";
import SideBar from "./SideBar";

const Layout = (props) => {
  return (
    <div className="max-w-7xl m-auto">
      <div className="flex">
        <div className=" w-1/4 left-0 top-0 h-screen overflow-y-auto max-w-7xl md:w-1/5 lg:w-1/4">
          <SideBar />
        </div>
        <div className="flex-1">{props.children}</div>
      </div>
    </div>
  );
};

export default Layout;
