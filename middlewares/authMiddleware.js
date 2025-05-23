import JWT from "jsonwebtoken";

// // protect routes using token
// // Protected Routes (token-based)

// // NEXT keyword _to validate authenticate user && continue code execution (next-keyword in middlewares)
export const requireSignIn = async (req, res, next) => {
  try {
    // through this middleware, we can protect routes
    // JWT verify method takes 2 args.. 1st token, 2nd token-Secret to decrypt token
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    next();
  } catch (error) {
    console.log(error);
  }
};
