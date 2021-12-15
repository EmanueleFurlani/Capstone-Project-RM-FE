import React, {useState, useContext} from "react"
import {Link, useHistory} from "react-router-dom"
import {UserContext} from "../../App"
import M from "materialize-css"

const SignIn = () => {
    
    const {state, dispatch} = useContext(UserContext)
    const history = useHistory()
    const[password, setPassword] = useState("")
    const[email, setEmail] = useState("")
    const PostData = () => {
        fetch("http://localhost:3001/auth/signin",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                // "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                password:password,
                email:email
            })
        }).then(res=>res.json())
        .then(data=> {
            // console.log(data)
            if(data.error) {
                M.toast({html: data.error, classes:"#b71c1c red darken-4"})
            } else {
                localStorage.setItem("jwt", data.token)
                localStorage.setItem("user", JSON.stringify(data.user))
                dispatch({type:"USER", payload:data.user})
                M.toast({html: "signedIn success", classes:"#81c784 green lighten-2"})
                history.push("/")
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
                    <input
                    type="password"
                    placeholder="password"
                    value={password}
                     onChange={(e)=>setPassword(e.target.value)}
                    />
                    <button className="btn waves-effect waves-light"
                    onClick={() =>PostData()}>
                        Login
                    </button>
                 <h5>
                    <Link to="/signup">Don't have an account?</Link>
                </h5>
                <h6>
                    <Link to="/reset">Forgot password?</Link>
                </h6>
            </div>
        </div>
    )
}

export default SignIn