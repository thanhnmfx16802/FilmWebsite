const Movie = require("../models/Movies");
const paging = require("../utils/paging");
//Original
exports.getOriginal = (req, res, next) => {
  let page = req.query.page; // Lấy page từ query
  //Kiểm tra có page trong query không, nếu có thì chính là page đó, nếu khoong thì page = 1
  const pageNum = page ? +page : 1;

  Movie.fetchAll((movies) => {
    const movie = [...movies];
    const movieResult = movie.filter((item) => item.media_type === "tv");
    paging(movieResult, pageNum, (movieInPage, totalPage) => {
      const data = {
        results: [...movieInPage],
        page: pageNum,
        totalPage: totalPage,
      };

      res.status(200).json(data);
    });
  });
};

//Trending
exports.getTrending = (req, res, next) => {
  let page = req.query.page; // Lấy page từ query
  //Kiểm tra có page trong query không, nếu có thì chính là page đó, nếu khoong thì page = 1
  const pageNum = page ? +page : 1;

  // Kích hoạt quá trình fetch data
  Movie.fetchAll((movies) => {
    const movie = [...movies];
    movie.sort((a, b) => b.popularity - a.popularity);
    paging(movie, pageNum, (resultTrendingInPage, totalPage) => {
      const data = {
        results: [...resultTrendingInPage],
        page: pageNum,
        totalPage: totalPage,
      };
      res.status(200).json(data); //Truyền dữ liệu đã fetch vào view (frontend)
    });
  });
};

// top-rate
exports.getTopRate = (req, res, next) => {
  let page = req.query.page; // Lấy page từ query
  const pageNum = page ? +page : 1;

  Movie.fetchAll((movies) => {
    const movie = [...movies];
    movie.sort((a, b) => b.vote_average - a.vote_average);
    paging(movie, pageNum, (resultTopRateInPage, totalPage) => {
      const data = {
        results: [...resultTopRateInPage],
        page: pageNum,
        totalPage: totalPage,
      };
      res.status(200).json(data);
    });
  });
};

// discovery
exports.getDiscovery = (req, res, next) => {
  const { genreId } = req.params;
  if (!genreId || isNaN(genreId)) {
    return res.status(400).json({ message: "Not found gerne parram." });
  }

  let page = req.query.page; // Lấy page từ query
  const pageNum = page ? +page : 1;

  //genreId từ params đang là string thêm + để thành number
  const { list, genreName } = Movie.getByGenre(+genreId);

  if (!list) {
    return res.status(400).json({ message: "Not found that gerne id." });
  }
  paging(list, pageNum, (resultMovieInPage, totalPage) => {
    const data = {
      results: [...resultMovieInPage],
      page: pageNum,
      totalPage: totalPage,
      genre_name: genreName,
    };
    res.status(200).json(data);
  });
};

//Trailer
exports.getTrailer = (req, res, next) => {
  const { videoId } = req.params;
  if (!videoId || isNaN(videoId)) {
    return res.status(400).json({ message: "Not found film_id parram" });
  }
  const video = Movie.getTrailerModel(+videoId);
  if (!video) {
    return res.status(404).json({ messange: "Not found video" });
  }
  res.json({ results: video });
};

// Search
exports.getSearch = (req, res, next) => {
  let page = req.query.page; // Lấy page từ query
  const pageNum = page ? +page : 1;
  const searchWord = req.query.searchword;
  const genre = req.query.genre;
  const mediaType = req.query.mediaType;
  const language = req.query.language;
  const year = req.query.year;

  if (searchWord === "") {
    return res.status(400).json({ message: "Not found keyword parram" });
  }
  const totalSearchResult = Movie.getSearchModel(
    searchWord,
    genre,
    mediaType,
    language,
    year
  );

  paging(totalSearchResult, pageNum, (resultInPage, totalPage) => {
    const data = {
      results: [...resultInPage],
      page: pageNum,
      totalPage: totalPage,
    };
    res.status(200).json(data);
  });
};
