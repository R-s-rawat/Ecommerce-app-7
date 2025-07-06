import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

// // protect routes using token
// // Protected Routes (token-based)

// // NEXT keyword _to validate authenticate user && continue code execution (next-keyword in middlewares)
export const requireSignIn = async (req, res, next) => {
  try {
    const rawToken = req.headers.authorization;

    if (!rawToken) {
      return res.status(401).send("No token provided");
    }

    // Extract token (remove "Bearer " if present)
    const token = rawToken.startsWith("Bearer ")
      ? rawToken.split(" ")[1]
      : rawToken;

    const decode = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    console.log("RequireSignIn Error:", error);
    res.status(401).send("Error in Require sign-in middleware");
  }
};

// admin access
// // (based on role(default__0=user(from dashboard, can be changed)))
export const isAdmin = async (req, res, next) => {
  try {
    // as we passed user(in body-raw-json) during registration, which we get during login(in response)
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      // pass object with success-key along with value:true/false, to send method
      return res.status(401).send({
        success: false,
        message: "UnAuthorized access",
      });
    } else {
      // admin can access
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middleware",
    });
  }
};
