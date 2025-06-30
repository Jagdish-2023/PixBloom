import "../../css/albumForm.css";
import { useDispatch, useSelector } from "react-redux";
import {
  createAlbumAsync,
  editAlbumInfoAsync,
} from "../../redux/slice/photoSlice";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const AlbumForm = ({ toggleRenderState, editAlbumInfo }) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.photos);
  const [albumName, setAlbumName] = useState(editAlbumInfo?.album?.name || "");
  const [description, setDescription] = useState(
    editAlbumInfo?.album?.description || ""
  );
  const [isCreateAlbum, setIsCreateAlbum] = useState(false);
  const [isEditAlbum, setIsEditAlbum] = useState(false);

  const handleBack = () => {
    toggleRenderState();
    resetFormInputs();
    setIsCreateAlbum(false);
    setIsEditAlbum(false);
  };

  const resetFormInputs = () => {
    setAlbumName("");
    setDescription("");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (editAlbumInfo) {
      setIsCreateAlbum(false);
      setIsEditAlbum(true);
      dispatch(
        editAlbumInfoAsync({
          albumInfoToUpdate: { name: albumName, description },
          albumId: editAlbumInfo.album._id,
        })
      );
    } else {
      setIsCreateAlbum(true);
      dispatch(createAlbumAsync({ name: albumName, description }));
    }
  };

  useEffect(() => {
    if (status === "success" && isCreateAlbum) {
      toast.success("Album created successfully");
      resetFormInputs();
    }
    if (status === "success" && isEditAlbum) {
      toast.success("Album edited successfully");
      resetFormInputs();
    }
  }, [status, isCreateAlbum, isEditAlbum]);
  return (
    <div className="container 100vh">
      <div className="mt-3">
        {status !== "loading" && (
          <i
            className="fa-solid fa-arrow-left"
            onClick={handleBack}
            style={{ cursor: "pointer" }}
          ></i>
        )}
      </div>

      <div className="form-container">
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            placeholder="Add a Title"
            className="form-control custom-input"
            onChange={(e) => setAlbumName(e.target.value)}
            value={albumName}
            required
          />

          <textarea
            placeholder="Description (optional)"
            className="form-control mt-4"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            rows="5"
          ></textarea>

          <button
            className="btn btn-outline-primary mt-4"
            disabled={status === "loading" || (!albumName && !description)}
          >
            {editAlbumInfo?.album?.name ? "Update" : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AlbumForm;
