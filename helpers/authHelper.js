import bcrypt from "bcrypt";

// receiving password as argument(args...)
export const hashPassword = async (password) => {
  try {
    // // the more the Rounds, the more the CPU usage
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    // // return is necessary, as export is also compulsory, by any approach
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

// // below password = plain password
export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
