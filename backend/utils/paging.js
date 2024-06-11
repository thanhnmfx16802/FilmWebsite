module.exports = (movies, page, cb) => {
  const totalPage = Math.ceil(movies.length / 20);
  const resultInPage = movies.slice((page - 1) * 20, page * 20);
  cb(resultInPage, totalPage);
};
