import React, { useState, useEffect } from "react";
import "../style/home.css";
import Follow from "../components/Follow";
import Post from "../components/Post";
import { useAuth } from "../context/auth-context";

function Home() {

  const [data, setData] = useState([]);
  const {user} = useAuth()
  const [users, setUsers] = useState([]);

  useEffect(()=>{
    try{
      fetch("https://neosocial-app.herokuapp.com/api/user/getalluser", {
        method: "get",
        headers: {
          "auth-token": localStorage.getItem("jwt"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUsers(data.users);
        });
      }catch(e){
        console.log(e);
      }
  },[])

  useEffect(() => {
    try{
    fetch("https://neosocial-app.herokuapp.com/api/posts/allpost", {
      method: "get",
      headers: {
        "auth-token": localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.posts);
      });
    }catch(e){
      console.log(e);
    }
  }, []);

  const followUsersList = users.filter((singleUser) => singleUser._id !== user._id)

  return (
    <>
      {data ? (
        <div className="home_container">
          <div className="post_container common">
            {data
              .map((item) => {
                return (
                  <Post
                    profileImg = {item.postedBy.pic}
                    data={data}
                    key={item._id}
                    postedById={item.postedBy._id}
                    comments={item.comments}
                    id={item._id}
                    image={item.image}
                    likes={item.like}
                    caption={item.caption}
                    name={item.postedBy.name}
                  />
                );
              })
              .reverse()}
          </div>

          <div className="follow_container common">
            <p className="follow_header">Suggestions for you</p>
            {
              followUsersList.map((user) => {
                return(<>
                  <Follow key={user._id} followUser={user}/>
                  </>
                )
              })
            }
          </div>
        </div>
      ) : (
        "loading"
      )}
    </>
  );
}
export default Home;
