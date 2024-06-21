const jwt = require("jsonwebtoken");

function authenticationToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) next(new Error("Invalid Authentication"));

  let token;
  if (authHeader && authHeader.startsWith("Bearer")) token = authHeader.split(" ")[1];
  if (!token) {
    const error = new Error("Token is required");
    error.statusCode = 401;
    next(error)
  };

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, { algorithms: ['HS256'] }, function(err, decoded) {
    if (err) {
      const error = new Error(err.message);
      error.statusCode = 401;
      return next(error)
    }
    const user = {
      id: decoded.id,
    };
    console.log(user)
    req.user = user;
    next();
  });
}

module.exports = authenticationToken;