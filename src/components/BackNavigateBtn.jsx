import { useNavigate } from "react-router-dom";

const BackNavigateBtn = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (window.history.state && window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/"); //fallback
    }
  };
  return (
    <i
      className="fa-solid fa-arrow-left fs-5"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    ></i>
  );
};

export default BackNavigateBtn;
