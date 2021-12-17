import React, { useEffect, useState, useContext } from "react"
import {UserContext} from "../../App"

const Profile = () => {
    
    const [mypics, setMyPics] = useState([])
    const {state, dispatch} = useContext(UserContext)
    const[image,setImage] = useState("")
    // const[url,setUrl] = useState("")
    // console.log(state)

    useEffect(() => {
        fetch("https://project-randomountain.herokuapp.com/post/mypost", {
            headers: {
                "Authorization": "Bearer " +localStorage.getItem("jwt")
            }
        }).then(res => res.json())
          .then(result => {
            // console.log(result)
            setMyPics(result.mypost)})
    },[])

    useEffect(() =>{
        if(image){
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "randomountain")
        data.append("cloud_name", "dqffc0h5e")
        fetch("https://api.cloudinary.com/v1_1/dqffc0h5e/image/upload",{
            method:"POST",
            body: data
        })
        .then(res => res.json())
        .then(data => {
        // setUrl(data.url)
        // console.log(data)
        fetch("https://project-randomountain.herokuapp.com/user/updatepic", {
            method: "PUT",
            headers: {
                "Content-Type":"application/json",
                "Authorization":"Bearer "+ localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                pic:data.url
            })
        }).then(res => res.json()) 
          .then(result => {
              console.log(result)
              localStorage.setItem("user", JSON.stringify({...state, pic:result.pic}))
              dispatch({type:"UPDATEPIC", payload:result.pic})
          })
        })
        .catch(err => console.log(err))
        }},
        [image])

    const updatePhoto = (file) => {
        setImage(file)
    }

    return (
        <div style={{maxWidth:"550px", margin: "0px auto"}}>
            <div style={{
                        display:"flex",
                        justifyContent:"space-around",
                        margin:"18px 0px",
                        borderBottom:"1px solid grey"}}>
                <div>
                    <img style={{width:"160px", height:"160px",borderRadius:"80px", objectFit:"cover"}}
                        src={state?state.pic:"loading"}/>


                     <div className="file-field input-field" style={{margin:"10px"}}>
                        <div className="btn">
                            <span>Update pic</span>
                                <input 
                                type="file"
                                onChange={(e) =>updatePhoto(e.target.files[0])}/>
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" style={{borderBottom:"none"}} type="text"/>
                        </div>
                    </div>
                </div>
                <div>
                    <h4>{state?state.name:"loading"}</h4>
                     {/* <h5>{state?state.email:"loading"}</h5> */}
                     <p>{state?state.description:"loading"}</p>
                    <div style={{
                        display:"flex",
                        justifyContent:"space-between",
                        width:"108%"}}>
                    <h6>{mypics.length} post</h6>
                    <h6>{state?state.followers.length:"0"} followers</h6>
                    <h6>{state?state.following.length:"0"} following</h6>
                    </div>
                </div>
            </div>
            <div className="gallery">
                {mypics.map(item => {
                    return(
                        <img key={item._id} className="item" src={item.photo} alt= {item.title} style={{marginBottom:"6px"}}/>   
                    )
                })}       
            </div>
        </div>
    )
}

export default Profile
