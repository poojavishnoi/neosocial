const router = require("express").Router();
const verify = require("./verifyToken");
const Post = require("../model/Post");
const User = require("../model/User");

router.get("/profile/:id", verify, (req, res) => {
  User.findOne({ _id: req.params.id })
    .select("-password")
    .then((user) => {
      Post.find({ postedBy: req.params.id })
        .populate("postedBy", "_id name")
        .exec((err, posts) => {
          if (err) {
            return res.status(422).json({ error: err });
          }
          res.json({ user, posts });
        });
    })
    .catch((err) => {
      return res.status(404).json({ error: "User not found." });
    });
});

router.put("/follow", verify, (req, res) => {
  User.findByIdAndUpdate(
    req.body.followId,
    {
      $push: { follower: req.user._id },
    },
    {
      new: true,
    },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      User.findByIdAndUpdate(
        req.user._id,
        {
          $push: { following: req.body.followId },
        },
        {
          new: true,
        }).select("-password").then((result) => {
            res.json(result);
          })
          .catch((err) => {
            return res.status(422).json({ error: err });
          })
      
    }
  );
});

router.put("/unfollow", verify, (req, res) => {
  User.findByIdAndUpdate(
    req.body.unfollowId,
    {
      $pull: { follower: req.user._id },
    },
    {
      new: true,
    },
    (err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      }
      User.findByIdAndUpdate(
        req.user._id,
        {
          $pull: { following: req.body.unfollowId },
        },
        {
          new: true,
        }).select(
          "-password"
        )
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            return res.status(422).json({ error: err });
          })
      
    }
  );
});

router.put("/updatepic",verify, (req,res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {pic: req.body.pic}
    },
    {
      new: true
    },
    (err, result) => {
      if(err){
        return res.status(422).json({error: "pic cannot post"})
      }
      res.json(result)
    } 
    )
})

module.exports = router;
