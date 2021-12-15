import React, {useState} from "react"


const PostBody = ({body}) => {

    const [showBody, setShowBody] = useState(false)
    if(body.length <50){
        return(
             <p>{body}</p>
        )
    }
    const visibleBody = showBody? body: body.substring(0, 50)
    return(
        <> 
        <p>{visibleBody}</p>
        {!showBody&&<button className="button" onClick={()=>{setShowBody(true)}}><span>Show More</span></button>}
    </>
    )
}


export default PostBody