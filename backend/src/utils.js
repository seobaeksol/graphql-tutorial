const jwt = require("jsonwebtoken");
const APP_SECRET = "GraphQl-IS-AW3SOME";

function getUserId(context) {
  const Authorization = context.request.get("Authorization");

  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const { userId } = jwt.verify(token, APP_SECRET);
    return userId;
  }

  throw new Error("Not authenicated");
}

module.exports = {
  APP_SECRET,
  getUserId
};
