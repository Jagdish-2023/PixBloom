import { useEffect, useState, useRef } from "react";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import BackNavigateBtn from "./BackNavigateBtn";
import "../css/main.css";
import "../css/album.css";
import {
  deleteAlbumAsync,
  fetchAlbumAsync,
  removePhotosFromAlbumAsync,
} from "../redux/slice/photoSlice";
import SelectImagesModal from "./modals/SelectImagesModal";
import DeleteAlbumModal from "./modals/DeleteAlbumModal";
import AlbumForm from "./form-components/AlbumForm";
import { toast } from "react-toastify";

const AlbumDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { album } = useSelector((state) => state.photos);
  const { albumId } = useParams();
  const addPhotosBtn = useRef(null);
  const deleteAlbumLink = useRef(null);
  const [isEditAlbum, setIsEditAlbum] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  const handleEditAlbum = () => {
    setIsEditAlbum(true);
  };

  const handleDeleteAlbum = () => {
    dispatch(deleteAlbumAsync(albumId));
    navigate("/albums");
    toast.success("Album deleted successfully");
  };

  const toggleRenderState = () => {
    setIsEditAlbum(false);
  };

  const handlePhotoCheckbox = (isChecked, photoId) => {
    setSelectedCheckboxes((prev) => {
      if (isChecked) {
        return [...prev, photoId];
      } else {
        return prev.filter((id) => id !== photoId);
      }
    });
  };

  const handlePhotosRemove = () => {
    if (selectedCheckboxes.length > 0) {
      dispatch(
        removePhotosFromAlbumAsync({ albumId, photosIdArr: selectedCheckboxes })
      );
    }
  };

  useEffect(() => {
    dispatch(fetchAlbumAsync(albumId));
  }, [albumId]);
  return (
    <>
      {!isEditAlbum && (
        <main className={album?.photos.length < 1 ? "vh-100" : ""}>
          <div className="bg-light py-2">
            <div className="d-flex justify-content-between align-items-center px-4">
              <BackNavigateBtn />

              <div className="d-flex justify-content-between align-items-center">
                <button
                  className="btn btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#selectImagesModalFullScreen"
                  ref={addPhotosBtn}
                >
                  <img
                    width="24"
                    height="24"
                    src="https://img.icons8.com/material-outlined/24/add-image.png"
                    alt="add-image"
                  />
                </button>

                <div className="dropdown">
                  <button
                    className="btn btn-sm"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <i
                      className="fa-solid fa-ellipsis-vertical"
                      style={{ fontSize: "20px" }}
                    ></i>
                  </button>
                  <ul className="dropdown-menu">
                    {selectedCheckboxes.length < 1 ? (
                      <>
                        <li>
                          <Link
                            className="dropdown-item"
                            onClick={handleEditAlbum}
                          >
                            Edit album
                          </Link>
                        </li>
                        <li>
                          <Link
                            className="dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#deleteAlbumModal"
                            ref={deleteAlbumLink}
                          >
                            Delete album
                          </Link>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <Link
                            onClick={handlePhotosRemove}
                            className="dropdown-item"
                          >
                            Remove from album
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4 mt-3">
            <h4>{album?.album?.name}</h4>
            <p>{album?.album?.description}</p>
          </div>

          {album?.photos.length < 1 && (
            <div className="text-center px-4 photo-container">
              <p className="text-muted">No photos added yet</p>
              <button
                className="btn btn-outline-primary btn-lg"
                data-bs-toggle="modal"
                data-bs-target="#selectImagesModalFullScreen"
                ref={addPhotosBtn}
              >
                Add Photos
              </button>
            </div>
          )}
          {album?.photos.length > 0 && (
            <div className="mt-5">
              <div className="row px-4 m-0">
                {album.photos.map((photo) => (
                  <div className="col-md-3 mb-3" key={photo._id}>
                    <div
                      className="card"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate(`/albums/${albumId}/photo/${photo._id}`)
                      }
                    >
                      <div className="p-2 position-absolute">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`noLabelCheckbox-${photo.name}`}
                          value=""
                          aria-label="no label checkbox"
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) =>
                            handlePhotoCheckbox(e.target.checked, photo._id)
                          }
                        />
                      </div>
                      <img
                        src={photo.imageUrl}
                        alt={photo.name}
                        className="card-img-top object-fit-contain"
                        style={{ height: "300px" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      )}
      {isEditAlbum && (
        <AlbumForm
          toggleRenderState={toggleRenderState}
          editAlbumInfo={album}
        />
      )}
      {albumId && (
        <SelectImagesModal albumId={albumId} addPhotosBtn={addPhotosBtn} />
      )}

      <DeleteAlbumModal
        deleteAlbumLink={deleteAlbumLink}
        handleDeleteAlbum={handleDeleteAlbum}
      />
    </>
  );
};

export default AlbumDetails;
