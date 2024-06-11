const fs = require("fs");
const path = require("path");

//movie_path
const movie_path = path.join(
  path.dirname(require.main.filename),
  "Data",
  "movieList.json"
);

const Movies = {
  all: function () {
    return JSON.parse(fs.readFileSync(movie_path, "utf8"));
  },
};

// video_path
const video_path = path.join(
  path.dirname(require.main.filename),
  "Data",
  "videoList.json"
);

const Videos = {
  all: function () {
    return JSON.parse(fs.readFileSync(video_path, "utf8"));
  },
};

//genre path
const genre_path = path.join(
  path.dirname(require.main.filename),
  "Data",
  "genreList.json"
);

const Genre = {
  all: function () {
    return JSON.parse(fs.readFileSync(genre_path, "utf8"));
  },
};

const getMoviesFromFile = (cb) => {
  fs.readFile(movie_path, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

// model
module.exports = class Movie {
  static fetchAll(cb) {
    getMoviesFromFile(cb);
  }

  static getByGenre(genreId) {
    const findGenre = Genre.all().filter((item) => item.id === genreId);
    if (findGenre.length === 0) {
      return null;
    }
    const genreName = findGenre[0].name;
    const list = Movies.all().filter((movie) =>
      movie.genre_ids.includes(genreId)
    );

    return { list: list, genreName: genreName };
  }

  static getTrailerModel(id) {
    const result = Videos.all().filter((film) => film.id === id);
    if (result.length === 0) {
      return null;
    }
    const videos = result[0].videos
      .filter(
        (video) =>
          video.official &&
          video.site === "YouTube" &&
          (video.type === "Trailer" || video.type === "Teaser")
      )
      .sort((video1, video2) =>
        video1.published_at > video2.published_at ? -1 : 1
      );
    if (videos.length === 0) {
      return null;
    }
    return videos;
  }
  // Chức năng search và phần nâng cao
  static getSearchModel(keyword, genre, mediaType, language, year) {
    // Tìm kiếm theo keyword
    const searchResult = Movies.all().filter((mov) => {
      const title = mov.title ? mov.title : mov.name;
      return (
        title.toLowerCase().includes(keyword.toLowerCase()) ||
        mov.overview.toLowerCase().includes(keyword.toLowerCase())
      );
    });
    // Nếu không điền keyword thì sẽ không tìm kiếm
    if (searchResult.length === 0) {
      return null;
    }

    // Handle: Search by genre
    const filterByGenre = (prop, value, movieList) => {
      //Không điền tìm kiếm genre thì giữ nguyên kết quả search theo keyword
      if (value === "") {
        return movieList;
      } else {
        // có điền tìm kiếm theo genre
        //trên Genre list lọc item có genre muốn tìm
        const FindGenreItemHaveValue = Genre.all().filter(
          (item) => item.name.toLowerCase() === value.toLowerCase()
        );
        // sau đó lấy id
        const GetIdFromGenreName = FindGenreItemHaveValue[0].id;
        // Dựa trên kết quả tìm từ bước trước, lấy các movie chứa id của genre muốn tìm
        const listGenreMovieFilter = movieList.filter((movie) =>
          movie[prop].includes(GetIdFromGenreName)
        );
        return listGenreMovieFilter;
      }
    };
    // gọi hàm tìm genre với tham số là: tên thuộc tính, giá trị tìm kiếm nhập vào, array kết quả có được từ bước trước (bước tìm theo keyword)
    const resultGenre = filterByGenre("genre_ids", genre, searchResult);

    // Handle: Search by Media Type
    const filterByMediaType = (prop, value, movieList) => {
      if (
        value === "" ||
        value === "all" ||
        value === "-- Select media type --"
      ) {
        return movieList;
      } else {
        // Dựa trên kết quả tìm từ bước trước, lọc ra các movie có media Type giống giá trị mediaType được chọn
        const listMediaTypeMovieFilter = movieList.filter(
          (movie) => movie[prop] === value
        );

        return listMediaTypeMovieFilter;
      }
    };
    // gọi hàm tìm mediaType với tham số: tên thuộc tính, giá trị user select, kết quả tìm kiếm genre ở bước trước.
    const resultMediaType = filterByMediaType(
      "media_type",
      mediaType,
      resultGenre
    );
    // Handle: Search by Language
    const filterByLanguage = (prop, value, movieList) => {
      if (value === "" || value === "-- Select language type --") {
        return movieList;
      } else {
        // Dựa trên kết quả tìm từ bước trước, lọc ra các movie có language giống giá trị language được chọn
        const listLanguageMovieFilter = movieList.filter(
          (movie) => movie[prop] === value
        );
        return listLanguageMovieFilter;
      }
    };
    const resultLanguage = filterByLanguage(
      "original_language",
      language,
      resultMediaType
    );
    // Handle: Search by Year
    const filterByYear = (prop, value, movieList) => {
      if (value === "") {
        return movieList;
      } else {
        const listYearMovieFilter = movieList.filter((movie) => {
          // xử lý ngày phát hành được đặt 2 tên khác nhau "release_date", "first_air_date"
          const propAvailable = !movie[prop[0]]
            ? movie[prop[1]]
            : movie[prop[0]];
          return propAvailable.split("-")[0] === value; //"2022-08-21"=> 2022
        });
        console.log(listYearMovieFilter);
        return listYearMovieFilter;
      }
    };
    const resultYear = filterByYear(
      // Xem data, thu thập đủ các tên phát hành phim, đặt vào array
      ["release_date", "first_air_date"],
      year,
      resultLanguage
    );
    return resultYear;
  }
};
