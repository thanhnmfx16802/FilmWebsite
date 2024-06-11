import React from "react";
import { useState, useEffect } from "react";
import { baseUrlImage } from "../utils/baseUrl";
import { token } from "../utils/requests";
import YouTube from "react-youtube";

import "./MovieDetail.css";

const opts = {
  height: "400",
  width: "100%",
  playerVars: {
    autoplay: 0,
  },
};

const MovieDetail = ({
  title,
  release,
  vote,
  overview,
  movie_id,
  url_backdrop,
}) => {
  const [keyMovie, setKeyMovie] = useState("");
  useEffect(() => {
    async function fetchDetailMovie() {
      try {
        const response = await fetch(
          `http://localhost:5000/movies/video/${movie_id}?token=${token}`
        );

        if (!response.ok) {
          throw new Error("Something went wrong while fetching detail video!");
        }
        const data = await response.json();
        console.log(data);
        // filter array ma movie co type la Trailer
        const movie_Trailer = data.results.filter(
          (mov) => mov.site === "YouTube" && mov.type === "Trailer"
        );
        // filter array ma movie co type la Teaser
        const movie_Teaser = data.results.filter(
          (mov) => mov.site === "YouTube" && mov.type === "Teaser"
        );
        // Nếu movie có type:trailer thì ưu tiên dùng, còn không sẽ dùng type Teaser, lấy phần tử đầu để hiển thị khi có nhiều phần tử
        if (movie_Trailer.length !== 0) {
          setKeyMovie(movie_Trailer[0].key);
        } else if (movie_Teaser.length !== 0) {
          setKeyMovie(movie_Teaser[0].key);
        } else {
          setKeyMovie(null);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchDetailMovie();
  }, [movie_id]);
  return (
    <div className="movieDetailWrap">
      <div className="movieDetailInfo">
        <h2>{title}</h2>
        <hr />
        <p className="movieDetailDate">Release Date: {release}</p>
        <p className="movieDetailVote">Vote: {vote}/ 10</p>
        <p className="movieDetailOver">{overview}</p>
      </div>
      <div className="movieDetailYoutube">
        {/* Khi có dữ liệu video thì hiện, còn không hiện ảnh backdrop */}
        {keyMovie ? (
          <YouTube videoId={keyMovie} opts={opts} />
        ) : (
          <img
            src={baseUrlImage + url_backdrop}
            className="movieDetailImgBackdrop"
            alt={title}
          />
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
