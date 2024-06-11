import React from "react";
import { useState } from "react";
import { baseUrlImage } from "../../utils/baseUrl";
import "./ResultList.css";
import MovieDetail from "../../Components/MovieDetail";

const ResultList = ({ result }) => {
  const [selectMovie, setSelectMovie] = useState(null);
  const [movieId, setMovieId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [urlBackdrop, setUrlBackdrop] = useState("");

  function setItems(movie) {
    setSelectMovie(movie);
    setMovieId(movie.id);
    setUrlBackdrop(movie.backdrop_path);
  }

  const handleShowMovieDetail = (movie) => {
    if (selectMovie && selectMovie.id === movie.id) {
      setIsOpen((isOpen) => !isOpen);
      setItems(movie);
    } else {
      setIsOpen(true);
      setItems(movie);
    }
  };

  return (
    <div className="resultListWrap">
      <h2>Search Result</h2>
      <div className="resultList">
        {result.map((mov, i) => (
          <img
            key={i}
            src={baseUrlImage + mov.poster_path}
            alt={mov.title}
            className="resultListMov"
            onClick={() => handleShowMovieDetail(mov)}
          />
        ))}
      </div>
      {isOpen && (
        <MovieDetail
          title={selectMovie.title ? selectMovie.title : selectMovie.name}
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

export default ResultList;
