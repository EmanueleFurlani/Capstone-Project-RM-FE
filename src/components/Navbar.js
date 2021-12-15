import React, {useContext, useRef, useEffect, useState} from "react"
import reactDom from "react-dom"
import { Link, useHistory } from "react-router-dom"
import { UserContext } from "../App" 
import M from "materialize-css"

const NavBar = () => {
  const searchModal = useRef(null)
  const [search, setSearch] = useState("")
  const [userDetails, setUserDatails] = useState([])
  const {state, dispatch} = useContext(UserContext)
  const history = useHistory()

  useEffect(()=>{
    M.Modal.init(searchModal.current)
  },[])

  const renderList = () => {
    if(state) {
      return [
        <li key="1"><i data-target="modal1" className="large material-icons modal-trigger" style={{color:"white",lineHeight:"50px"}}>search</i></li>,
        <li key="2"><Link to="/profile">Profile</Link></li>,
        <li key="3"><Link to="/create">Create Post</Link></li>,
        <li key="4"><Link to="/myfollowingpost">My following Posts</Link></li>,
        <li key="5"><Link to="/randomhike">Random Hike!</Link></li>,
        <li key="6">
           <button 
                className="btn waves-effect waves-light"
                    onClick={() => {
                      localStorage.clear()
                      dispatch({type:"CLEAR"})
                      history.push("/signin")
                    }}>
                        LOGOUT
            </button>
          </li>
      ]
    } else {
      return [
        <li key="7"><Link to="/signin">Signin</Link></li>,
        <li key="8"><Link to="/signup">Signup</Link></li>
      ]
    }
  }

  const fetchUsers = (query) => {
    setSearch(query)
    fetch("http://localhost:3001/user/search-users", {
      method: "POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        query:query
      })
    }).then(res => res.json())
      .then(result => {
        setUserDatails(result.user)
      })
  }

    return(
  <nav>
    <div id="navigator" className="nav-wrapper white" id="sticky1">
      <img style={{height:"80%", margin:"5px 0 5px 5px"}} src="https://res.cloudinary.com/dqffc0h5e/image/upload/v1639399979/monti%20fvg/loonapix_16393998472239150657_betc4l.png"/>
      <Link to={state?"/":"/signin"} className="brand-logo left" id="logo">RandoMountain</Link>
      <ul id="nav-mobile" className="right" style={{marginRight: "20px"}}>
        {renderList()}
      </ul>
    </div>
    <div id="modal1" className="modal" ref={searchModal} style={{color:"black"}}>
      <div className="modal-content">
        <input
            type="text"
            placeholder="search users"
            value={search}
            onChange={(e)=>fetchUsers(e.target.value)
            }/>
            <ul className="collection" style={{border:"none"}}
            // style={{display: "flex", alignContent: "center", flexDirection: "column"}}
            //errore se faccio search e mi sloggo!
            >
              {userDetails.map(item => {
                return <Link key="1" to={item._id !== state._id? "/profile/"+item._id: "/profile"} onClick={() =>{
                  M.Modal.getInstance(searchModal.current).close()
                  setSearch("")
                  setUserDatails([])
                }}><li className="collection-item"  style={{width:"100%", color:"black"}}>{item.email}</li></Link>
              })}
            </ul>
      </div>
      <div className="modal-footer">
        <button className="modal-close waves-effect waves-green btn-flat" onClick={()=> setSearch("")}>Close</button>
      </div>
    </div>
  </nav>
    )
}

export default NavBar