import { hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
// // note: es6 based approach, module import export - use extensions, e.g .js compulsory *

export const registerController = async (req, res) => {
  // // we get req, and res as this is callback function *
  // // 2 arguments, req(request) & res(resonse)
  // // registerController is callback because it is passed as 2nd argument, router.post('/register', registerController) where router=express.Router();
  try {
    const { name, email, password, phone, address, role } = req.body;

    // validations (it can be skipped(& use directly in frontend), or use in both frontend & backend for more reliability)
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ error: "Email is Required" });
    }
    if (!password) {
      return res.send({ error: "Password is Required" });
    }
    if (!phone) {
      return res.send({ error: "Phone no. is Required" });
    }
    if (!address) {
      return res.send({ error: "Address is Required" });
    }

    // check user
    // findOne (method) to find only one, conditions in object
    // we have same key:value pair, so instead of email:email, email only
    const existingUser = await userModel.findOne({ email });

    // existing user (we not let create multiple account using same E-mail)
    if (existingUser) {
      return res.status(200).send({
        success: true,
        message: "Already registered, Please Login",
      });
    }

    // register if not existing user
    // pass plain password to helper function
    // await is necessary, or data gets saved(or exceptions) but no resonse will be sended correctly
    const hashedPassword = await hashPassword(password);
    // save
    // pass all 5 keys defined in user-model, only password is key with value hashedPassword(key:value)
    // all spelling of keys being passed should match with user-model schema
    // // await is necessary, as password hashing will take time, or password got blank
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();

    // pass the user as response
    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

// export default {registerController};
