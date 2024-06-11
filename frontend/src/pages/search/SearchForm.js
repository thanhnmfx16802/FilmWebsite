import React from "react";
import { useState } from "react";
import { Fragment } from "react";
import ResultList from "./ResultList";
import "./SearchForm.css";
import { token } from "../../utils/requests";

const SearchForm = () => {
  const [searchWord, setSearchWord] = useState("");
  const [searchGenre, setSearchGenre] = useState("");
  const [searchMediaType, setSearchMediaType] = useState("");
  const [searchLanguage, setSearchLanguage] = useState("");
  const [searchYear, setSearchYear] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const handleChange = (e) => {
    const searchWord = e.target.value;
    console.log(searchWord);
    setSearchWord(searchWord);
  };
  // Thêm onblur để xử lý khi click chọn đưa cả từ gợi ý thì vẫn lưu được search word vào state để không báo lỗi.
  const handleBlur = (e) => {
    const searchWord = e.target.value;
    console.log(searchWord);
    setSearchWord(searchWord);
  };

  const handleChangeGenre = (e) => {
    const searchWordGenre = e.target.value;
    console.log(searchWordGenre);
    setSearchGenre(searchWordGenre);
  };

  const handleChangeMedia = (e) => {
    const searchWordMedia = e.target.value;
    console.log(searchWordMedia);
    setSearchMediaType(searchWordMedia);
  };

  const handleChangeLanguage = (e) => {
    const searchWordLanguage = e.target.value;
    console.log(searchWordLanguage);
    setSearchLanguage(searchWordLanguage);
  };

  const handleChangeYear = (e) => {
    const searchWordYear = e.target.value;
    console.log(searchWordYear);
    setSearchYear(searchWordYear);
  };

  const handleReset = () => {
    setSearchWord("");
    setSearchGenre("");
    setSearchMediaType("");
    setSearchLanguage("");
    setSearchYear("");
    setSearchResult([]);
  };

  const handleClick = (e) => {
    e.preventDefault();
    async function searchDataResults() {
      try {
        const response = await fetch(
          `http://localhost:5000/movies/search?token=${token}&searchword=${searchWord}&genre=${searchGenre}&mediaType=${searchMediaType}&language=${searchLanguage}&year=${searchYear}`
        );

        if (!response.ok) {
          throw new Error("Something went wrong to search");
        }

        const dataSearchResutl = await response.json();

        setSearchResult(dataSearchResutl.results);
        console.log(dataSearchResutl.results);
      } catch (err) {
        console.log(err);
      }
    }
    searchDataResults();
  };

  return (
    <Fragment>
      <div className="searchFormWrap">
        <form>
          <div className="searchFormInput">
            <input
              type="text"
              name="searchForm"
              id="searchForm"
              placeholder="Type Keywords"
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <div className="search_avatar">
              <svg
                className="svg-inline--fa fa-search fa-w-16"
                fill="#ccc"
                aria-hidden="true"
                data-prefix="fas"
                data-icon="search"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
              </svg>
            </div>
          </div>

          <hr />
          <div className="search_genre">
            <label htmlFor="genre">Genre</label>
            <input
              id="genre"
              name="genre"
              type="text"
              placeholder="Enter genre to search"
              onChange={handleChangeGenre}
            />
          </div>

          <div className="search_mediaType">
            <label htmlFor="mediaType">Media Type</label>
            <select id="mediaType" onChange={handleChangeMedia}>
              <option>-- Select media type --</option>
              <option>all</option>
              <option>movie</option>
              <option>tv</option>
              <option>person</option>
            </select>
          </div>

          <div className="search_language">
            <label htmlFor="language">Language</label>
            <select id="language" onChange={handleChangeLanguage}>
              <option>-- Select language type --</option>
              <option>en</option>
              <option>ja</option>
              <option>ko</option>
            </select>
          </div>

          <div className="search_year">
            <label htmlFor="year">Year</label>
            <input
              id="year"
              name="year"
              type="text"
              placeholder="Enter a year to search"
              onChange={handleChangeYear}
            />
          </div>

          <div className="searchButton">
            <button type="reset" className="but-Reset" onClick={handleReset}>
              RESET
            </button>
            <button type="submit" className="but-Search" onClick={handleClick}>
              SEARCH
            </button>
          </div>
        </form>
      </div>
      <ResultList result={searchResult} />
    </Fragment>
  );
};

export default SearchForm;
