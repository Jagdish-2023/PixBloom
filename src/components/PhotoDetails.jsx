import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deletePhotoAsync,
  fetchPhotoDetailsAsync,
  markPhotoFavouriteAsync,
} from "../redux/slice/photoSlice";
import "../css/photoDetails.css";
import { useNavigate } from "react-router-dom";
import BackNavigateBtn from "./BackNavigateBtn";

const calculatePhotoSize = (size) => {
  if (size > 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  } else {
    return `${(size / 1024).toFixed(2)} KB`;
  }
};

const getUploadedDateAndTime = (dateObj) => {
  const uploadDate = new Date(dateObj);

  return `${uploadDate}`;
};

const PhotoDetails = () => {
  const { photoId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { photoDetails } = useSelector((state) => state.photos);

  const handlePhotoDelete = () => {
    dispatch(deletePhotoAsync(photoDetails.cloudinaryImageId));
    navigate("/photos");
  };

  const handleFavourite = () => {
    dispatch(
      markPhotoFavouriteAsync({
        photoId,
        isFavourite: !photoDetails.isFavourite,
      })
    );
  };
  useEffect(() => {
    dispatch(fetchPhotoDetailsAsync(photoId));
  }, [dispatch, photoId]);
  return (
    <>
      {photoDetails && (
        <div className="vh-100">
          <div className="h-100 bg-dark position-relative mr">
            <div className="w-100 h-100">
              <div className="d-flex justify-content-between align-items-center px-3 py-2 text-white top-bar">
                <BackNavigateBtn />

                <div className="d-flex justify-content-between align-items-center gap-3">
                  <i
                    className={`${
                      photoDetails.isFavourite ? "fa-solid" : "fa-regular"
                    } fa-star fs-5`}
                    style={{ cursor: "pointer" }}
                    onClick={handleFavourite}
                  ></i>
                  <i
                    className="bi bi-trash fs-5 text-light"
                    style={{ cursor: "pointer" }}
                    onClick={handlePhotoDelete}
                  ></i>
                </div>
              </div>
              <img
                src={photoDetails.imageUrl}
                alt={photoDetails.name}
                className="w-100 h-100 img-fit"
              />
            </div>
          </div>

          <div className="h-100 position-fixed p-4 photo-sidebar-info">
            <h5>Info</h5>
            <div className="d-flex flex-column gap-3 mt-5">
              <div>
                <strong>Name:</strong>
                <p>{photoDetails.name}</p>
              </div>
              <div>
                <strong>Uploaded date:</strong>
                <p>{getUploadedDateAndTime(photoDetails.createdAt)}</p>
              </div>
              {photoDetails.person && (
                <div>
                  <strong>Person:</strong>
                  <p>{photoDetails.person}</p>
                </div>
              )}
              <div>
                <strong>Size:</strong>
                <p>{calculatePhotoSize(photoDetails.size)}</p>
              </div>
              {photoDetails.tags.length >= 1 && (
                <div>
                  <strong>Tags:</strong>
                  <p>{photoDetails.tags.map((tag) => `#${tag}`).join(", ")}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoDetails;
