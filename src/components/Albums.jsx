import Sidebar from "./Sidebar";
import "../css/main.css";
import "../css/album.css";
import { useEffect, useState } from "react";
import AlbumForm from "./form-components/AlbumForm";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "./Spinner";
import { fetchAlbumsAsync } from "../redux/slice/photoSlice";
import { useNavigate } from "react-router-dom";
import albumPoster from "../images/album.svg";

const Albums = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { albums, status } = useSelector((state) => state.photos);
  const [isRenderAlbum, setIsRenderAlbum] = useState(true);

  const handleAlbumsRadio = (e) => {
    console.log(e.target.value);
  };

  const handleCreateAlbum = () => {
    setIsRenderAlbum(false);
  };

  const toggleRenderState = () => {
    setIsRenderAlbum(true);
  };

  const handleAlbumCard = (albumId) => {
    navigate(`/albums/${albumId}`);
  };

  useEffect(() => {
    dispatch(fetchAlbumsAsync());
  }, [dispatch]);
  return (
    <>
      {isRenderAlbum && (
        <>
          <Sidebar />
          <main className="margin-start p-3">
            <div>
              <div className="d-flex justify-content-between align-items-center">
                <h4 className="text-dark-emphasis">Albums</h4>
                {albums.length > 0 && (
                  <div>
                    {status !== "loading" && (
                      <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={handleCreateAlbum}
                      >
                        <i className="fa-solid fa-folder-plus pe-1"></i>
                        Create Album
                      </button>
                    )}
                  </div>
                )}
              </div>
              <hr />
            </div>

            {status === "loading" && albums.length < 1 && (
              <div className="text-center"> {<Spinner />} </div>
            )}

            <div className="d-flex gap-2">
              <input
                type="radio"
                className="btn-check"
                name="album-options"
                id="all-albums"
                autoComplete="off"
                value="all"
                onChange={handleAlbumsRadio}
              />
              <label
                className="btn btn-sm btn-outline-secondary"
                htmlFor="all-albums"
              >
                All
              </label>

              <input
                type="radio"
                className="btn-check"
                name="album-options"
                id="my-albums"
                autoComplete="off"
                value="my"
                onChange={handleAlbumsRadio}
              />
              <label
                className="btn btn-sm btn-outline-secondary"
                htmlFor="my-albums"
              >
                My Albums
              </label>

              <input
                type="radio"
                className="btn-check"
                name="album-options"
                id="shared-albums"
                autoComplete="off"
                value="shared"
                onChange={handleAlbumsRadio}
              />
              <label
                className="btn btn-sm btn-outline-secondary"
                htmlFor="shared-albums"
              >
                Shared with me
              </label>
            </div>

            {albums.length < 1 && status !== "loading" && (
              <div className="d-flex justify-content-center align-items-center">
                <div className="d-flex flex-column justify-content-center align-items-center gap-1 py-5">
                  <div className="pb-5 poster-container">
                    <img
                      src={albumPoster}
                      alt="album poster"
                      className="img-fluid"
                    />
                  </div>
                  <p className="text-muted">
                    The albums you create are shown here
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={handleCreateAlbum}
                  >
                    Create Album
                  </button>
                </div>
              </div>
            )}

            {albums.length > 0 && (
              <div className="row py-4">
                {albums.map((album) => (
                  <div key={album._id} className="col-md-3 mb-3">
                    <div
                      className="card"
                      style={{ cursor: "pointer", height: "300px" }}
                      onClick={() => handleAlbumCard(album._id)}
                    >
                      <img
                        src={
                          album?.coverImage
                            ? album.coverImage?.imageUrl
                            : `https://placehold.co/300?text=${album.name}`
                        }
                        alt={`${album.name}`}
                        className={`card-img-top object-fit-cover`}
                        style={{ height: "240px" }}
                      />

                      <div className="card-body">
                        <h6 className="card-title">{album.name}</h6>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </>
      )}

      {!isRenderAlbum && <AlbumForm toggleRenderState={toggleRenderState} />}
    </>
  );
};

export default Albums;
