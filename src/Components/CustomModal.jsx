import React from "react";
import Modal from "react-modal";
import "../styles/CustomModal.css";

const CustomModal = ({ isOpen, onRequestClose, post }) => {
  const closeModal = () => {
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel='Post Details'
      className='modal-content'
      overlayClassName='modal-overlay'>
      <button className='modal-close-button' onClick={closeModal}>
        X
      </button>
      <h2>Post</h2>
      <p>{post?.title}</p>
    </Modal>
  );
};

export default CustomModal;
