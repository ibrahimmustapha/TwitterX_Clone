import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { uploadBytes, ref } from "firebase/storage";
import { db, storage } from "../../firebase";
import { v4 as uuidv4 } from "uuid";
import { Editor, EditorState, convertToRaw } from "draft-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

const PostModal = ({ isOpen, onClose }) => {
  const [tweet, setTweet] = useState("");
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const name = localStorage.getItem("name");
  const photo = localStorage.getItem("img");

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

  const handleTweet = async () => {
    try {
      const timestamp = new Date();
      const docRef = collection(db, "tweets");
      const uid = uuidv4();

      // Convert EditorState to raw content state and save it as JSON
      const rawContentState = convertToRaw(editorState.getCurrentContent());
      // const contentStateJson = JSON.stringify(rawContentState);
      const tweetText = JSON.stringify(rawContentState);

      const tweetData = {
        text: tweetText,
        uid: uid.toString(),
        name: name.toString(),
        username: name.split(" ").join("").toLocaleLowerCase(),
        avatar: photo.toString(),
        photo: "",
        video: "",
        date: timestamp,
        like: 0,
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

      // Add the tweet to Firestore
      await addDoc(docRef, tweetData);

      setEditorState(EditorState.createEmpty());
      setImagePreview(null);
      setFile(null);
      onClose();
      console.log("Tweet uploaded successfully.");
    } catch (error) {
      console.log("Something happened: ", error);
    }
  };
  return isOpen ? (
    <div class="relative z-10" role="dialog" aria-modal="true">
      <div class="fixed inset-0 bg-slate-700 bg-opacity-75 transition-opacity"></div>
      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
          <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div class="bg-mgray px-4 py-3 float-right sm:flex sm:flex-row-reverse sm:px-6">
              <FontAwesomeIcon
                onClick={onClose}
                icon={faClose}
                className="text-white text-2xl cursor-pointer"
              />
            </div>
            <div class="bg-mgray px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div className="py-6">
                  <div className="flex gap-5 items-center">
                    <img
                      className="w-10 h-10 rounded-full"
                      src={photo}
                      alt="profile_image"
                    />
                    <div className="w-full">
                      <Editor
                        editorState={editorState}
                        onChange={setEditorState}
                      />
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
                    <div className="flex justify-between gap-4 items-center py-3 md:pl-20 md:pr-5 px-5 border-slate-600">
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
                        onClick={handleTweet}
                        className="px-7 py-2 rounded-full bg-blue-400 cursor-pointer"
                      >
                        Post
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
};
export default PostModal;
