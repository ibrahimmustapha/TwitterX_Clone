import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Editor, EditorState, convertToRaw } from "draft-js";
import { v4 as uuidv4 } from "uuid";
import { ref, uploadBytes } from "firebase/storage";

const ShareComment = () => {
  const uuid = useParams();
  const name = localStorage.getItem("name");
  const photo = localStorage.getItem("img");
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      setFile(selectedFile);

      // Create a FileReader to read and display the image
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setFile(null);
      setImagePreview(null);
    }
  };

  const handleComment = async () => {
    try {
      const timestamp = new Date();
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

      // Check if a file is selected
      if (file) {
        const storageRef = ref(storage, "tweet_files/" + file.name);

        // Upload the file
        await uploadBytes(storageRef, file);

        // Update tweetData with the file URL
        tweetData.photo = `https://firebasestorage.googleapis.com/v0/b/twitterx-clone-7410c.appspot.com/o/tweet_files%2F${file.name}?alt=media&token=888e9534-fa82-48da-ab3a-a105c12312b4`;

        // Reset the file input
        document.getElementById("fileInput").value = "";
      }

      tweetDoc.forEach((doc) => {
        const commentRef = doc.ref;
        const comments = doc.data().comments || [];
        updateDoc(commentRef, {
          comments: [...comments, tweetData],
        });
      });
      setEditorState(EditorState.createEmpty());
      setImagePreview(null);
      setFile(null);
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
      <div>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className=" w-8/12 h-1/2 p-5 pl-20 rounded-xl"
            />
          )}
        </div>
        <div className="flex justify-between gap-4 items-center border-b-[1px] py-3 md:pl-20 md:pr-5 px-5 border-slate-600">
          <div className="flex gap-4">
            <input
              accept="image/*"
              className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100"
              id="fileInput"
              type="file"
              onChange={handleFileChange}
            />
          </div>
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
