import mongoose from "mongoose";
import config from "./indexConfig.js";

const URI = config.URL_MONGODB_ATLAS
mongoose.connect(URI)
    .then(() => console.log("DB is connected"))
    .catch((error) => console.log("Error en MongoDB atlas", error))