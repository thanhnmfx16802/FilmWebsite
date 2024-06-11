import React from "react";
import { useState, useEffect } from "react";
import "./Banner.css";
import { baseUrlMovie, baseUrlImage } from "../utils/baseUrl";

const Banner = ({ fetchUrl }) => {
  const [banner, setBanner] = useState({});

  useEffect(() => {
    async function fetchDataBanner() {
      try {
        const response = await fetch(baseUrlMovie + fetchUrl);
        if (!response.ok) {
          throw new Error("Something went wrong with fetch data for banner!");
        }
        const dataBanner = await response.json();
        console.log(dataBanner);
        let randomIndex = Math.floor(Math.random() * dataBanner.results.length);
        setBanner(dataBanner.results[randomIndex]);
      } catch (err) {
        console.log(err);
      }
    }

    fetchDataBanner();
  }, [fetchUrl]);
  return (
    <div className="banner_wrapper">
      <img
        src={baseUrlImage + banner.backdrop_path}
        alt={banner.name}
        className="bannerImage"
      />
      <div className="banner_title">
        <p>{banner.name}</p>
      </div>

      <div className="banner_but_wrap">
        <button className="banner_but">Play</button>
        <button className="banner_but">My List</button>
      </div>

      <div className="banner_overview">
        <p>{banner.overview}</p>
      </div>
    </div>
  );
};

export default Banner;
