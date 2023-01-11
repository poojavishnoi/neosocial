import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import "../style/profile.css";
import { useAuth } from "../context/auth-context";

function UserProfile() {
  const { userid } = useParams();
  const { user, dispatch } = useAuth();
  const [userData, setUserData] = useState(null);
  const [showFollow, setShowFollow] = useState(user?!user.following.includes(userid): true)

  useEffect(() => {
    fetch(`https://neosocial-backend.onrender.com/api/user/profile/${userid}`, {
      method: "get",
      headers: {
        "auth-token": localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserData(data)
      })
      .catch((err) => console.log(err));
  }, [userid]);


  const followUser = () => {
    fetch("https://neosocial-backend.onrender.com/api/user/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, follower: data.follower },
        });
        localStorage.setItem("user", JSON.stringify(data));
        setUserData((prevData) => {
          return {
            ...prevData,
            user: {
              ...prevData.user,
              follower: [...prevData.user.follower, data._id],
            },
          };
        });
      })
      .catch((err) => console.log(err));
  };

  const unFollowUser = () => {
    fetch("https://neosocial-backend.onrender.com/api/user/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        unfollowId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, follower: data.follower },
        });
        localStorage.setItem("user", JSON.stringify(data));
        setUserData((prevData) => {
          const newFollower = prevData.user.follower.filter((item) => item !== data._id)
          return {
            ...prevData,
            user: {
              ...prevData.user,
              follower: newFollower
            },
          };
        });
      })
      .catch((err) => console.log(err));
  };


  return (
    <>
      {userData ? (
        <div className="profile_container">
          <div className="profile_main_container">
            <div>
              <img
                className="profile_image"
                src={userData.user.pic}
                alt=""
              ></img>
            </div>

            <div className="profile_details">
              <div className="profile_username">
                <h2>{userData.user.name}</h2>
                <button>Edit</button>
                <span>
                  <FiSettings size="20" />
                </span>
              </div>
              <div className="follow_details">
                <p>
                  <b>{userData.posts.length}</b> posts
                </p>
                <p>
                  <b></b> {userData.user.following.length} following
                </p>
                <p>
                  <b></b> {userData.user.follower.length} followers
                </p>
              </div>
              <div className="profile_desc">
                <h4>{userData.user.email}</h4>
                {/* <span className="profile_caption">
                  I am in love with sunsets ❤️
                </span> */}
              </div>
              {
                showFollow ? 
                <button onClick={() =>{
                    followUser()
                    setShowFollow(!showFollow)}} className="flw_btn">
                Follow
              </button> : 
              <button onClick={() =>{
                    unFollowUser()
                    setShowFollow(!showFollow)}} className="flw_btn">
                Unfollow
              </button>

              }
            </div>
          </div>

          <div className="profile_posts">
            {userData.posts.map((item) => {
              return (
                <img
                  key={item._id}
                  className="profile_post"
                  src={item.image}
                  alt="post_pic"
                ></img>
              );
            })}
          </div>
        </div>
      ) : (
        "...loading"
      )}
    </>
  );
}

export default UserProfile;
