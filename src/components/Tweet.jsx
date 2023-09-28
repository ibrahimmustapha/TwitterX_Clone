import {
  arrayRemove,
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase";
import { EditorState, convertFromRaw } from "draft-js";
import { stateToHTML } from "draft-js-export-html";
import { useEffect, useState } from "react";
import {
  BarChartOutlined,
  DownloadOutlined,
  EllipsisOutlined,
  HeartFilled,
  HeartOutlined,
  MessageOutlined,
  RetweetOutlined,
} from "@ant-design/icons";

const Tweet = (props) => {
  const [liked, setLiked] = useState(false);

  // Parse the JSON content state and convert it to EditorState
  const rawContentState = JSON.parse(props.text);
  const contentState = convertFromRaw(rawContentState);
  const tweetEditorState = EditorState.createWithContent(contentState);

  // Convert the EditorState to HTML
  const tweetHTML = stateToHTML(tweetEditorState.getCurrentContent(), {
    customInlineFn: (element, self) => {
      if (element.type === "emoji") {
        const emoji = element.data;
        return self.createHTMLSpan({
          html: `<img src="${emoji.imageUrl}" alt="${emoji.native}" />`,
        });
      }
    },
  });

  const handleLikes = async () => {
    try {
      const q = query(collection(db, "tweets"), where("uid", "==", props.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const tweetRef = doc.ref;
        const username = localStorage
          .getItem("name")
          .split(" ")
          .join("")
          .toLocaleLowerCase();
        // Get the likedBy array, or an empty array if it doesn't exist
        const likedBy = doc.data().likedBy || [];

        if (likedBy.includes(username)) {
          // If the user has already liked the tweet, unlike it
          updateDoc(tweetRef, {
            // Remove the user from likedBy
            likedBy: arrayRemove(username),
          });
          setLiked(false);
        } else {
          updateDoc(tweetRef, {
            likedBy: [...likedBy, username],
          });
          setLiked(true);
        }
      });
    } catch (error) {
      console.log("like error", error);
    }
  };

  // Check if the tweet is liked when the component mounts
  useEffect(() => {
    const username = localStorage
      .getItem("name")
      .split(" ")
      .join("")
      .toLocaleLowerCase();

    const checkLiked = async () => {
      try {
        const q = query(
          collection(db, "tweets"),
          where("uid", "==", props.uid)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          const likedBy = doc.data().likedBy || [];
          if (likedBy.includes(username)) {
            setLiked(true);
          }
        });
      } catch (error) {
        console.log("Like check error", error);
      }
    };

    checkLiked();
  }, [props.uid]);

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
    <div className="border-b-[1px] border-slate-500">
      <div className="flex gap-5 p-4 items-start">
        <img
          className="w-10 rounded-full"
          src={props.avatar}
          alt="profile_image"
        />
        <div>
          <div
            onClick={props.onClick}
          >
            <div className="flex gap-1 items-center pb-1 pt-1">
              <div className=" text-[14.5px] font-semibold line-clamp-1">
                {props.name}
              </div>
              <div className=" text-slate-500 text-sm line-clamp-1">
                @{props.username} · {formatDate(props.date)}
              </div>
            </div>
            <div
              className="text-md pb-5"
              dangerouslySetInnerHTML={{ __html: tweetHTML }}
            ></div>
            {props.image && (
              <img
                src={props.image}
                className="md:w-9/12 w-full  pb-5 rounded-xl"
                alt=""
              />
            )}
          </div>
          <div className="flex justify-between">
            <div className="flex items-center gap-4 text-slate-500">
              <MessageOutlined className="text-sate-500 text-[16px]" />
              <div className="text-lg">{props.comment}</div>
            </div>
            <div className="flex items-end gap-4 text-slate-500">
              <RetweetOutlined className="text-sate-500 text-lg" />
              <div className="text-lg">0</div>
            </div>
            <div className="flex items-end gap-4">
              <div onClick={handleLikes}>
                {liked === false ? (
                  <HeartOutlined className="text-slate-500 text-lg" />
                ) : (
                  <HeartFilled className="text-pink-600 text-lg" />
                )}
              </div>
              <div className="text-md text-slate-500">{props.likes}</div>
            </div>
            <div className="flex items-end gap-4 text-slate-500">
              <BarChartOutlined className="text-sate-500 text-lg" />
              <div className="text-md">0</div>
            </div>
            <DownloadOutlined className="text-slate-500 text-lg" />
          </div>
        </div>
        <EllipsisOutlined className="text-lg text-slate-500" />
      </div>
    </div>
  );
};

export default Tweet;
