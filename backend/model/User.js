const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  email:{
    type: String,
    required: true,
    min:6,
    max:255
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024
  },
  following: [
    {
      type: ObjectId,
      ref: "User"
    }
  ],
  follower: [
    {
      type: ObjectId,
      ref: "User"
    }
  ],
  date: {
    type: Date,
    default: Date.now
  },
  pic: {
    type: String,
    default: "https://res.cloudinary.com/poojavishnoi/image/upload/v1662217338/neosocial/default_rqct30.jpg"
  }

});

module.exports = mongoose.model("User", userSchema)