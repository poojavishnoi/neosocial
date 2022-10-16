import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CgAddR, CgProfile } from "react-icons/cg";
import { BsSearch, BsImage } from "react-icons/bs";
import "../style/header.css";
import { useAuth } from "../context/auth-context";
function Header() {
  const { user, dispatch } = useAuth();
  const navigate = useNavigate();

  const renderList = () => {
    if (user) {
      return [
        <li key={1}>
          <Link to="/createpost">
            <CgAddR className="icon" size="2rem" />
          </Link>
          Post
        </li>,
        <li key={4}>
          <Link to="/myfollowerspost">
            <BsImage className="icon" size="2rem" />
          </Link>
          My following's post
        </li>,
        <li key={3}>
          <Link to="/profile">
            <CgProfile className="icon" size="2rem" />
          </Link>
          profile
        </li>,
        <li key={5}>
          {" "}
          <button
            onClick={() => {
              localStorage.clear();
              dispatch({
                type: "LOGOUT",
              });
              navigate("/");
            }}
          >
            Logout
          </button>
        </li>,
      ];
    } else {
      return [
        <li key={6}>
          <Link to="/login">
            <CgProfile className="icon" size="2rem" />
          </Link>
          Signin
        </li>,
        <li key={7}>
          <Link to="/">
            <CgProfile className="icon" size="2rem" />
          </Link>
          SignUp
        </li>,
      ];
    }
  };

  return (
    <div className="header_main_container">
      <div className="header_logo">
        <Link to={user ? "/home" : "/"}>
          <img
            src={
              "https://cdn.pixabay.com/photo/2016/12/07/15/15/lotus-with-hands-1889661_960_720.png"
            }
            alt="logo"
          />
        </Link>
        NEOSOCIAL
      </div>
      <div className="header_search">
        <span>
          <BsSearch />
        </span>
        <input
          className="header_searchbar"
          type="text"
          placeholder="Search for Friends, Creators, etc"
        />
      </div>
      <div className="header_links">
        <ul>{renderList()}</ul>
      </div>
    </div>
  );
}

export default Header;
