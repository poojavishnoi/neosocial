import React, {useEffect, useState} from "react";
import { useAuth } from "../context/auth-context";
import "../style/profile.css";


function Profile() {

  const user = JSON.parse(localStorage.getItem("user"))
  const [data, setData] = useState([])
  const {dispatch} = useAuth();
  const [image, setImage] = useState("")

  useEffect(() => {
    fetch("https://neosocial-backend.onrender.com/api/posts/mypost", {
      method:"get",
      headers:{
        "auth-token": localStorage.getItem("jwt")
      }
    }).then(res => res.json())
    .then(data => setData(data.myPost))
    .catch(err => console.log(err))
  },[])

  const updateProfilePic = () => {

    console.log("asasas");
    if(image){ 
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "neosocial");
    data.append("cloud_name", "poojavishnoi");
    fetch("https://api.cloudinary.com/v1_1/poojavishnoi/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {

        fetch("https://neosocial-backend.onrender.com/api/user/updatepic", {
          method:"put",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("jwt")
          },
          body: JSON.stringify({
            pic: data.url
          })
        })
        .then(res => res.json())
        .then(result => {
          localStorage.setItem("user", JSON.stringify({...user, pic: data.url}))
          dispatch({type: "UPDATE_PIC", payload: data.url})
        })
       
      })
      .catch((err) => console.log(err));
    }

  }

  return (<>
    {user? 

    <div className="profile_container">
      <div className="profile_main_container">
        <div>
          <img
            className="profile_image"
            src={user.pic}
            alt=""
          ></img>
        </div>

        <div className="profile_details">
          <div className="profile_username">
            <h2>{user.name}</h2>
          </div>
          <div className="follow_details">
            <p>
              <b>{data.length}</b> posts
            </p>
            <p>
              <b>{user.following.length}</b> following
            </p>
            <p>
              <b>{user.follower.length}</b> followers
            </p>
          </div>
          <div className="profile_desc">
            <h4>{user.email}</h4>
            {/* <span className="profile_caption">
              I am in love with sunsets ❤️
            </span> */}
          </div>
          <span><button onClick={updateProfilePic} className="flw_btn">
            Update Pic
          </button></span>
          <input
            style={{fontSize:"0.7rem", marginLeft:"1rem"}}
            type="file"
            onChange={(e) => {
              setImage(e.target.files[0]);
              
            }}
            alt=""
          />
        </div>

      </div>
      

      <div className="profile_posts">

      {
        data.map((item) => {
          return(
            <img
            key={item._id}
          className="profile_post"
          src={item.image}
          alt="post_pic"
        ></img>
          )
        })
      } 
      </div>
    </div> : "loading"}
    </>
  );
}

export default Profile;
