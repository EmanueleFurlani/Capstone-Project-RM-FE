import React, {useState, useEffect, useRef} from "react"
import M from "materialize-css"

const RandomHikeNew = () => {
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
        .filter((x)=>x.color === color)
        .filter((y) => isviaferrata ? y.via_ferrata === isviaferrata : true)
        .filter((n) => difficulty ? n.difficulty === difficulty : true)
        .filter((g) => maxlength ? g.length <= maxlength : true)

    const renderZones = () => (
        <>
            <h6>Pick a zone</h6>
            <div style={{display:"flex", justifyContent:"space-around", margin:"40px 0"}}>
                <img className="img_fvg img-card" style={{cursor: "pointer", width:"500px", height:"500px", border:color === "yellow"? "solid 2px black":"0" }}
                src="https://res.cloudinary.com/dqffc0h5e/image/upload/v1639130217/monti%20fvg/ovest_fvg_dbkztt.jpg" 
                    // value={color}
                    onClick={(e)=>setColor("yellow")}
                />
                    <img className="img_fvg img-card" style={{ cursor: "pointer", width:"500px", height:"500px", border:color === "red"? "solid 2px black":"0"  }}
                src="https://res.cloudinary.com/dqffc0h5e/image/upload/v1639130217/monti%20fvg/friuli_centro_uv2oxo.jpg"
                    onClick={(e)=>setColor("red")} />
                    <img className="img_fvg img-card" style={{cursor: "pointer", width:"500px", height:"500px", border:color === "blu"? "solid 2px black":"0" }}
                src="https://res.cloudinary.com/dqffc0h5e/image/upload/v1639130217/monti%20fvg/est_fv_jb7uqz.jpg    " 
                    onClick={(e)=>setColor("blu")}/>
            </div>
        </>
    )

    const renderFilters = () => (
          <div className="input-field col s12">
            <div className="filter-section">
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

            <div className="filter-section">
                <p style={{marginRight:"15px"}}>Difficulty</p>
                <div style={{ width: '30%'}}>
                    <select className="browser-default"
                value={difficulty}
                onChange={(e)=>setDifficulty(e.target.value)}>
                <option value="" disabled selected>Any difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
                </div>
            </div>

            <div className="filter-section">
                <p style={{marginRight:"15px"}}>Set a maximum walking length:  {maxlength}km</p>
                <input type="range" id="test5" min="0" max="30" style={{ width:"50%"}}
                    value={maxlength}
                    onChange={(e)=>setMaxLength(e.target.value)} />
            </div>
        </div>
    )

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'easy':
                return 'green'
            case 'medium':
                return 'orange'
            case 'hard':
                return 'red'
        }
    }

    const renderResult = (item) => (
        <div className="card" style={{}} key={item._id}>
            <div style={{display:"flex", justifyContent:"space-around"}}>
                <img style={{height:"350px", width:"400px", objectFit:"cover"}} src={item.photo}/>
                <div style={{ padding: '20px'}}>
                    <h5>{item.name} ({item.max}mt)</h5>
                    <div className="result-section">Length: {item.length} km</div>
                    <div style={{display:"flex", alignItems: 'center'}}>
                         <p>Difficulty: </p>
                        <div style={{ height: '25px', width: '25px', marginLeft: '10px', borderRadius: '20px', backgroundColor: getDifficultyColor(item.difficulty)}}/>
                    </div>
                     {/* <p>Via Ferrata: {item.via_ferrata.toString()}</p>  */}
                    <div className="result-section"><span style={{fontSize: '12px'}}>{item.description.substring(0, 150)}</span></div>
                </div>
            </div>
        </div>
    )
    
    const renderResults = () => {
        if (!filteredData || filteredData.length === 0) {
            return (
                <p>No results. Try to change the filters</p>
            )
        }
        return (
            <div>
                {filteredData.map(item => renderResult(item))}
            </div>
        )
    }

    return (
        <>
        {/* <div className="home"> */}
            <div className=" home-card" style={{boxShadow:"none", marginBottom: 0}} >
                <h5 style={{ marginBottom: "80px"}}> You don't know where to go today??</h5>
                
                   {renderZones()}
                   {renderFilters()}
                    {renderResults()}
                    <div style={{display:"flex", justifyContent:"center"}}>  
                    {filteredData && filteredData.length > 0 && (
                            <div className="fixed-action-btn">
                                <a className="btn-floating btn-large red modal-trigger"
                                    data-target="modal12" 
                                    onClick={()=>{
                                    // const filteredData = data.filter((x)=>x.color ===color)
                                    const randomIndex = Math.round(Math.random()*(filteredData.length-1))
                                    console.log(randomIndex)
                                            setResult(filteredData[randomIndex])
                                        }}>
                                    <i class="large material-icons">landscape</i>
                                </a>
                            </div>
                    )}
                   
            
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

export default RandomHikeNew

