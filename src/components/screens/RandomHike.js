import React, {useState, useEffect, useRef} from "react"
import M from "materialize-css"

//basic version
// const RandomHike = () => {

//     const [data,setData] = useState([])
//     const [color,setColor] = useState("")
//     const [result,setResult] = useState(undefined)

//     console.log(color)
//      useEffect(() => {
//         fetch("http://localhost:5001/allhike",{
//             headers: {
//                 "Authorization": "Bearer "+ localStorage.getItem("jwt")
//             }
//         }).then(res => res.json())
//           .then(result => {
//             //   console.log(result)
//               setData(result.hike)
//           })
//     }, [])

//     return (
//         <>
//         <div className="home">
//             <div className=" home-card">
//                 <br/><br/>
//                 <h3>Wanna hike?</h3>
//                 <h5>Get a random hike by clicking below</h5>
//                         <img className="img_fvg" style={{width:"600px", height:"160px", border:color === "yellow"? "solid 1px yellow":"0" }}
//                         src="https://www.ilmessaggero.it/photos/MED_HIGH/60/54/3366054_1109_img_20171113_wa0013.jpg" 
//                             // value={color}
//                             onClick={(e)=>setColor("yellow")}
//                         />
//                          <img className="img_fvg" style={{width:"600px", height:"160px", border:color === "red"? "solid 1px red":"0"  }}
//                         src="https://www.ilmessaggero.it/photos/MED_HIGH/60/54/3366054_1109_img_20171113_wa0013.jpg"
//                             onClick={(e)=>setColor("red")} />
//                          <img className="img_fvg" style={{width:"600px", height:"160px", border:color === "blu"? "solid 1px blue":"0" }}
//                         src="https://www.ilmessaggero.it/photos/MED_HIGH/60/54/3366054_1109_img_20171113_wa0013.jpg" 
//                             onClick={(e)=>setColor("blu")}/>
//                         <br/><br/>
//                   <div className="input-field col s12">
//                         {/* <select className="browser-default"
//                                 value={color}
//                                 onChange={(e)=>setColor(e.target.value)}>
//                         <option value="" disabled selected>Choose the colored zone</option>
//                         <option value="yellow">Yellow</option>
//                         <option value="red">Red</option>
//                         <option value="blu">blu</option>
//                         </select> */}
//                     </div>
//                     <button className="btn"
//                     onClick={()=>{
//                         const filteredData = data.filter((x)=>x.color ===color)
//                         const randomIndex = Math.round(Math.random()*(filteredData.length-1))
//                         console.log(randomIndex)
//                         setResult(filteredData[randomIndex])
//                     }}>
//                     randomize
//                     </button>
//             </div>
//         </div>
//         <br/><br/>
//          <div className="home">
//             {result?.name}
//         </div>
//         </>
//     )
// }

// export default RandomHike


// const RandomHike = () => {

//     const [data,setData] = useState([])
//     const [color,setColor] = useState("")
//     const [result,setResult] = useState(undefined)
//     const [isviaferrata, setisViaferrata] = useState(false)
//     const [difficulty, setDifficulty] = useState("")
//     const [maxlength, setMaxLength] = useState(50)

//     console.log(color)
//      useEffect(() => {
//         fetch("http://localhost:5001/allhike",{
//             headers: {
//                 "Authorization": "Bearer "+ localStorage.getItem("jwt")
//             }
//         }).then(res => res.json())
//           .then(result => {
//             //   console.log(result)
//               setData(result.hike)
//           })
//     }, [])

//     const filteredData = data
//     .filter((x)=>x.color ===color)
//     .filter((y) => y.via_ferrata === isviaferrata)
//     .filter((n) => n.difficulty === difficulty)
//     .filter((g) => g.length <= maxlength)

