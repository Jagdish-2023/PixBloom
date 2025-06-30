import "../css/main.css";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;
  return (
    <>
      {/* Mobile Navbar (shows hamburger button) */}
      <nav className="navbar navbar-light bg-light d-md-none">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/photos">
            KaviosPix
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasSidebar"
            aria-controls="offcanvasSidebar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>

      {/* Sidebar for md+ screens (always visible) */}
      <div
        className="d-none d-md-block sidebar-bg position-fixed vh-100 p-3"
        style={{ width: "250px" }}
      >
        <h5 className="mb-4">PicBloom</h5>
        <nav className="navbar-nav flex-column mt-5">
          <NavLink
            className={`nav-link ps-3 ${
              path === "/photos" && "nav-link-active"
            }`}
            to="/photos"
          >
            <i className="fa-regular fa-image me-2"></i>
            Photos
          </NavLink>
          <NavLink
            className={`nav-link ps-3 ${
              path === "/albums" && "nav-link-active"
            }`}
            to="/albums"
          >
            <i className="fa-solid fa-book me-2"></i>
            Albums
          </NavLink>
          <NavLink
            className={`nav-link ps-3 ${
              path === "/favourites" && "nav-link-active"
            }`}
            to="/favourites"
          >
            <i className="fa-regular fa-star me-1"></i>
            Favourites
          </NavLink>
          <NavLink
            className={`nav-link ps-3 ${
              path === "/profile" && "nav-link-active"
            }`}
            to="/profile"
          >
            <i className="fa-regular fa-user me-2"></i>
            Profile
          </NavLink>
        </nav>
      </div>

      {/* Offcanvas for small screens */}
      <div
        className="offcanvas offcanvas-start d-md-none"
        tabIndex="-1"
        id="offcanvasSidebar"
        aria-labelledby="offcanvasSidebarLabel"
        style={{ width: "300px" }}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasSidebarLabel">
            PicBloom
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <nav className="navbar-nav flex-column">
            <NavLink
              className={`nav-link ps-3 ${
                path === "/photos" && "nav-link-active"
              }`}
              to="/photos"
              data-bs-dismiss="offcanvas"
            >
              <i className="fa-regular fa-image me-2"></i>
              Photos
            </NavLink>
            <NavLink
              className={`nav-link ps-3 ${
                path === "/albums" && "nav-link-active"
              }`}
              to="/albums"
              data-bs-dismiss="offcanvas"
            >
              <i className="fa-solid fa-book me-2"></i>
              Albums
            </NavLink>
            <NavLink
              className={`nav-link ps-3 ${
                path === "/favourites" && "nav-link-active"
              }`}
              to="/favourites"
              data-bs-dismiss="offcanvas"
            >
              <i className="fa-regular fa-star me-1"></i>
              Favourites
            </NavLink>
            <NavLink
              className={`nav-link ps-3 ${
                path === "/profile" && "nav-link-active"
              }`}
              to="/profile"
              data-bs-dismiss="offcanvas"
            >
              <i className="fa-regular fa-user me-2"></i>
              Profile
            </NavLink>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
