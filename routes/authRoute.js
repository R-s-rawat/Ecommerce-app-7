import express from 'express';
import {loginController, registerController, testController} from '../controllers/authController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
// router object 
const router = express.Router();

// routing ___

// REGISTER || METHOD POST
router.post('/register', registerController) // // test in restApi-client using body->raw->json

// LOGIN || METHOD POST
router.post('/login', loginController)

// protected routes - using authMiddleware(*next) 
// test routes (just for testing)
// if jsonwebtoken not sent along, then error so, restapi client key- authorization(in header not body) along with jsonwebtoken
// before controller, you can add multiple middlewares (whatever needed)
router.get('/test', requireSignIn, isAdmin, testController)

export default router;