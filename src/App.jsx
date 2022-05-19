import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import styled from "styled-components";
import AllPosts from "./pages/AllPosts";
import Chat from "./pages/Chat";
import Today from "./pages/Today";
import Verses from "./pages/Verses";
import Prayers from "./pages/Prayers";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Posts from "./pages/Posts";
import CreatePost from "./pages/CreatePost";
import CreatePrayer from "./pages/CreatePrayer";
import CreateVerse from "./pages/CreateVerse";
import Users from "./pages/Users";
import EditPost from "./pages/EditPost";

function App() {
  return (
    <AppContainer>
      <Router>
        <Routes>
          <Route path='/' element={<Home />}>
            <Route index element={<AllPosts />} />
            <Route path='posts/:id' element={<Posts />} />
            <Route path='chat' element={<Chat />} />
            <Route path='today' element={<Today />}>
              <Route index element={<Verses />} />
              <Route path='prayers' element={<Prayers />} />
            </Route>
            <Route path='profile' element={<Profile />} />
          </Route>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard' element={<Dashboard />}>
            <Route index path='addpost' element={<CreatePost />} />
            <Route path='addprayer' element={<CreatePrayer />} />
            <Route path='addverse' element={<CreateVerse />} />
            <Route path='allusers' element={<Users />} />
            <Route path='editpost/:id' element={<EditPost />} />
          </Route>
        </Routes>
      </Router>
    </AppContainer>
  );
}

const AppContainer = styled.main`
  width: 100%;
  height: 100%;
`;

export default App;
