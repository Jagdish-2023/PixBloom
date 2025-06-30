const DeleteAlbumModal = ({ deleteAlbumLink, handleDeleteAlbum }) => {
  const handleModalClose = () => {
    if (deleteAlbumLink.current) {
      deleteAlbumLink.current.focus();
    }
  };

  return (
    <div
      className="modal fade"
      id="deleteAlbumModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleModalClose}
            ></button>
          </div>
          <div className="modal-body">
            <h6>Are you sure want to delete the album?</h6>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={handleModalClose}
            >
              No
            </button>
            <button
              type="button"
              className="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={() => handleDeleteAlbum()}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAlbumModal;
