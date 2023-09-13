import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { useParams } from "react-router-dom";
import Tweet from "../Tweet";

const CommentList = () => {
  const uid = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "tweets"), where("uid", "==", uid.uid));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      try {
        const tempComment = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          tempComment.push(data?.comments);
        });
        setComments(tempComment[0]);
      } catch (error) {
        console.log("Error fetching tweets: ", error);
      }
    });
  }, [uid]);

  return (
    <div>
      {comments ? (
        <div>
          {comments.map((data) => (
            <Tweet
              key={data.uid}
              name={data.name}
              username={data.username}
              avatar={data.avatar}
              text={data.text}
              date={data.date}
              image={data.photo}
              likes={data.likedBy.length}
              comment={data.comments.length}
              uid={data.uid}
            />
          ))}
        </div>
      ) : (
        <div className=" text-center justify-center items-center">
          No comments
        </div>
      )}
    </div>
  );
};

export default CommentList;
