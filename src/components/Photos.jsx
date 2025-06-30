import { toast } from "react-toastify";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPhotosAsync } from "../redux/slice/photoSlice";
import Sidebar from "./Sidebar";
import Spinner from "./Spinner";
import "../css/main.css";
import ImageUploadModal from "./modals/ImageUploadModal";
import { useNavigate } from "react-router-dom";
import uploadImagePoster from "../images/upload.svg";

const Photos = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { photos, status } = useSelector((state) => state.photos);
  const uploadPhotoBtnRef = useRef(null);

  const handleSuccessToast = (uploadStatus) => {
    if (uploadStatus === "success") {
      toast.success("Image uploaded successfully!", {
        progressClassName: "bg-success",
      });
    }

    if (uploadStatus === "error") {
      toast.error("Image upload failed!");
    }
  };

  const handlePhotoCard = (photoId) => {
    navigate(`/photo/${photoId}`);
  };

  useEffect(() => {
    if (photos.length < 1) {
      dispatch(fetchPhotosAsync());
    }
  }, []);
  return (
    <>
      <Sidebar />

      <main className="margin-start p-3">
        <div>
          <div className="d-flex justify-content-between align-items-center">
            <h4 className="text-dark-emphasis">Photos</h4>
            <div>
              <button
                className="btn btn-sm btn-outline-primary"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                disabled={status === "loading"}
                ref={uploadPhotoBtnRef}
              >
                <i className="fa-regular fa-square-plus me-2"></i>
                Upload Photo
              </button>
            </div>
          </div>
          <hr />
        </div>

        {photos.length > 0 && status !== "loading" && (
          <div className="row">
            {photos.map((photo) => (
              <div key={photo._id} className="col-6 col-sm-4 col-md-4 mb-4">
                <div
                  className="card"
                  style={{ cursor: "pointer" }}
                  onClick={() => handlePhotoCard(photo._id)}
                >
                  <img
                    src={photo.imageUrl}
                    alt={photo.name}
                    style={{ objectFit: "contain", height: "400px" }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {photos.length < 1 && status !== "loading" && (
          <div className="d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column justify-content-center align-items-center gap-1 py-5">
              <div className="pb-5 poster-container">
                <img
                  src={uploadImagePoster}
                  alt="photo upload poster"
                  className="img-fluid"
                />
              </div>
              <p className="text-muted">
                The photos you upload wiil be shown here
              </p>
              <button
                className="btn btn-primary btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
                disabled={status === "loading"}
                ref={uploadPhotoBtnRef}
              >
                Upload Photo
              </button>
            </div>
          </div>
        )}

        {status === "loading" && (
          <div className="text-center">{<Spinner />}</div>
        )}
      </main>

      <ImageUploadModal
        handleSuccessToast={handleSuccessToast}
        uploadPhotoBtnRef={uploadPhotoBtnRef}
      />
    </>
  );
};

export default Photos;