//     return (
//         <>
//         <div className="home">
//             <div className=" home-card">
//                 <br/><br/>
//                 <h3>Wanna hike?</h3>
//                 <h5>Get a random hike by clicking below</h5>
//                         <img className="img_fvg" style={{width:"600px", height:"160px", border:color === "yellow"? "solid 1px yellow":"0" }}
//                         src="https://www.ilmessaggero.it/photos/MED_HIGH/60/54/3366054_1109_img_20171113_wa0013.jpg" 
//                             // value={color}
//                             onClick={(e)=>setColor("yellow")}
//                         />
//                          <img className="img_fvg" style={{width:"600px", height:"160px", border:color === "red"? "solid 1px red":"0"  }}
//                         src="https://www.ilmessaggero.it/photos/MED_HIGH/60/54/3366054_1109_img_20171113_wa0013.jpg"
//                             onClick={(e)=>setColor("red")} />
//                          <img className="img_fvg" style={{width:"600px", height:"160px", border:color === "blu"? "solid 1px blue":"0" }}
//                         src="https://www.ilmessaggero.it/photos/MED_HIGH/60/54/3366054_1109_img_20171113_wa0013.jpg" 
//                             onClick={(e)=>setColor("blu")}/>
//                         <br/><br/>
//                   <div className="input-field col s12">
//                        <p>Via Ferrata</p>
//                        <div class="switch">
//                             <label>
//                             No
//                             <input type="checkbox" 
//                             onChange={() =>{setisViaferrata(!isviaferrata)}}/>
//                             <span class="lever"></span>
//                             Yes
//                             </label>
//                         </div>

//                         <select className="browser-default"
//                                 value={difficulty}
//                                 onChange={(e)=>setDifficulty(e.target.value)}>
//                         <option value="" disabled selected>Choose the difficulty</option>
//                         <option value="easy">easy</option>
//                         <option value="medium">medium</option>
//                         <option value="hard">hard</option>
//                         </select>
//                         {/* <select className="browser-default"
//                                 value={color}
//                                 onChange={(e)=>setColor(e.target.value)}>
//                         <option value="" disabled selected>Choose the colored zone</option>
//                         <option value="yellow">Yellow</option>
//                         <option value="red">Red</option>
//                         <option value="blu">blu</option>
//                         </select> */}
//                     </div>
//                         <form action="#">
//                             <p className="range-field">
//                                 <span>max length  {maxlength}</span>
//                             <input type="range" id="test5" min="0" max="100"
//                             value={maxlength}
//                             onChange={(e)=>setMaxLength(e.target.value)} />
//                             </p>
//                         </form>
                        
//                     <button className="btn"
//                     onClick={()=>{
//                         // const filteredData = data.filter((x)=>x.color ===color)
//                         const randomIndex = Math.round(Math.random()*(filteredData.length-1))
//                         console.log(randomIndex)
//                         setResult(filteredData[randomIndex])
//                     }}>
//                     randomize
//                     </button>
//             </div>
//         </div>
//         <br/><br/>
//          <div className="home">
//             {/* {filteredData.map(item => {
//                 return(<div key={item.name}>
//                     <p>name: {item.name}</p>
//                     <p>description: {item.description}</p>
//                     <p>color: {item.color}</p>
//                     <p>length: {item.length}</p>
//                     <p>via_ferrata: {item.via_ferrata.toString()}</p>   
//                 </div>)}
//                 )} */}
//                 {result? <div key={result.name}>
//                     <p>name: {result.name}</p>
//                     <p>description: {result.description}</p>
//                     <p>color: {result.color}</p>
//                     <p>length: {result.length}</p>
//                     <p>via_ferrata: {result.via_ferrata.toString()}</p>   
//                 </div> : null}
//         </div>
//         </>
//     )
// }



