import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import shortid from 'shortid'
import cookieParser from 'cookie-parser'
dotenv.config()
import { UserRouter } from './routes/user.js'

const app = express()
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}))
app.use(cookieParser())
app.use('/auth', UserRouter)

mongoose.connect(process.env.MONGODB_URI),
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, default: shortid.generate },
});

const Url = mongoose.model('Url', urlSchema);

app.post('/shorten', async (req, res) => {
  const { originalUrl } = req.body;
  const shortUrl = shortid.generate();

  const newUrl = new Url({ originalUrl, shortUrl });
  await newUrl.save();

  res.json(newUrl);
});

app.get('/:shortUrl', async (req, res) => {
  const { shortUrl } = req.params;
  const url = await Url.findOne({ shortUrl });

  if (url) {
    return res.redirect(url.originalUrl);
  } else {
    return res.status(404).json('URL not found');
  }
});

app.listen(process.env.PORT, () => {
    console.log("Server is Running on port no 3000 sucesfully")
})





