import React, {useState, useEffect} from "react";
import "../style/home.css";
import Post from "../components/Post";
function SubscribedUserPost() {

  const [data, setData] = useState([])

  useEffect(() => {
    fetch("https://neosocial-app.herokuapp.com/api/posts/getsubpost", {
      method:"get",
      headers:{
        "auth-token": localStorage.getItem("jwt")
      }
    }).then(res => res.json())
    .then(data => {
      setData(data.posts)
    })
  }, []);


  return (
    <div className="home_container"> 
    {
      data.length > 0 ? 
      <div className="post_container common">
        {
          data.map((item) => {
            return(
              <Post key={item._id} data={data} postedById={item.postedBy._id} id={item._id} profileImg={item.postedBy.pic} comments={item.comments} image={item.image} likes={item.like} caption={item.caption} name={item.postedBy.name}/>
            )
           
          }).reverse()
        }
      </div>

      
     : <img
          src="https://cdn.dribbble.com/users/453325/screenshots/5573953/empty_state.png?compress=1&resize=800x600&vertical=top"
          alt=""
        />
    }
    </div>
  );
}

export default SubscribedUserPost;