const RandomHike = () => {

    const randoModal = useRef(null)
    const [data,setData] = useState([])
    const [color,setColor] = useState("")
    const [result,setResult] = useState(undefined)
    const [isviaferrata, setisViaferrata] = useState(false)
    const [difficulty, setDifficulty] = useState("")
    const [maxlength, setMaxLength] = useState(50)

    console.log(color)
     useEffect(() => {
        fetch("http://localhost:3001/adventure/allhike",{
            headers: {
                "Authorization": "Bearer "+ localStorage.getItem("jwt")
            }
        }).then(res => res.json())
          .then(result => {
            //   console.log(result)
              setData(result.hike)
          })
    }, [])

    useEffect(() => {
        M.Modal.init(randoModal.current)
    },[])

    const filteredData = data
    .filter((x)=>x.color ===color)
    .filter((y) => y.via_ferrata === isviaferrata)
    .filter((n) => n.difficulty === difficulty)
    .filter((g) => g.length <= maxlength)

    return (
        <>
        {/* <div className="home"> */}
            <div className=" home-card" style={{boxShadow:"none", marginBottom: 0}} >
                <h5> You don't know where to go today??</h5>
                <h6>Get a random hike by clicking the button below</h6>
                    <div style={{display:"flex", justifyContent:"space-around"}}>
                        <img className="img_fvg img-card" style={{cursor: "pointer", width:"400px", height:"400px", border:color === "yellow"? "solid 2px black":"0" }}
                        src="https://res.cloudinary.com/dqffc0h5e/image/upload/v1639130217/monti%20fvg/ovest_fvg_dbkztt.jpg" 
                            // value={color}
                            onClick={(e)=>setColor("yellow")}
                        />
                         <img className="img_fvg img-card" style={{ cursor: "pointer", width:"400px", height:"400px", border:color === "red"? "solid 2px black":"0"  }}
                        src="https://res.cloudinary.com/dqffc0h5e/image/upload/v1639130217/monti%20fvg/friuli_centro_uv2oxo.jpg"
                            onClick={(e)=>setColor("red")} />
                         <img className="img_fvg img-card" style={{cursor: "pointer", width:"400px", height:"400px", border:color === "blu"? "solid 2px black":"0" }}
                        src="https://res.cloudinary.com/dqffc0h5e/image/upload/v1639130217/monti%20fvg/est_fv_jb7uqz.jpg    " 
                            onClick={(e)=>setColor("blu")}/>
                    </div>
                  <div className="input-field col s12">
                      <div style={{display:"flex", alignItems: "center"}}>
                       <p style={{marginRight:"15px"}}>Do you want a "via Ferrata"?</p>
                       <div class="switch">
                            <label>
                            No
                            <input type="checkbox" 
                            onChange={() =>{setisViaferrata(!isviaferrata)}}/>
                            <span class="lever"></span>
                            Yes
                            </label>
                        </div>
                        </div>

                        <select className="browser-default"
                                value={difficulty}
                                onChange={(e)=>setDifficulty(e.target.value)}>
                        <option value="" disabled selected>Choose the difficulty of your Hike</option>
                        <option value="easy">easy</option>
                        <option value="medium">medium</option>
                        <option value="hard">hard</option>
                        </select>
                        {/* <select className="browser-default"
                                value={color}
                                onChange={(e)=>setColor(e.target.value)}>
                        <option value="" disabled selected>Choose the colored zone</option>
                        <option value="yellow">Yellow</option>
                        <option value="red">Red</option>
                        <option value="blu">blu</option>
                        </select> */}
                    </div>
                        <form action="#">
                            <p className="range-field">
                                <span>Set a maximum walking length:  {maxlength}km</span>
                            <input type="range" id="test5" min="0" max="100"
                            value={maxlength}
                            onChange={(e)=>setMaxLength(e.target.value)} />
                            </p>
                        </form>
                    <div style={{display:"flex", justifyContent:"center"}}>   
                    <button 
                    data-target="modal12" className="btn modal-trigger"
                    onClick={()=>{
                        // const filteredData = data.filter((x)=>x.color ===color)
                        const randomIndex = Math.round(Math.random()*(filteredData.length-1))
                        console.log(randomIndex)
                        setResult(filteredData[randomIndex])
                    }}>
                    randomize
                    </button>
                    </div> 
            </div>
        {/* </div> */}
        <br/><br/>
         <div className="home">
            {/* {filteredData.map(item => {
                return(<div key={item.name}>
                    <p>name: {item.name}</p>
                    <p>description: {item.description}</p>
                    <p>color: {item.color}</p>
                    <p>length: {item.length}</p>
                    <p>via_ferrata: {item.via_ferrata.toString()}</p>   
                </div>)}
                )} */}
                {/* {result? <div key={result.name}>
                    <p>name: {result.name}</p>
                    <p>description: {result.description}</p>
                    <p>color: {result.color}</p>
                    <p>length: {result.length}</p>
                    <p>via_ferrata: {result.via_ferrata.toString()}</p>   
                </div> : null} */}

                 <div id="modal12" className="modal" ref={randoModal}>
                    <div className="modal-content" >
                      {result? <div key={result.name}>
                    <div style={{display:"flex",justifyContent:"space-around",fontWeight:"bold"}}>
                    <h5>{result.name} ({result.max}mt)</h5>
                    </div>
                    <div style={{display:"flex", justifyContent: "space-around"}}>
                    <img id="img_random" style={{maxHeight:"400px", maxWidth:"750px", objectFit:"cover"}} src={result.photo}/>
                    </div>
                    <p>description: {result.description}</p>
                    {/*      */}
                    <p>length: {result.length} km</p>
                    <p>difficulty: {result.difficulty}</p>
                    <p>via_ferrata: {result.via_ferrata.toString()}</p>   
                    </div> : <div>NO RESULT</div>}
                    </div>
                    <div className="modal-footer">
                    <button className="modal-close waves-effect waves-green btn-flat">close</button>
                    </div>
                </div>
        </div>
        </>
    )
}

export default RandomHike

