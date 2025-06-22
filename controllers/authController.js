import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";
// // note: es6 based approach, module import export - use extensions, e.g .js compulsory *

// // POST REGISTER
export const registerController = async (req, res) => {
  // // we get req, and res as this is callback function *
  // // 2 arguments, req(request) & res(resonse)
  // // registerController is callback because it is passed as 2nd argument, router.post('/register', registerController) where router=express.Router();
  try {
    const { name, email, password, phone, address, role } = req.body;

    // validations (it can be skipped(& use directly in frontend), or use in both frontend & backend for more reliability)
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone no. is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }

    // check user
    // findOne (method) to find only one, conditions in object
    // we have same key:value pair, so instead of email:email, email only
    const existingUser = await userModel.findOne({ email });

    // existing user (we not let create multiple account using same E-mail)
    if (existingUser) {
      return res.status(200).send({
        success: false,
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

// // POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    // // due to security reasons, do not directly add either that password is wrong, or email wrong
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    // decrypt the MongoDB stored hashed/encrypted password
    // check user
    const user = await userModel.findOne({ email });
    if (!user) {
      // // if not returned whether user found or not, CODE CONTINUES TO RUN
      return res.status(404).send({
        success: false,
        message: "Email is not registered",
      });
    }
    // decrypt using comparePassword utility/helper function
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid password",
      });
    }
    // json web token
    // token - using sign method 🙏
    // await has no effect below, but yet preserved, 🤷‍♂️
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // send the user elements as response (except password) && token
    res.status(200).send({
      success: true,
      message: "Login successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

// // test controller
export const testController = async (req, res) => {
  try {
    // will console message in nodeJS environment cli
    console.log("protected route");
    // but for restapi client response
    res.send("Protected route (t)");
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};
