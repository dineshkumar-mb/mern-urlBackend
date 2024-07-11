import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true, default: shortid.generate },
  })
  
  const UrlModel = mongoose.model('Url', urlSchema)



export {UrlModel as Url}