import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import PostModal from "./PostModal";

const MobilePostButton = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div className="md:hidden">
      <div
        onClick={openModal}
        className=" my-16 mx-5 bg-blue-400 rounded-full  overflow-hidden p-4 fixed bottom-0 right-0 w-14 flex justify-center"
      >
        <FontAwesomeIcon
          icon={faPlus}
          className="text-white text-2xl cursor-pointer"
        />
      </div>
      <PostModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default MobilePostButton;
