import React from "react";
import { NavBar } from "../../Components/NavBar";
import MovieList from "../../Components/MovieList";
import { requests } from "../../utils/requests";
import Banner from "../../Components/Banner";
import "./Browse.css";

function Browse() {
  return (
    <div className="app">
      <NavBar />
      <Banner fetchUrl={requests.fetchNetflixOriginals} />
      <MovieList
        title=""
        isOriginal={true}
        fetchUrl={requests.fetchNetflixOriginals}
      />
      <MovieList title="Xu hướng" fetchUrl={requests.fetchTrending} />
      <MovieList title="Xếp hạng cao" fetchUrl={requests.fetchTopRated} />
      <MovieList title="Hành động" fetchUrl={requests.fetchActionMovies} />
      <MovieList title="Hài" fetchUrl={requests.fetchComedyMovies} />
      <MovieList title="Kinh dị" fetchUrl={requests.fetchHorrorMovies} />
      <MovieList title="Lãng mạn" fetchUrl={requests.fetchRomanceMovies} />
      <MovieList title="Tài liệu" fetchUrl={requests.fetchDocumentaries} />
    </div>
  );
}

export default Browse;
