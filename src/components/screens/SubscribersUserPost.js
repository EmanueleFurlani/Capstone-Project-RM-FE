import React, {useState, useEffect, useContext} from "react"
import {UserContext} from "../../App"
import {Link} from "react-router-dom"
import PostBody from "./PostBody"
import Comments from "./Comments"

const Home = () => {
    
    const [data,setData] = useState([])
    const{state, dispatch} = useContext(UserContext)
    useEffect(() => {
        fetch("https://project-randomountain.herokuapp.com/post/getsubpost",{
            headers: {
                "Authorization": "Bearer "+ localStorage.getItem("jwt")
            }
        }).then(res => res.json())
          .then(result => {
            //   console.log(result)
              setData(result.posts)
          })
    }, [])

    const likePost = (id) => {
        fetch("https://project-randomountain.herokuapp.com/post/like", {
            method: "PUT",
            headers: {
                "Content-Type":"application/json",
                "Authorization": "Bearer "+ localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res => res.json())
          .then(result => {
               const newData = data.map(item => {
                  if(item._id == result._id) {
                      return result
                  } else {
                      return item
                  }
              })
              setData(newData)
          }).catch(err => console.log(err))
        }

    const unlikePost = (id) => {
        fetch("https://project-randomountain.herokuapp.com/post/unlike", {
            method: "PUT",
            headers: {
                "Content-Type":"application/json",
                "Authorization": "Bearer "+ localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res => res.json())
          .then(result => {
              const newData = data.map(item => {
                  if(item._id == result._id) {
                      return result
                  } else {
                      return item
                  }
              })
              setData(newData)
          }).catch(err => console.log(err))
        }

    const makeComment = (text, postId) => {
        fetch("https://project-randomountain.herokuapp.com/post/comment", {
            method:"PUT",
            headers: {
                "Content-Type":"application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:postId,
                text:text
            })
        }).then(res => res.json())
          .then(result => {
            //   console.log(result)
               const newData = data.map(item => {
                  if(item._id == result._id) {
                      return result
                  } else {
                      return item
                  }
              })
              setData(newData)
          }).catch(err => console.log(err))
    }

    const deletePost = (postid) => {
        fetch(`https://project-randomountain.herokuapp.com/post/deletepost/${postid}`,{
            method:"DELETE",
            headers: {
                "Authorization":"Bearer " +localStorage.getItem("jwt")
            }
        }).then(res => res.json())
          .then(result => {
            //   console.log(result)
              const newData = data.filter(item => {
                  return item._id !== result._id
              })
              setData(newData)
          })
    }

    return (
        <div className="home" style={{marginTop:"20px"}}>
            {data.map(item => {
                    return(
                        <div className="row">
                            <div className="col l6 offset-l3">
                                <div id="signInUp" className="card">
                                    <div className="card-image">
                                        <img src={item.photo}/>
                                        <span style={{textShadow:"0 0 2px black"}} className="card-title">{item.title}</span>
                                    </div>
                                    <div>
                                        <div className="card-content">
                                        <PostBody body={item.body}/>
                                        </div>
                                        <div className="card-action">
                                            <p style={{margin:"0"}}><span style={{fontStyle:"oblique"}} >posted by: </span>
                                            <Link to={item.postedBy._id !== state._id?"/profile/"+ item.postedBy._id : "/profile/"}>
                                                {item.postedBy.name}</Link> {item.postedBy._id == state._id
                                                && <i className="material-icons" 
                                                style={{float:"right"}}
                                                onClick={()=> deletePost(item._id)}
                                                >delete</i>}
                                            </p>
                                            <div>
                                                {/* <i className="material-icons" style={{color:"green"}}>thumb_up</i> */}
                                                <div style={{display:"flex"}}>
                                                <div style={{display:"flex", alignItems:"center"}}>
                                                {item.likes.includes(state._id)
                                                ? 
                                                <i className="material-icons" style={{color:"red"}}
                                                onClick={()=> {unlikePost(item._id)}}>favorite
                                                </i>
                                                :
                                                <i className="material-icons" 
                                                onClick={()=> {likePost(item._id)}}>favorite_border
                                                </i>
                                                }
                                                </div>
                                                <p>{item.likes.length} likes</p>
                                                </div>      
                                                <Comments comments={item.comments}/>
                                                <form onSubmit={(e) => {
                                                    e.preventDefault()
                                                    makeComment(e.target[0].value, item._id)
                                                    e.target.reset()
                                                    }}>
                                                <input type="text" placeholder="add a comment"  />
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )
                     })
                    }
            </div>
    )
}

export default Home