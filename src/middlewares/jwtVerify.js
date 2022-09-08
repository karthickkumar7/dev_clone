const jwt = require("jsonwebtoken");

const jwtVerify = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ msg: "Unauthorized!" });
  try {
    const token = header.split(" ")[1];
    const user = jwt.verify(token, process.env.ACCESS);
    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ msg: "Forbidden!" });
  }
};

module.exports = jwtVerify;
