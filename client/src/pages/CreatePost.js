import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/createpost.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

function CreatePost() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();
  const toastStyle = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  useEffect(() => {
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
        setUrl(data.url);
      })
      .catch((err) => console.log(err));
  }, [image]);

  const postDetails = () => {
    fetch("https://neosocial-app.herokuapp.com/api/posts/createpost", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        caption,
        image: url,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          toast.error(`${data.error}`, toastStyle);
        } else {
          toast.success(`${data.message}`, toastStyle);

          setTimeout(() => {
            navigate("/home");
          }, 4000);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="createpost_container">
      <div className="createpost_main_container">
        <div className="post_caption">
          <input
            type="text"
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Enter caption"
          />
        </div>

        <div className="post_image_upload">
          <span>Select the image: </span>
          <input
            type="file"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            alt=""
          />
        </div>

        <div>
          <button onClick={() => postDetails()}>Submit</button>
        </div>

        <ToastContainer />
      </div>
    </div>
  );
}

export default CreatePost;
