import React from "react";
import github from "../assets/github.png";
import portfolio from "../assets/portfolio.png";

export default function LinkIcons() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        height: "5vh",
      }}
    >
      <a href="https://github.com/Zuhu162/screenshot_scraper" target="_blank">
        <img style={{ width: "30px", marginRight: "10px" }} src={github} />
      </a>
      <a href="https://zuhu162.github.io/portfolio/" target="_blank">
        <img style={{ width: "30px" }} src={portfolio} />
      </a>
    </div>
  );
}
