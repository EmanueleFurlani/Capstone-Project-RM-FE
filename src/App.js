import './App.css';
import React, {useEffect, createContext, useReducer, useContext} from 'react';
import NavBar from "./components/Navbar"
import {BrowserRouter, Route, Switch, useHistory} from "react-router-dom"
import Home from './components/screens/Home';
import Signin from './components/screens/SignIn';
import Signup from './components/screens/SignUp';
import Profile from './components/screens/Profile';
import CreatePost from './components/screens/CreatePost';
import UserProfile from "./components/screens/UserProfile";
import RandomHike from "./components/screens/RandomHike"
import RandomHikeNew from "./components/screens/RandomHikeNew"
import RandomHikeSide from "./components/screens/RandomHikeSide"
import SubscribedUserPosts from "./components/screens/SubscribersUserPost"
import {initialState, reducer} from "./reducers/userReducer"
// import Footer from "./components/screens/Footer"
import Reset from './components/screens/Reset'
import Newpassword from './components/screens/Newpassword';
import ContactMe from './components/screens/ContactMe';

export const UserContext = createContext()

const Routing = () => {
  const history = useHistory()
  const {state, dispatch} = useContext(UserContext)
  useEffect(() => {
    const user =JSON.parse(localStorage.getItem("user"))
    if(user) {
      dispatch({type:"USER", payload:user})
      // history.push("/")
    } else {
      if(!history.location.pathname.startsWith("/reset"))
            history.push("/signin")
    }
  }, [])
  return (
  <Switch>
    <Route exact path="/">
        <Home />
    </Route>
    <Route path="/signin">
        <Signin />
    </Route>
      <Route path="/signup">
        <Signup />
    </Route>
    <Route exact path="/profile">
        <Profile />
    </Route>
    <Route path="/create">
        <CreatePost />
    </Route>
    <Route path="/profile/:userid">
        <UserProfile />
    </Route>
    <Route path="/myfollowingpost">
        <SubscribedUserPosts />
    </Route>
    <Route exact path="/reset">
        <Reset />
    </Route>
    <Route path="/reset/:token">
        <Newpassword />
    </Route>
     <Route path="/randomhike">
        <RandomHikeSide />
    </Route>
    <Route path="/contactme">
        <ContactMe />
    </Route>
  </Switch>
  )
}

function App() {
  const [state,dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{state, dispatch}}>
   <BrowserRouter>
   <NavBar />
   <Routing />
   {/* <Footer /> */}
   </BrowserRouter>
   </UserContext.Provider>
  );
}

export default App;
