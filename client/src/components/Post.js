import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth-context";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { VscComment } from "react-icons/vsc";
import { MdDelete } from "react-icons/md";

function Post({
  profileImg,
  id,
  postedById,
  data,
  comments,
  image,
  name,
  likes,
  caption,
}) {
  const { user } = useAuth();
  const [updatedLikes, setUpdatedLikes] = useState(likes);
  const [newComment, setNewComment] = useState("");
  const [updatedComment, setUpdatedComment] = useState(comments);
  const navigate = useNavigate();

  const likePost = (id) => {
    fetch("https://neosocial-app.herokuapp.com/api/posts/like", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => setUpdatedLikes(data.like))
      .catch((err) => console.log(err));
  };

  const unlikePost = (id) => {
    fetch("https://neosocial-app.herokuapp.com/api/posts/unlike", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => setUpdatedLikes(data.like))
      .catch((err) => console.log(err));
  };

  const makeComment = (text, postId) => {
    fetch("https://neosocial-app.herokuapp.com/api/posts/comment", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        text,
        postId,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setUpdatedComment(result.comments);
      })
      .catch((err) => console.log(err));
  };

  const deletePost = (postId) => {
    fetch(
      `https://neosocial-app.herokuapp.com/api/posts/deletepost/${postId}`,
      {
        method: "delete",
        headers: {
          "auth-token": localStorage.getItem("jwt"),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        window.location.reload(false);
      })
      .catch((err) => console.log(err));
  };

  const clickHandler = () => {
    let url;
    if (postedById !== user._id) {
      url = `/profile/${postedById}`;
    } else {
      url = `/profile`;
    }
    navigate(url);
  };

  return (
    <>
      {data ? (
        <div className="post_main_container common">
          <div className="post_header">
            <div className="acc_pic_name">
              <img
                className="profile_img image"
                src={profileImg}
                alt="profile_img"
              ></img>
              <p style={{ cursor: "pointer" }} onClick={clickHandler}>
                {name}
              </p>
            </div>

            {user._id === postedById ? (
              <div className="dlt_btn">
                <MdDelete onClick={() => deletePost(id)} size={25} />
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="post_img">
            <img className="post_img image" src={image} alt="post_pic"></img>
          </div>

          <div className="post_icons no_select">
            <div className="left_icons">
              {updatedLikes.includes(user._id) ? (
                <AiFillHeart
                  onClick={() => {
                    unlikePost(id);
                  }}
                  className="icon"
                  size="2rem"
                  style={{ color: "#ff7474" }}
                />
              ) : (
                <AiOutlineHeart
                  onClick={() => {
                    likePost(id);
                  }}
                  className="icon"
                  size="2rem"
                />
              )}
              <VscComment className="icon" size="2rem" />
            </div>
          </div>

          <div className="post_content">
            <span>{updatedLikes.length} likes</span>
            <br />
            {caption}
            <div className={showComments ? "comment_section_full" : "comment_section"}>
              {updatedComment.map((item) => {
                return (
                  <div key={item._id}>
                    {item.postedBy ? (
                      <p>
                        <b> {item.postedBy.name}</b> {item.text}
                      </p>
                    ) : (
                      ""
                    )}
                      
                    
                  </div>
                );
              })}

            </div>
          </div>

          <div className="post_comment">
            <input
              type="text"
              onChange={(e) => {
                setNewComment(e.target.value);
              }}
              placeholder="Add comment.."
              value={newComment}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                makeComment(newComment, id);
                setNewComment("");
              }}
              className="flw_btn"
            >
              comment
            </button>
          </div>
        </div>
      ) : (
        "loading"
      )}
    </>
  );
}

export default Post;
