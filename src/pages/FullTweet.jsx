import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Tweet from "../components/Tweet";
import ShareComment from "../components/Tweets/ShareComment";
import CommentList from "../components/Tweets/CommentList";

const FullTweet = () => {
  const navigate = useNavigate();
  const uid = useParams();
  const [tweet, setTweet] = useState([]);
  const [comments, setComments] = useState([]);
  const someArr = [];

  useEffect(() => {
    const fetchTweet = async () => {
      try {
        const q = query(collection(db, "tweets"), where("uid", "==", uid.uid));
        const tweetDoc = await getDocs(q);
        const tempTweet = [];
        const tempComment = [];
        tweetDoc.forEach((doc) => {
          const data = doc.data();
          tempTweet.push(data);
          tempComment.push(data?.comments);
          someArr.push(data?.comments);
        });
        setTweet(tempTweet);
        setComments(tempComment[0]);
      } catch (error) {
        console.log("Error fetching tweets: ", error);
      }
    };

    fetchTweet();
  }, [uid]);

  console.log("Comments here:: ", comments[0]);

  return (
    <Layout>
      <div className="md:border-x-[1px] border-slate-600 h-full pb-20">
        <div
          className="p-5 flex items-center gap-10"
          onClick={() => navigate(-1)}
        >
          <ArrowLeftOutlined className=" text-xl" />
          <div className=" text-xl font-semibold">Post</div>
        </div>
        {tweet.map((data) => (
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
        <ShareComment />
        <CommentList />
      </div>
    </Layout>
  );
};

export default FullTweet;
