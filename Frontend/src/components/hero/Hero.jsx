import React from "react";
import "./Hero.css";
import hand_icon from "../Assets/hand_icon.png";
import arrow_icon from "../Assets/arrow.png";
import hero_img from "../Assets/hero_image.png";

const Hero = ({ latestCollectionRef }) => {
  const scrollToLatestCollection = () => {
    if (latestCollectionRef.current) {
      latestCollectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="hero">
      <div className="hero-content">
        <div className="hero-left">
          <h2>NEW ARRIVALS ONLY</h2>
          <div>
            <div className="hero-hand-icon">
              <p>new</p>
              <img src={hand_icon} alt="" />
            </div>
            <p>Collection</p>
            <p>for everyone</p>
          </div>
          <div className="hero-latest-btn" onClick={scrollToLatestCollection}>
            <div>Latest Collection</div>
            <img src={arrow_icon} alt="" />
          </div>
        </div>
        <div className="hero-right">
          <img src={hero_img} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
