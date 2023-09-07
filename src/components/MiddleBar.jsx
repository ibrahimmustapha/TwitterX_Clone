import { useEffect, useState } from "react";
import ShareTweet from "./ShareTweet";
import Tweet from "./Tweet";
import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase";

const MiddleBar = () => {
  const [tweets, setTweets] = useState([]);
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
      } catch (error) {
        console.log("Error fetching tweets: ", error);
      }
    });
  }, []);

  // Function to format a Firestore timestamp into a date string (YYYY-MM-DD)
  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000); // Convert Firestore timestamp to JavaScript Date
    const currentDate = new Date();
    const timeDifference = currentDate - date;

    if (timeDifference < 60000) {
      return "1m ago";
    } else if (timeDifference < 3600000) {
      const minutesAgo = Math.floor(timeDifference / 60000);
      return `${minutesAgo}m ago`;
    } else if (timeDifference < 86400000) {
      const hoursAgo = Math.floor(timeDifference / 3600000);
      return `${hoursAgo}h ago`;
    } else if (timeDifference < 172800000) {
      return "Yesterday";
    } else if (timeDifference < 604800000) {
      const daysAgo = Math.floor(timeDifference / 86400000);
      return `${daysAgo}d ago`;
    } else {
      return date.toISOString().split("T")[0]; // Get the date part (YYYY-MM-DD)
    }
  };
  return (
    <div className="border-x-[1px] border-slate-600 w-9/12 ">
      <div className="p-5">Home</div>
      <ShareTweet />
      {tweets.map((tweet) => (
        <Tweet
          key={tweet.uid}
          name={tweet.name}
          username={tweet.username}
          avatar={tweet.avatar}
          text={tweet.text}
          date={formatDate(tweet.date)}
          image={tweet.photo}
          likes={tweet.like}
          comment={tweet.comments.length}
          uid={tweet.uid}
        />
      ))}
    </div>
  );
};

export default MiddleBar;
