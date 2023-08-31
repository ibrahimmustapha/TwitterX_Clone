import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

const TrendCard = (props) => {
  return (
    <div className="mb-5">
    <div className="text-sm text-slate-400">{props.type} · Trending</div>
    <div className="flex justify-between items-start">
      <div>
        <div className="font-semibold">{props.name}</div>
        <div className="text-sm text-slate-400">{props.posts}K posts</div>
      </div>
      <FontAwesomeIcon
        icon={faEllipsisH}
        className="text-lg text-white"
      />
    </div>
  </div>
  );
};

export default TrendCard;
