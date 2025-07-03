import axios from "axios";
import { backendUrl } from "../../utils/fetchApi";

const LogoutUserModal = ({ logoutBtnRef }) => {
  const handleCancelLogout = () => {
    if (logoutBtnRef.current) {
      logoutBtnRef.current.focus();
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${backendUrl}/auth/logout`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        window.location.href = "/login";
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div
      className="modal fade"
      id="logoutUserModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <h6>Are you sure want to Logout?</h6>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={handleCancelLogout}
            >
              No
            </button>
            <button
              className="btn btn-danger"
              data-bs-dismiss="modal"
              onClick={handleLogout}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutUserModal;
