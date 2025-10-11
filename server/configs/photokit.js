import Imagekit from "imagekit";
import dotenv from "dotenv";
dotenv.config();

const photokit = new Imagekit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: IMAGEKIT_URL_ENDPOINT,
});

export default photokit;
