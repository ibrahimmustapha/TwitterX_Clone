import ShareTweet from "./ShareTweet";
import Tweet from "./Tweet";

const MiddleBar = () => {

  return (
    <div className="border-x-[1px] border-slate-600 w-full h-screen">
      <div className="">
        <div className="p-5">Home</div>
        <ShareTweet />
        <Tweet />
        <Tweet /> 
      </div>
    </div>
  );
};

export default MiddleBar;
