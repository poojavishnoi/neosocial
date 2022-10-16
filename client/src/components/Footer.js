import React from "react";
import "../style/footer.css";
import {
  AiFillGithub,
  AiFillTwitterCircle,
  AiFillLinkedin,
} from "react-icons/ai";

function Footer() {
  return (
    <div className="footer_container">
      <div>
        <h3>Made by Pooja Vishnoi</h3>
      </div>
      <div className="footer_icons">
        <a
          href="https://github.com/poojavishnoi/"
          target="_blank"
          rel="noreferrer"
        >
          <AiFillGithub className="footer_icon" size="1.5rem" />
        </a>
        <a
          href="https://www.linkedin.com/in/pooja-vishnoi-678873206/"
          target="_blank"
          rel="noreferrer"
        >
          <AiFillLinkedin className="footer_icon" size="1.5rem" />
        </a>
        <a
          href="https://twitter.com/PoojaVishnoi29"
          target="_blank"
          rel="noreferrer"
        >
          <AiFillTwitterCircle className="footer_icon" size="1.5rem" />
        </a>
      </div>
    </div>
  );
}

export default Footer;
