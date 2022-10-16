import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import CreatePost from "./pages/CreatePost";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import { Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";
import  UserProfile from "./pages/UserProfile";
import SubscribedUserPost from "./pages/SubscribedUserPost";


function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />  
        <Route path="/login" element={<Login />} />              
        <Route path="/home" element={<Home />} />
        <Route path="/createPost" element={<CreatePost />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:userid" element={<UserProfile />} />
        <Route path="/myfollowerspost" element={<SubscribedUserPost />} />

      </Routes>
      <Footer />
    </div>
  );
}

export default App;
