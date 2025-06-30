import { useState, useEffect, useRef } from "react";
import { uploadImageAsync } from "../../redux/slice/photoSlice";
import { useSelector, useDispatch } from "react-redux";

const ImageUploadModal = ({ handleSuccessToast, uploadPhotoBtnRef }) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.photos);

  const modalRef = useRef(null);
  const fileInputRef = useRef(null);

  const [isUpload, setIsUpload] = useState(false);
  const [image, setImage] = useState(null);

  const handleSelectedFile = (e) => {
    const file = e.target.files[0];

    const fileTypes = ["image/jpg", "image/jpeg", "image/png", "image/gif"];
    if (!fileTypes.includes(file.type)) {
      alert("Only image file types are allowed. (jpg, jpeg, png, gif)");
      if (fileInputRef.current) {
        fileInputRef.current.value = null;
      }
      return;
    }
    const requiredSize = 5 * 1024 * 1024;
    if (file.size > requiredSize) {
      alert("File size must be below 5 MB");
      return;
    }

    setImage(file);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please choose a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    dispatch(uploadImageAsync(formData));

    setIsUpload(true);
  };

  const handleFormReset = () => {
    setImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }

    if (uploadPhotoBtnRef.current) {
      uploadPhotoBtnRef.current.focus();
    }
  };

  useEffect(() => {
    if (isUpload) {
      if (status === "success") {
        handleSuccessToast("success");
        setIsUpload(false);
      }

      if (status === "error") {
        handleSuccessToast("error");
        setIsUpload(false);
      }

      handleFormReset();
    }
  }, [status, isUpload]);

  return (
    <div
      className="modal fade"
      id="staticBackdrop"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
      ref={modalRef}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="staticBackdropLabel">
              Upload your Image
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleFormReset}
            ></button>
          </div>
          <div className="modal-body">
            <form id="imageUploadForm" onSubmit={handleUpload}>
              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">
                  Click here to select the image{" "}
                  {<span className="text-danger">*</span>}
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="formFile"
                  onChange={handleSelectedFile}
                  required
                  ref={fileInputRef}
                />
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={handleFormReset}
            >
              Close
            </button>
            <button
              type="submit"
              form="imageUploadForm"
              className="btn btn-primary"
              data-bs-dismiss="modal"
              disabled={!image}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUploadModal;
