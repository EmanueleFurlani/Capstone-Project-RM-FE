import React, {useState} from "react"
import { useHistory} from "react-router-dom"

import M from "materialize-css"

const Reset = () => {
    
    const history = useHistory()
    const[email, setEmail] = useState("")
    const PostData = () => {
        fetch("http://localhost:3001/auth/reset-password",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                // "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                email:email
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
    
    return (
        <div className="mycard">
            <div id="signInUp" className="card auth-card input-field">
                <img style={{maxWidth:"100%"}} src="https://res.cloudinary.com/dqffc0h5e/image/upload/v1639392375/monti%20fvg/IMG_2124_Everest_hwcycw.jpg"/>
                {/* <h2 style={{fontSize: "2.56rem"}}>RandoMountain</h2> */}
                    <input
                    type="text"
                    placeholder="email"
                    value={email}
                     onChange={(e)=>setEmail(e.target.value)}
                    />
                    <button className="btn waves-effect waves-light"
                    onClick={() =>PostData()}>
                        Reset password
                    </button>
            </div>
        </div>
    )
}

export default Reset