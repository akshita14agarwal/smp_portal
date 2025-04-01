import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(403).json({ message: "Access Denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

// Middleware to check if the user is a mentor
export const isMentor = (req, res, next) => {
  if (req.user.role !== "mentor") {
    return res.status(403).json({ message: "Only mentors can perform this action" });
  }
  next();
};

// Middleware to check if the user is a mentee
export const isMentee = (req, res, next) => {
  if (req.user.role !== "mentee") {
    return res.status(403).json({ message: "Only mentees can perform this action" });
  }
  next();
};
