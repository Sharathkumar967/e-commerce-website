import React from "react";
import "./DescriptionBox.css";

const DescriptionBox = () => {
  return (
    <div className="descriptionBox">
      <div className=" descriptionbox-navigator">
        <div className="descriptionBox-nav-box">Description</div>
        <div className="descriptionBox-nav-box fade">Reviews (122)</div>
      </div>
      <div className="description-description">
        <p>
          Amazon.com, Inc., doing business as Amazon, is an American
          multinational technology company, engaged in e-commerce, cloud
          computing, online advertising, digital streaming, and artificial
          intelligence.
        </p>
      </div>
    </div>
  );
};

export default DescriptionBox;
