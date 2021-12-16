import React, {useState} from "react"


const Comments = ({comments}) => {

    const [showComments, setShowComments] = useState(false)
    const visibleComments = showComments? comments: comments.slice(0,2)

    return(
        <>
    {
        visibleComments.map(record => {
            return(
                <div key={record._id} id="comment" style={{position:"relative", fontFamily:"BlinkMacSystemFon", display:"flex", alignItems:"center", padding:"6px 6px 6px 0px"}}>
                <img style={{width:"30px", height:"30px",borderRadius:"80px"}} src={record.postedBy.pic}/>
                <span style={{ marginLeft:"4px",marginRight:"5px",fontWeight:"bold"}}>{record.postedBy.name}</span>
                <div style={{wordBreak: "break-all"}}><p style={{}} id="text-comment">{record.text}</p></div>
                </div>
            )
        })
        }
        {(!showComments&&comments.length >=3)&&<button className="button" onClick={()=>{setShowComments(true)}}><span>Show all comments</span></button>}
    </>
    )
}


export default Comments