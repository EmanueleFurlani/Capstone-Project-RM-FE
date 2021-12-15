import React, { useEffect, useState, useContext } from "react"
import {UserContext} from "../../App"
import {useParams} from "react-router-dom"

const Profile = () => {
    
    const [userProfile, setUserProfile] = useState(null)
    const {state, dispatch} = useContext(UserContext)
    const {userid} = useParams()
    const[showfollow, setShowFollow] = useState(state?!state.following.includes(userid):true)
    useEffect(() => {
        fetch(`http://localhost:3001/user/user/${userid}`, {
            headers: {
                "Authorization": "Bearer " +localStorage.getItem("jwt")
            }
        }).then(res => res.json())
          .then(result => {
            // console.log(result)
            setUserProfile(result)
        })
    },[])

    const followUser = () =>{
        fetch("http://localhost:3001/user/follow", {
            method:"PUT",
            headers: {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res => res.json())
          .then(data => {
            console.log(data)
            dispatch({type:"UPDATE", payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user", JSON.stringify(data))
            setUserProfile((prevState) => {
                return {
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:[...prevState.user.followers, data._id]
                    }
                }
            })
           setShowFollow(false)
          }).catch(err => {console.log(err)})
    }

    const unfollowUser = () =>{
        fetch("http://localhost:3001/user/unfollow", {
            method:"PUT",
            headers: {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                unfollowId:userid
            })
        }).then(res => res.json())
          .then(data => {
            // console.log(data)
            dispatch({type:"UPDATE", payload:{following:data.following, followers:data.followers}})
            localStorage.setItem("user", JSON.stringify(data))
            setUserProfile((prevState) => {
              const newFollower = prevState.user.followers.filter(item => item !== data._id)
                return {
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:newFollower
                    }
                }
            })
            setShowFollow(true)
          }).catch(err => {console.log(err)})
    }

    return (
    <>
        {userProfile?  <div style={{maxWidth:"550px", margin: "0px auto"}}>
            <div style={{
                        display:"flex",
                        justifyContent:"space-around",
                        margin:"18px 0px",
                        borderBottom:"1px solid grey"}}>
                <div>
                    <img style={{width:"160px", height:"160px",borderRadius:"80px", objectFit:"cover"}}
                        src={userProfile.user.pic}/>
                </div>
                <div>
                    <h4>{userProfile.user.name}</h4>
                    <h6>{userProfile.user.email}</h6>
                     <p>{userProfile.user.description}</p>
                    <div style={{
                        display:"flex",
                        justifyContent:"space-between",
                        width:"108%"}}>
                    <h6>{userProfile.posts.length} posts</h6>
                    <h6>{userProfile.user.followers.length} followers</h6>
                    <h6>{userProfile.user.following.length} following</h6>
                    </div>
                    {showfollow?
                     <button style={{margin:"10px"}} className="btn waves-effect waves-light"
                         onClick={() =>followUser()}>
                        Follow
                    </button>
                    :
                     <button style={{margin:"10px"}} className="btn waves-effect waves-light"
                         onClick={() =>unfollowUser()}>
                        UnFollow
                    </button>
                    }
                </div>
            </div>
            <div className="gallery">
                {userProfile.posts.map(item => {
                    return(
                        <img key={item._id} className="item" src={item.photo} alt= {item.title} style={{marginBottom:"6px"}}/>   
                    )
                })}       
            </div>
        </div>
        : 
     <div className="preloader-wrapper big active">
            <div className="spinner-layer spinner-blue">
                <div className="circle-clipper left">
                    <div className="circle"></div>
                        </div><div className="gap-patch">
                            <div className="circle"></div>
                        </div><div className="circle-clipper right">
                    <div className="circle"></div>
                </div>
            </div>
      </div>
      }
    </>
    )
}

export default Profile
