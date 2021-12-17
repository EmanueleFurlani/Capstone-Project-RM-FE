import React, {useState, useEffect} from "react"
import {Link, useHistory} from "react-router-dom"
import M from "materialize-css"

const SignUp = () => {
    
    const history = useHistory()
    const[name, setName] = useState("")
    const[password, setPassword] = useState("")
    const[description, setDescription] = useState("")
    const[email, setEmail] = useState("")
    const[image,setImage] = useState("")
    const[url,setUrl] = useState(undefined)

    useEffect(() =>{
        if(url) {
            uploadFields()
        }
    },[url])

    const uploadPic = () => {
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
    const uploadFields = () => {
        fetch("https://project-randomountain.herokuapp.com/auth/signup",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                name:name,
                password:password,
                description:description,
                email:email,
                pic:url
            })
        }).then(res=>res.json())
        .then(data=> {
            if(data.error) {
                M.toast({html: data.error, classes:"#b71c1c red darken-4"})
            } else {
                M.toast({html: data.message, classes:"#81c784 green lighten-2"})
                history.push("/signin")
            }
        }).catch(err => {
            console.log(err)
        })
    }
    const PostData = () => {
        if(image){
            uploadPic()
        } else {
            uploadFields()
        } 
    }

    return (
        <div className="mycard">
            <div id="signInUp" className="card auth-card input-field">
                <img style={{maxWidth:"100%"}} src="https://res.cloudinary.com/dqffc0h5e/image/upload/v1639392375/monti%20fvg/IMG_2124_Everest_hwcycw.jpg"/>
                {/* <h2 style={{fontSize: "2.56rem"}}>RandoMountain</h2> */}
                    <input
                    type="text"
                    placeholder="name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    />
                    <input
                    type="text"
                    placeholder="short description"
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                    />
                    <input
                    type="text"
                    placeholder="email"
                    value={email}
                     onChange={(e)=>setEmail(e.target.value)}
                    />
                    <input
                    type="password"
                    placeholder="password"
                    value={password}
                     onChange={(e)=>setPassword(e.target.value)}
                    />
                    <div className="file-field input-field">
                        <div className="btn">
                            <span>Upload pic</span>
                                <input 
                                type="file"
                                onChange={(e) =>setImage(e.target.files[0])}/>
                        </div>
                        <div className="file-path-wrapper">
                            <input className="file-path validate" type="text"/>
                        </div>
                    </div>
                    <button className="btn waves-effect waves-light"
                    onClick={() => PostData()}>
                        SignUP
                    </button>
                <h5>
                    <Link style={{color:"#0e2f5a"}} to="/signin">Already have an account?</Link>
                </h5>
            </div>
        </div>
    )
}

export default SignUp