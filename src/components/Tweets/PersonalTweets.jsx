import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import Tweet from "../Tweet";
import { useParams } from "react-router-dom";

const PersonalTweets = () => {
  const [tweets, setTweets] = useState([]);
  const { username } = useParams();

  useEffect(() => {
    const q = query(
      collection(db, "tweets"),
      where("username", "==", username)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      try {
        const tempTweet = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          tempTweet.push(data);
        });
        setTweets(tempTweet);
      } catch (error) {
        console.log("Error fetching tweets: ", error);
      }
    });
  }, [username]);

  return (
    <div>
      {tweets.map((tweet) => (
        <Tweet
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
      <div className="text-center p-10">The end!</div>
    </div>
  );
};

export default PersonalTweets;
