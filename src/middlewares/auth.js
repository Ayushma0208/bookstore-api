import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const user = jwt.verify(token, "your_secret_key");
    req.user = user;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};

export default auth;
