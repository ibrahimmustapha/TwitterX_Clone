import {
  faChartSimple,
  faComment,
  faDownload,
  faEllipsis,
  faHeart,
  faRetweet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { collection, doc, increment, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const Tweet = (props) => {
  const handleLikes = async () => {
    const ref = doc(collection(db, "tweets"), props.uid);
    await updateDoc(ref, {
      like: increment(1),
    });
  };
  return (
    <div className="border-b-[1px] border-slate-500">
      <div className="flex gap-5 p-4 items-start">
        <img
          className="w-10 rounded-full"
          src={props.avatar}
          alt="profile_image"
        />
        <div>
          <div className="flex gap-3 items-center pb-1 pt-1">
            <div className=" text-[14.5px] font-semibold">{props.name}</div>
            <div className=" text-slate-500 text-sm">
              @{props.username} · {props.date}
            </div>
          </div>
          <div
            className="text-md pb-5"
            dangerouslySetInnerHTML={{ __html: props.text }}
          ></div>
          {props.image && (
            <img src={props.image} className="w-7/12 pb-5 rounded-xl" alt="" />
          )}
          <div className="flex justify-between">
            <div className="flex items-center gap-4 text-slate-500">
              <FontAwesomeIcon icon={faComment} className="text-lg " />
              <div className="text-lg">{props.comment}</div>
            </div>
            <div className="flex items-center gap-4 text-slate-500">
              <FontAwesomeIcon icon={faRetweet} className="text-lg" />
              <div className="text-lg">0</div>
            </div>
            <div className="flex items-center gap-4 text-slate-500">
              <FontAwesomeIcon
                icon={faHeart}
                className="text-lg"
                onClick={handleLikes}
              />
              <div className="text-lg">{props.likes}</div>
            </div>
            <div className="flex items-center gap-4 text-slate-500">
              <FontAwesomeIcon icon={faChartSimple} className="text-lg" />
              <div className="text-lg">0</div>
            </div>
            <FontAwesomeIcon
              icon={faDownload}
              className="text-lg text-slate-500"
            />
          </div>
        </div>
        <FontAwesomeIcon icon={faEllipsis} className="text-lg text-slate-500" />
      </div>
    </div>
  );
};

export default Tweet;
