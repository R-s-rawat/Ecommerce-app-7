import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

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
    // decrypted token should be consumed
    req.user = decode;
    next();
  } catch (error) {
    // either (invalid token) or (jwt must be provided)..
    console.log(error);
    res.send("Error in Require sign-in middleware");
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
