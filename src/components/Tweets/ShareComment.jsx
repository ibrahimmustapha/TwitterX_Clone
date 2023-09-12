import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Editor, EditorState, convertToRaw } from "draft-js";
import { v4 as uuidv4 } from "uuid";

const ShareComment = () => {
  const uuid = useParams();
  const name = localStorage.getItem("name");
  const photo = localStorage.getItem("img");
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleComment = async () => {
    try {
      const timestamp = new Date();
      const docRef = collection(db, "tweets");
      const uid = uuidv4();

      // Convert EditorState to raw content state and save it as JSON
      const rawContentState = convertToRaw(editorState.getCurrentContent());
      // const contentStateJson = JSON.stringify(rawContentState);
      const tweetText = JSON.stringify(rawContentState);
      console.log(uuid.uid);
      const q = query(collection(db, "tweets"), where("uid", "==", uuid.uid));
      const tweetDoc = await getDocs(q);
      const tweetData = {
        text: tweetText,
        uid: uid.toString(),
        name: name.toString(),
        username: name.split(" ").join("").toLocaleLowerCase(),
        avatar: photo.toString(),
        photo: "",
        video: "",
        date: timestamp,
        likedBy: [],
        comments: [],
      };
      tweetDoc.forEach((doc) => {
        const commentRef = doc.ref;
        const comments = doc.data().comments || [];
        updateDoc(commentRef, {
          comments: [...comments, tweetData],
        });
      });
      setEditorState(EditorState.createEmpty());
    } catch (error) {
      console.log("Error fetching tweets: ", error);
    }
  };
  return (
    <div className="py-5">
      <div className="flex gap-5 items-start px-5">
        <img
          className="w-10 h-10 rounded-full"
          src={photo}
          alt="profile_image"
        />
        <div className="w-full">
          <Editor editorState={editorState} onChange={setEditorState} />
        </div>
      </div>
      <div>
        <div className="flex justify-between gap-4 items-center border-b-[1px] py-3 md:pl-20 md:pr-5 px-5 border-slate-600">
          <div
            onClick={handleComment}
            className="px-7 py-2 rounded-full bg-blue-400 cursor-pointer"
          >
            Post
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareComment;
