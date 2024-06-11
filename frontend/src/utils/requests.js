// export const API_KEY = "e3a0c5c5be5dc9dbf84a1eb00521dbdb";
export const token = "RYoOcWM4JW";

export const requests = {
  fetchTrending: `/movies/trending?token=${token}`,
  fetchNetflixOriginals: `/movies/original?token=${token}`,
  fetchTopRated: `/movies/top-rate?token=${token}`,
  fetchActionMovies: `/movies/discover/28?token=${token}`,
  fetchComedyMovies: `/movies/discover/35?token=${token}`,
  fetchHorrorMovies: `/movies/discover/27?token=${token}`,
  fetchRomanceMovies: `/movies/discover/10749?token=${token}`,
  fetchDocumentaries: `/movies/discover/99?token=${token}`,
};
