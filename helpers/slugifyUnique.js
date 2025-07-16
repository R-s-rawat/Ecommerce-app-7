import slugify from "slugify";
import productModel from "../models/productModel.js";

export const generateUniqueSlug = async (name) => {
  let baseSlug = slugify(name, { lower: true });
  let uniqueSlug = baseSlug;
  let counter = 1;

  while (await productModel.findOne({ slug: uniqueSlug })) {
    uniqueSlug = `${baseSlug}-${counter}`;
    counter++;
  }

  return uniqueSlug;
};
