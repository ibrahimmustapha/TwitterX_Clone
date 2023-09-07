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
import { db } from "../firebase";
import { useEffect, useState } from "react";

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
  const uid = localStorage.getItem("uid");
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
        <div className="bg-blue-400 px-4 py-3 w-52 text-lg rounded-full text-center">
          Post
        </div>
        <div className="flex gap-5 items-center my-20 cursor-pointer">
          <div>
            <img
              className="w-12 rounded-full"
              src={user.image}
              alt="profile"
            />
          </div>
          <div>
            <div className="line-clamp-1">{user.name}</div>
            <div className=" text-slate-500">@{user.username}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
