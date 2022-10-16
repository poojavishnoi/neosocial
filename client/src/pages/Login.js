import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import image from '../asset/register.svg'
import '../style/landing.css'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import {useAuth} from '../context/auth-context'

function Login() {
  const {user, dispatch} = useAuth();
  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")

  const login = () =>{

    if(user){
      navigate("/home")
    }

    dispatch({
      type:"INIT_AUTH"
    })

    fetch("https://neosocial-app.herokuapp.com/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        email,
        password   
      }
      )
     
    })
    .then(data => data.json())
    .then((res) => {
      if (res.error) {
        toast.error(`${res.error}`,{
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });

          dispatch({
            type:"AUTH_FAIL",
            payload:res.error
          })
       
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

        localStorage.setItem("jwt", res.token)
        localStorage.setItem("user", JSON.stringify(res.user))
        dispatch({
          type: "AUTH_SUCCESS",
          payload: res.user
        })
        setTimeout(() => {
          navigate("/home")
        },4000)
      }
    });

  }

  return (
    <div className='landing_container'>
      <img src={image} alt=""/>
      <div className='landing_main_container'>
        <h1  className='landing_header'>Get's started!!</h1>
        <p>Don't have an acocunt??  </p>
        <Link to="/">
        <button className='login_btn'>Register</button>
        </Link>

        <div className='landing_form'>
          <h3>Email</h3>
          <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder='Enter email'></input>
          <h3>Password</h3>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder='Enter password'></input>
          <button onClick={() => login()} className='register_btn'>Login</button>
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
  )
}

export default Login