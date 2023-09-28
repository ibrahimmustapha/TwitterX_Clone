import {
  BellOutlined,
  HomeOutlined,
  MailOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Trends from "../../pages/Trends";
import { Link, useNavigate } from "react-router-dom";

const BottomNav = () => {
  const navigate = useNavigate();
  const username = localStorage
    .getItem("name")
    .split(" ")
    .join("")
    .toLocaleLowerCase();

  const openSearch = () => {
    return navigate("/trends");
  };

  const openHome = () => {
    return navigate("/");
  };

  return (
    <div className="md:hidden  bg-mgray overflow-hidden rounded-t-lg p-4 fixed bottom-0 left-0 w-full flex justify-between">
      <Link to={"/"}>
        <HomeOutlined onClick={openHome} className="text-xl text-white" />
      </Link>
      <Link to={"/trends"}>
        <SearchOutlined className="text-xl text-white cursor-pointer" />
      </Link>
      <BellOutlined className="text-xl text-white" />
      <MailOutlined className="text-xl text-white" />
      <Link to={`/profile/${username}`}>
        <UserOutlined className="text-xl text-white" />
      </Link>
    </div>
  );
};

export default BottomNav;
