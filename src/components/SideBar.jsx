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
      <div className="bg-blue-400 px-4 py-3 w-52 text-lg rounded-full text-center">Post</div>
      <div className="flex gap-5 items-center my-20 cursor-pointer">
        <div><img className=" w-12 rounded-full" src="https://ibrahimdotcode.netlify.app/static/media/pic5.a22e9a826aa52809497e.jpeg" alt="profile" /></div>
        <div>
            <div>Ibrahim</div>
            <div className=" text-slate-500">@codewithibrahim</div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default SideBar;
