const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
  caption: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: "no photo"
  },
  like: [
    {
      type: ObjectId,
      ref: "User"
    }
  ],
  comments:[
    {
      text:String,
      postedBy:{
        type:ObjectId,
        ref: "User"
      }
    }
  ],
  postedBy: {
    type: ObjectId,
    ref: "User"
  }
})

module.exports = mongoose.model("Post", postSchema);