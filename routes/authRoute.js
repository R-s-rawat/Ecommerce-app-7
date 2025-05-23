import express from 'express';
import {loginController, registerController} from '../controllers/authController.js';

// router object 
const router = express.Router();

// routing ___

// REGISTER || METHOD POST
router.post('/register', registerController) // // test in restApi-client using body->raw->json

// LOGIN || METHOD POST
router.post('/login', loginController)

export default router;