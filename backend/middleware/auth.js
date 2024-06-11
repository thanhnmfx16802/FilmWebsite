const fs = require("fs");
const path = require("path");

const token_path = path.join(
  path.dirname(require.main.filename),
  "Data",
  "userToken.json"
);

const UserToken = {
  all: function () {
    return JSON.parse(fs.readFileSync(token_path, "utf8"));
  },
};

module.exports = (req, res, next) => {
  const token = req.query.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const foundUserId = UserToken.all().findIndex((user) => user.token === token);
  //findIndex luôn trả về -1 nếu không tìm thấy item nào trong array
  if (foundUserId === -1) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};
