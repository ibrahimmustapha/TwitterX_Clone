import {
  faCalendarAlt,
  faFaceLaugh,
  faImages,
  faLocation,
  faPoll,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const icons = [faImages, faPoll, faFaceLaugh, faCalendarAlt, faLocation];

const ShareTweet = () => {
  return (
    <div className="">
      <div className="flex gap-5 items-start px-5">
        <img
          className="w-10 h-10 rounded-full"
          src="https://ibrahimdotcode.netlify.app/static/media/pic5.a22e9a826aa52809497e.jpeg"
          alt="profile_image"
        />
        <div>
          <textarea
            className="w-full h-20 bg-[#15202b]"
            placeholder="What is Happening?!"
            name=""
            id=""
            cols="30"
            rows="10"
          ></textarea>
        </div>
      </div>
      <div className="flex justify-between gap-4 items-center border-b-[1px] py-3 pl-20 pr-5 border-slate-600">
        <div className="flex gap-4">
          {icons.map((icon) => (
            <FontAwesomeIcon icon={icon} className="text-xl text-blue-400" />
          ))}
        </div>
        <div className="px-7 py-2 rounded-full bg-blue-400">Post</div>
      </div>
    </div>
  );
};

export default ShareTweet;
