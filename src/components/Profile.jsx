import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import "../css/main.css";
import { backendUrl } from "../utils/fetchApi";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGoogleProfile = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${backendUrl}/v2/user/profile`, {
          withCredentials: true,
        });

        if (response.status === 200) {
          setUser(response.data);
          setError(null);
        }
      } catch (error) {
        if (error.status === 401 || error.status === 403) {
          window.location.href = "/login";
          return;
        }
        setError(error.message);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchGoogleProfile();
  }, []);
  return (
    <>
      <Sidebar />
      <main className="margin-start p-3">
        {loading && (
          <div className="text-center m-5">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {error && <p>{error}</p>}

        {user && (
          <div>
            <h4 className="text-dark-emphasis">My Profile</h4>
            <hr />
            <div>
              <img
                src={user.pictureUrl}
                alt="profile picture"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="mt-3">
              <p>
                <strong>Name: </strong>
                {user.name}
              </p>
              <p>
                <strong>Email: </strong>
                {user.email}
              </p>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default Profile;
