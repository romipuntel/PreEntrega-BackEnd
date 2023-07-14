import dotenv from 'dotenv'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

export default {
    mongoUrl: process.env.URL_MONGODB_ATLAS,
    port: process.env.PORT

}

export const __dirname = join(dirname(fileURLToPath(import.meta.url)) + '/..')