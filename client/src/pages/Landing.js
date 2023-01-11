import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import sideImage from "../asset/register.svg";
import "../style/landing.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useAuth } from "../context/auth-context";

function Landing() {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [image, setImage] = useState("");
  const [url, setUrl] = useState(null);

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

    if (user) {
      navigate("/home");
    } else {
      navigate("/");
    }
  }, [image,navigate, user, url]);

  const uploadData = () => {
    fetch("https://neosocial-backend.onrender.com/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        pic:url
      }),
    })
      .then((data) => data.json())
      .then((res) => {
        if (res.error) {
          toast.error(`${res.error}`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          toast.success(`${res.message}`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            navigate("/login");
          }, 4000);
        }
      });
  };

  return (
    <div className="landing_container">
      <img src={sideImage} alt="" />
      <div className="landing_main_container">
        <h1 className="landing_header">Get's started!!</h1>
        <p>Already have an account?</p>
        <Link to="/login">
          <button className="login_btn">Login</button>
        </Link>
        <div className="landing_form">
          <h3>Username</h3>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Enter username"
          ></input>
          <h3>Email</h3>
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Enter username"
          ></input>
          <h3>Password</h3>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Enter username"
          ></input>
          <br/>

<h3>Select the image: </h3>
          <input
            type="file"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            alt=""
          />

          <button
            className="register_btn"
            onClick={() => {
              uploadData();
            }}
          >
            Register
          </button>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default Landing;
