import { faChartSimple, faComment, faDownload, faEllipsis, faHeart, faRetweet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Tweet = () => {
  return (
    <div className="border-b-[1px] border-slate-500">
      <div className="flex gap-5 p-4 justify-between items-start">
        <img
          className="w-10 rounded-full"
          src="https://pbs.twimg.com/profile_images/1436819851566219267/HEffZjvP_400x400.jpg"
          alt="profile_image"
        />
        <div>
          <div className="flex gap-3 items-center pb-1 pt-1">
            <div className=" text-[14.5px] font-semibold">FireShip</div>
            <div className=" text-slate-500 text-sm">@fireship_dev</div>
            <div className=" text-slate-500 text-sm">· 12m</div>
          </div>
          <div className="text-sm pb-5">
            Feeding off orders from her master, she injects poison into enemies
            that dare stand within striking distance. You can’t fix her, but she
            will fix you. Seb 🇧🇦
          </div>
          <div className="flex justify-between">
        <div className="flex items-center gap-4 text-slate-500">
        <FontAwesomeIcon icon={faComment} className="text-lg " />
        <div className="text-sm">100</div>
        </div>
        <div className="flex items-center gap-4 text-slate-500">
        <FontAwesomeIcon icon={faRetweet} className="text-lg " />
        <div className="text-sm">45</div>
        </div>
        <div className="flex items-center gap-4 text-slate-500">
        <FontAwesomeIcon icon={faHeart} className="text-lg " />
        <div className="text-sm">100</div>
        </div>
        <div className="flex items-center gap-4 text-slate-500">
        <FontAwesomeIcon icon={faChartSimple} className="text-lg " />
        <div className="text-sm">10.2k</div>
        </div>
        <FontAwesomeIcon icon={faDownload} className="text-lg text-slate-500" />
      </div>
        </div>
        <FontAwesomeIcon icon={faEllipsis} className="text-lg text-slate-500" />
        </div>

    </div>
  );
};

export default Tweet;

/**
 * Relevant people
Fireship
@fireship_dev
Build and ship your app faster with @JeffDelaney23
🔥📽️ http://youtube.com/c/Fireship
Trending now
Trends for you
Sports · Trending
 */
