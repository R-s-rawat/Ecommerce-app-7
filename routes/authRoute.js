import express from 'express';
import {registerController} from '../controllers/authController.js';

// router object 
const router = express.Router();

// routing

// REGISTER || METHOD POST
router.post('/register', registerController) // // test in restApi-client using body->raw->json

export default router;