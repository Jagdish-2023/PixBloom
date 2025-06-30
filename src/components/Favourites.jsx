import Sidebar from "./Sidebar";
import "../css/main.css";
import "../css/favourites.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPhotosAsync } from "../redux/slice/photoSlice";
import { useNavigate } from "react-router-dom";
import favouritePoster from "../images/favourite.png";

const Favourites = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { photos } = useSelector((state) => state.photos);
  const [favouritePhotos, setFavouritePhotos] = useState([]);

  const handleCardClick = (photoid) => {
    navigate(`/favourites/${photoid}`);
  };

  useEffect(() => {
    if (photos.length < 1) {
      dispatch(fetchPhotosAsync());
      return;
    }

    const favouritePhotos = photos.filter((photo) => photo.isFavourite);
    setFavouritePhotos(favouritePhotos);
  }, [photos]);
  return (
    <>
      <Sidebar />
      <main className="margin-start p-3">
        <div>
          <h4 className="text-dark-emphasis">Favourites</h4>
          <hr />
        </div>

        {favouritePhotos.length < 1 && (
          <div className="d-flex justify-content-center align-items-center">
            <div className="d-flex flex-column justify-content-center align-items-center gap-1 py-5">
              <div className="text-center">
                <img
                  src={favouritePoster}
                  alt="album poster"
                  className="img-fluid favourite-poster"
                />
              </div>
              <span className="fs-5 semi-bold">No favourites</span>
              <p className="text-muted">
                Photos you mark as favourite are shown here
              </p>
            </div>
          </div>
        )}

        {favouritePhotos.length > 0 && (
          <div>
            <div className="row">
              {favouritePhotos.map((photo) => (
                <div className="col-md-3 mb-4" key={photo._id}>
                  <div
                    className="card"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleCardClick(photo._id)}
                  >
                    <img
                      className="card-img-top"
                      src={photo.imageUrl}
                      alt={photo.name}
                      style={{ objectFit: "contain", height: "300px" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Favourites;
