import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  const onClick = (e: React.SyntheticEvent) => {
    navigate("/");
  };
  return (
    <div className="Landing__showcase">
      <div id="myModal" className="modal-login" style={{ display: "block" }}>
        <div className="modal-content ">
          <h1 className="all-center lead m-1">Page Not Found 404</h1>
          <button className="btn btn-outline btn-block" value="" onClick={onClick}>
            Go To Main Page
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
