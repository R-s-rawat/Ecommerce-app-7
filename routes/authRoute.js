import express from "express";
import {
  forgotPasswordController,
  getOrdersController,
  loginController,
  registerController,
  testController,
  updateProfileController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
// router object
const router = express.Router();

// routing ___

// REGISTER || METHOD POST
router.post("/register", registerController); // // test in restApi-client using body->raw->json

// LOGIN || METHOD POST
router.post("/login", loginController);

// Forgot password || POST
router.post("/forgot-password", forgotPasswordController);

// protected routes - using authMiddleware(*next)
// test routes (just for testing)
// if jsonwebtoken not sent along, then error so, restapi client key- authorization(in header not body) along with jsonwebtoken
// before controller, you can add multiple middlewares (whatever needed)

router.get("/test", requireSignIn, isAdmin, testController);

// another protected route auth (user or normal user)
// Normal User Auth || GET
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// another protected route auth (admin or power user)
// Power User Auth || GET
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// update auth
router.put("/profile", requireSignIn, updateProfileController);

//orders
router.get('/orders', requireSignIn, getOrdersController);

export default router;
