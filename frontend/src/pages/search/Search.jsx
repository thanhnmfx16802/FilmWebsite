import React from "react";
import { NavBar } from "../../Components/NavBar";
import SearchForm from "./SearchForm";

import "./Search.css";

const Search = () => {
  return (
    <div className="app">
      <NavBar />
      <SearchForm />
    </div>
  );
};

export default Search;
