import RightBar from "./RightBar";
import SideBar from "./SideBar";

const Layout = (props) => {
  return (
    <div className=" flex h-screen max-w-7xl m-auto overflow-hidden">
      <div className="flex justify-between gap-10">
        <div className=" fixed h-screen overflow-y-auto">
          <SideBar />
        </div>
        <div className="w-1/2 mx-auto overflow-x-hidden overflow-y-auto">{props.children}</div>
        <div className=" fixed right-0 h-screen overflow-y-auto">
          <RightBar />
        </div>
      </div>
    </div>
  );
};

export default Layout;
