import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TrendCard from "./TrendCard";
import FollowCard from "./FollowCard";

const trendList = [
  {
    type: "Sports",
    name: "Cristiano Ronaldo",
    posts: "40.04",
  },
  {
    type: "Sports",
    name: "Alnassr",
    posts: "20.04",
  },
  {
    type: "Sports",
    name: "Chelsea",
    posts: "60.6",
  },
  {
    type: "Entertainment",
    name: "J. Cole",
    posts: "10.08",
  },
  {
    type: "Sports",
    name: "Liverpool",
    posts: "70.6",
  },
  {
    type: "Entertainment",
    name: "Kanye",
    posts: "100.03",
  },
];

const followData = [
  {
    image:
      "https://ibrahimdotcode.netlify.app/static/media/pic5.a22e9a826aa52809497e.jpeg",
    name: "Davie",
    username: "@daviddoteth",
  },
  {
    image:
      "https://ibrahimdotcode.netlify.app/static/media/pic5.a22e9a826aa52809497e.jpeg",
    name: "AlNassr",
    username: "@AlNassrFC_EN",
  },
  {
    image:
      "https://ibrahimdotcode.netlify.app/static/media/pic5.a22e9a826aa52809497e.jpeg",
    name: "mr John",
    username: "@mrjohn1245",
  },
];
const RightBar = () => {
  return (
    <div className="h-full w-7/12">
      <div className="pt-5">
        <div className="flex gap-4 items-center bg-mgray py-3 px-5 rounded-full mb-4">
          <FontAwesomeIcon icon={faSearch} className="text-xl text-slate-600" />
          <input type="text" placeholder="Search" className="bg-mgray" />
        </div>
        <div className="px-5 py-4 rounded-2xl bg-mgray mb-4">
          <div className="text-xl font-black pb-3">Subscribe to Premium</div>
          <div>
            Subscribe to unlock new features and if eligible, receive a share of
            ads revenue.
          </div>
          <div className="bg-blue-400 py-2 px-5 w-5/12 text-center mt-3 rounded-full font-bold">
            Subscribe
          </div>
        </div>
        <div className="px-5 py-4 rounded-2xl bg-mgray">
          <div className="text-xl font-black pb-5">Trends for you</div>
          <TrendCard />
          {trendList.map((list) => (
            <TrendCard type={list.type} name={list.name} posts={list.posts} />
          ))}
          <div className="text-blue-400">Show more</div>
        </div>
        <div className="rounded-2xl bg-mgray p-5 mt-4 mb-10">
          <div className="text-xl font-black pb-5">Who to follow</div>
          {followData.map((follow) => (
            <FollowCard
              image={follow.image}
              name={follow.name}
              username={follow.username}
            />
          ))}
          <div className="text-blue-400">Show more</div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
