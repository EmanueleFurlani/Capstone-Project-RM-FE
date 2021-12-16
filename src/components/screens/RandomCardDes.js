import React, {useState} from "react"


const RandomCardDes = ({description}) => {

    const [showBody, setShowBody] = useState(false)
    if(description.length <100){
        return(
             <p>{description}</p>
        )
    }
    const visibleBody = showBody? description: description.substring(0, 100)
    return(
        <> 
        {/* <p >{visibleBody}</p> */}
        <div className="result-section"><span style={{fontSize: '12px'}}>{visibleBody}</span></div>
        {!showBody&&<button className="button" onClick={()=>{setShowBody(true)}}><span>Show More</span></button>}
    </>
    )
}


export default RandomCardDes