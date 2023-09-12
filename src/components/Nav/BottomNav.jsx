import {
  BellOutlined,
  HomeOutlined,
  MailOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Trends from "../../pages/Trends";
import { useNavigate } from "react-router-dom";

const BottomNav = () => {
  const navigate = useNavigate();

  const openSearch = () => {
    return navigate("/trends");
  };

  const openHome = () => {
    return navigate("/");
  };

  return (
    <div className="md:hidden  bg-mgray overflow-hidden rounded-t-lg p-4 fixed bottom-0 left-0 w-full flex justify-between">
      <HomeOutlined onClick={openHome} className="text-xl text-white" />
      <SearchOutlined
        onClick={openSearch}
        className="text-xl text-white cursor-pointer"
      />
      <BellOutlined className="text-xl text-white" />
      <MailOutlined className="text-xl text-white" />
      <UserOutlined className="text-xl text-white" />
    </div>
  );
};

export default BottomNav;
