const router = require('express').Router()
const verify = require('./verifyToken')
const Post = require('../model/Post')
const User = require('../model/User')

router.get("/allpost",verify, (req,res) => {
  Post.find()
  .populate("postedBy","_id pic name")
  .populate("comments.postedBy", "_id name")
  .then(posts => {
    res.json({posts})
  })
  .catch(err => {
    console.log(err);
  })
})

router.get("/getsubpost",verify, (req,res) => {
  // if posted by user is in my following list
  User.findOne({_id: req.user._id})
  .then((user)=>{
    Post.find({postedBy:{$in:user.following}})
    .populate("postedBy","_id name pic")
    .populate("comments.postedBy", "_id name")
    .then(posts => {
      res.json({posts})
    })
    .catch(err => {
      console.log(err);
    })
    
})})

router.post("/createpost", verify, async(req, res) => {
  const {caption, image} = req.body;
  if(!caption){
    return res.status(422).json({error:"Please add caption"})
  }
  if(!image){
    return res.status(422).json({error:"Please select an image"})
  }


  const post = new Post({
    caption,
    image,
    postedBy: req.user
  })

  try{
    const postUploaded = await post.save();
    res.json({message:"Post uploaded successfully", postUploaded})
    
  }catch(err){
    console.log(err)
    res.status(400).json(err)
  }
})

router.get("/mypost", verify,(req, res) => {
   Post.find({postedBy:req.user})
  .populate("postedBy", "_id name")
  .then(myPost => {
    res.json({myPost})
  })
  .catch(err => {
    console.log(err);
  })
})


router.put("/like", verify, (req,res) => {
  Post.findByIdAndUpdate(req.body.postId,{
    $push:{like: req.user._id}
  },{
    new: true
  }).exec((err,result) => {
    if(err){
      return res.status(422).json({error: err})
    }else{
      return res.json(result)
    }
  })
})

router.put("/unlike", verify, (req,res) => {
  Post.findByIdAndUpdate(req.body.postId,{
    $pull:{like: req.user._id}
  },{
    new: true
  }).exec((err,result) => {
    if(err){
      return res.status(422).json({error: err})
    }else{
      return res.json(result)
    }
  })
})

router.put("/comment", verify, (req,res) => {
  const comment = {
    text: req.body.text,
    postedBy: req.user._id
  }
  Post.findByIdAndUpdate(req.body.postId,{
    $push:{comments: comment}
  },{
    new: true
  })
  .populate("comments.postedBy", "_id name")
  .populate("postedBy", "_id name")
  .exec((err,result) => {
    if(err){
      return res.status(422).json({error: err})
    }else{
      return res.json(result)
    }
  })
})

 router.delete('/deletepost/:postId', verify, (req,res) => {
  Post.findOne({_id: req.params.postId})
  .populate("postedBy", "_id")
  .exec((err, post) => {
    if(err || !post){
      return res.status(422).json({error: err})

    }
    if(post.postedBy._id.toString() === req.user._id.toString()){
      post.remove()
      .then(result => {
        res.json({message: "successfully deleted",result})
      })
      .catch(err => {
        console.log(err);
      })
    }
  })
 })

module.exports = router