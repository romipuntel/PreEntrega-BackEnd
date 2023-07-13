import mongoose from "mongoose";
import config from "./index.js";

const URI = config.URL_MONGODB_ATLAS
mongoose.connect(URI)