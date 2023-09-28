import { useEffect, useState } from "react";
import ShareTweet from "./ShareTweet";
import Tweet from "./Tweet";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import SkeletonLoader from "./Loaders/SkeletonLoader";
import { useNavigate } from "react-router-dom";

const MiddleBar = () => {
  const navigate = useNavigate();
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // db reference
    const ref = collection(db, "tweets");
    const q = query(ref, orderBy("date", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      try {
        const updatedTweets = [];
        querySnapshot.forEach((tweet) => {
          updatedTweets.push(tweet.data());
        });

        setTweets(updatedTweets);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching tweets: ", error);
      }
    });
    // unsubscribe();
  }, []);

  return (
    <div className="md:border-x-[1px] border-slate-600 md:w-12/12">
      <div className="p-5">Home</div>
      <ShareTweet />
      {loading ? (
        <div>
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
        </div>
      ) : (
        <div className="mb-12">
          {tweets.map((tweet) => (
            <Tweet
              onClick={() => navigate(`/${tweet.username}/status/${tweet.uid}`)}
              key={tweet.uid}
              name={tweet.name}
              username={tweet.username}
              avatar={tweet.avatar}
              text={tweet.text}
              date={tweet.date}
              image={tweet.photo}
              likes={tweet.likedBy.length}
              comment={tweet.comments.length}
              uid={tweet.uid}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MiddleBar;
