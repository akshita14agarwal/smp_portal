import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    // Now you can verify the token using jwt
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Token verification failed" });
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
