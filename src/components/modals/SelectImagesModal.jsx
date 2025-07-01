import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addPhotosToAlbumAsync,
  fetchPhotosAsync,
} from "../../redux/slice/photoSlice";
import "../../css/album.css";

const SelectImagesModal = ({ albumId, addPhotosBtn }) => {
  const dispatch = useDispatch();
  const { photos } = useSelector((state) => state.photos);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [filteredPhotos, setFilteredPhotos] = useState([]);

  const handlePhotoCheckbox = (e) => {
    const { value, checked } = e.target;

    setSelectedPhotos((prev) => {
      if (checked) {
        return [...prev, value];
      } else {
        return prev.filter((photoId) => photoId !== value);
      }
    });
  };

  const handleResetInputs = () => {
    setSelectedPhotos([]);
    if (addPhotosBtn.current) {
      addPhotosBtn.current.focus();
    }
  };

  const handlePhotosSelectSubmit = () => {
    dispatch(addPhotosToAlbumAsync({ albumId, photosIdArr: selectedPhotos }));
    handleResetInputs();
  };

  useEffect(() => {
    if (photos.length > 0) {
      const updatedPhotos = photos.filter((photo) => photo.album !== albumId);
      setFilteredPhotos(updatedPhotos);
      return;
    }
    if (photos.length < 1) {
      dispatch(fetchPhotosAsync());
    }
  }, [photos]);
  return (
    <div
      className="modal fade"
      id="selectImagesModalFullScreen"
      tabIndex="-1"
      aria-labelledby="modalFullScreenLabel"
    >
      <div className="modal-dialog modal-fullscreen modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-4" id="modalFullScreenLabel">
              Add to album
            </h1>
            <button
              className="btn-close"
              type="button"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleResetInputs}
            ></button>
          </div>
          <div className="modal-body">
            {filteredPhotos.length > 0 && (
              <div className="row">
                {filteredPhotos.map((photo) => (
                  <div
                    key={photo._id}
                    className="col-md-3 mb-3 position-relative"
                  >
                    <div className="card">
                      <div className="form-check p-0">
                        <div
                          style={{
                            position: "absolute",
                            margin: "0.5rem",
                          }}
                        >
                          <input
                            className="form-check-input m-0"
                            type="checkbox"
                            id={photo._id}
                            value={photo._id}
                            aria-label="..."
                            onChange={handlePhotoCheckbox}
                            checked={selectedPhotos.includes(photo._id)}
                          />
                        </div>

                        <label
                          htmlFor={photo._id}
                          className="form-check-label w-100"
                          style={{ cursor: "pointer" }}
                        >
                          <img
                            src={photo.imageUrl}
                            alt={photo.name}
                            className="card-img-top modal-card-img"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {filteredPhotos.length < 1 && (
              <div>
                <p className="text-muted">Please upload some photos first.</p>
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-primary"
              type="button"
              data-bs-dismiss="modal"
              onClick={handlePhotosSelectSubmit}
              disabled={selectedPhotos.length < 1 || filteredPhotos.length < 1}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectImagesModal;
