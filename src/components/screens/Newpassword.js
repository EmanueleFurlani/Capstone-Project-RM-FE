import React, {useState} from "react"
import {useHistory, useParams} from "react-router-dom"

import M from "materialize-css"

const Newpassword = () => {
    
    const history = useHistory()
    const[password, setPassword] = useState("")
    const {token} = useParams()
    console.log(token)
    const PostData = () => {
        fetch("https://project-randomountain.herokuapp.com/auth/new-password",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                // "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                password:password,
                token: token
            })
        }).then(res=>res.json())
        .then(data=> {
            // console.log(data)
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
    
    return (
        <div className="mycard">
            <div id="signInUp" className="card auth-card input-field">
                <img style={{maxWidth:"100%"}} src="https://res.cloudinary.com/dqffc0h5e/image/upload/v1639392375/monti%20fvg/IMG_2124_Everest_hwcycw.jpg"/>
                {/* <h2 style={{fontSize: "2.56rem"}}>RandoMountain</h2> */}
                    <input
                    type="password"
                    placeholder="enter a new password"
                    value={password}
                     onChange={(e)=>setPassword(e.target.value)}
                    />
                    <button className="btn waves-effect waves-light"
                    onClick={() =>PostData()}>
                        Click to update password
                    </button>
            </div>
        </div>
    )
}

export default Newpassword