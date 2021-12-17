import React, {useState, useEffect} from "react";
import {useHistory} from "react-router-dom"
import M from "materialize-css"


const CreatePost = () => {
    
    const history = useHistory()
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")

    useEffect(() => {
        if(url){
         fetch("https://project-randomountain.herokuapp.com/post/createpost",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                title:title,
                body:body,
                pic:url
            })
        }).then(res=>res.json())
        .then(data=> {
            // console.log(data)
            if(data.error) {
                M.toast({html: data.error, classes:"#b71c1c red darken-4"})
            } else {
                M.toast({html: "created new experience successfully", classes:"#81c784 green lighten-2"})
                history.push("/")
            }
        }).catch(err => {
            console.log(err)
        })
    }}, [url])

    const postDetails = () => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "randomountain")
        data.append("cloud_name", "dqffc0h5e")
        fetch("https://api.cloudinary.com/v1_1/dqffc0h5e/image/upload",{
            method:"POST",
            body: data
        })
        .then(res => res.json())
        .then(data => {setUrl(data.url)})
        .catch(err => console.log(err))
    }

 return(
    <div className="card input-field"
     style={{
         margin:"30px auto",
         maxWidth:"500px",
         padding:"20px",
         textAlign:"center"
     }}>
         <input
          type="text" 
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)} />
         <textarea 
          id="text-area"
          className="materialize-textarea"
          type="textarea" 
          placeholder="place here your experience" 
          value={body}
          onChange={(e) => setBody(e.target.value)}/>
            <div className="file-field input-field">
                <div className="btn">
                    <span>Upload image</span>
                    <input 
                    type="file"
                    onChange={(e) =>setImage(e.target.files[0])}/>
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text"/>
                </div>
            </div>
            <button className="btn waves-effect waves-light"
            onClick={() => postDetails()}>
                    Share your Experience
            </button>
    </div>
 )
}

export default CreatePost