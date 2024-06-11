import React from "react";
import { useState, useEffect } from "react";
import { baseUrlMovie, baseUrlImage } from "../utils/baseUrl";
import MovieDetail from "./MovieDetail";
import "./MovieList.css";

const MovieList = ({ title, isOriginal, fetchUrl }) => {
  const [movie, setMovie] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectMovie, setSelectMovie] = useState(null);
  const [movieId, setMovieId] = useState("");
  const [urlBackdrop, setUrlBackdrop] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(baseUrlMovie + fetchUrl);
        if (!response.ok) {
          throw new Error("Something went wrong while fetching!");
        }

        const data = await response.json();
        setMovie(data.results);
      } catch (err) {
        console.log(err);
      }
    }

    fetchData();
  }, [fetchUrl]);

  function setItems(movie) {
    setSelectMovie(movie);
    setMovieId(movie.id);
    setUrlBackdrop(movie.backdrop_path);
  }

  const handleShowMovieDetail = (movie) => {
    //Khi state selectMovie đã có giá trị (đã click trước đó) và nay click đúng vào film đó
    if (selectMovie && selectMovie.id === movie.id) {
      setIsOpen((isOpen) => !isOpen);
      setItems(movie);
    } else {
      // Lần click đầu tiên lên moive hoặc click vào movie ở thể loại khác
      setIsOpen(true);
      setItems(movie);
    }
  };

  return (
    <div className="wrapper">
      <div className="movie_title">
        <p>{title}</p>
      </div>

      <div className="wrapperImg sc">
        {movie.map((mov, i) => {
          return (
            <img
              src={
                baseUrlImage +
                `${isOriginal ? mov.poster_path : mov.backdrop_path}`
              }
              key={i}
              alt={mov.title}
              className={isOriginal ? "movieImgVertical" : "movieImg"}
              onClick={() => handleShowMovieDetail(mov)}
            />
          );
        })}
      </div>
      {isOpen && (
        <MovieDetail
          title={selectMovie.title}
          release={selectMovie.release_date}
          vote={selectMovie.vote_average}
          overview={selectMovie.overview}
          movie_id={movieId}
          url_backdrop={urlBackdrop}
        />
      )}
    </div>
  );
};

export default MovieList;
