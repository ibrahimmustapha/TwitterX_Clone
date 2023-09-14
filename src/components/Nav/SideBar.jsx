import { faXTwitter } from "@fortawesome/free-brands-svg-icons";
import {
  faBell,
  faBookmark,
  faEllipsisH,
  faHome,
  faList,
  faSearch,
  faUserAlt,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { useEffect, useState } from "react";
import PostModal from "../Posts/PostModal";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { Icon } from "@mui/material";
import { LogoutOutlined } from "@mui/icons-material";

const sideLinks = [
  {
    name: "Home",
    icon: faHome,
  },
  {
    name: "Explore",
    icon: faSearch,
  },
  {
    name: "Notification",
    icon: faBell,
  },
  {
    name: "List",
    icon: faList,
  },
  {
    name: "Bookmark",
    icon: faBookmark,
  },
  {
    name: "Communities",
    icon: faUserGroup,
  },
  {
    name: "Verified",
    icon: faXTwitter,
  },
  {
    name: "Profile",
    icon: faUserAlt,
  },
  {
    name: "More",
    icon: faEllipsisH,
  },
];

const SideBar = () => {
  const navigate = useNavigate();
  const uid = localStorage.getItem("uid");
  const image = localStorage.getItem("img");
  const username = localStorage
    .getItem("name")
    .split(" ")
    .join("")
    .toLocaleLowerCase();
  const [user, setUser] = useState({});
  console.log(uid);
  useEffect(() => {
    const getUser = async () => {
      try {
        const ref = doc(db, "user", uid);
        const query = await getDoc(ref);
        setUser(query.data());
        console.log(query.data());
      } catch (error) {
        console.log("Something went wrong", error.message);
      }
    };
    getUser();
  }, [uid]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        console.log("Logout successfully");
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      })
      .catch((error) => {
        console.log("error signing out: ", error);
      });
  };

  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="h- p-5 h-screen">
      <FontAwesomeIcon
        icon={faXTwitter}
        className="text-white text-4xl pb-10"
      />
      <div>
        {sideLinks.map((link) => (
          <div className="flex gap-6 items-center mb-10">
            <FontAwesomeIcon icon={link.icon} className="text-white text-xl" />
            <div className="text-lg">{link.name}</div>
          </div>
        ))}
        <div
          onClick={openModal}
          className="bg-blue-400 px-4 py-3 w-52 text-lg rounded-full text-center cursor-pointer"
        >
          Post
        </div>
        <PostModal isOpen={isModalOpen} onClose={closeModal} />
        <div className="flex gap-5 items-center mt-20 cursor-pointer">
          <div>
            <img className="w-12 rounded-full" src={image} alt="profile" />
          </div>
          <div onClick={() => navigate(`profile/${username}`)}>
            <div className="line-clamp-1">{user.name}</div>
            <div className=" text-slate-500">@{user.username}</div>
          </div>
        </div>
        <div className="flex gap-5 items-center my-5 justify-center cursor-pointer" onClick={handleSignOut}>
          <LogoutOutlined className="text-lg"/>
          <div className="text-pink-600 text-lg">Logout</div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
