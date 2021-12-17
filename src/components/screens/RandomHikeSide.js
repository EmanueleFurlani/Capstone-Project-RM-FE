import React, {useState, useEffect, useRef} from "react"
import M from "materialize-css"
import RandomCardDes from "./RandomCardDes"

const RandomHikeSide = () => {
    const randoModal = useRef(null)
    // const mapRandomModal = useRef(null)
    const [data,setData] = useState([])
    const [color,setColor] = useState("")
    const [name,setName] = useState("")
    const [result,setResult] = useState(undefined)
    const [isviaferrata, setisViaferrata] = useState(false)
    const [difficulty, setDifficulty] = useState("")
    const [maxlength, setMaxLength] = useState(50)

    console.log(color)
     useEffect(() => {
        fetch("https://project-randomountain.herokuapp.com/adventure/allhike",{
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
        // M.Modal.init(mapRandomModal.current)
    },[])

    const filteredData = data
        .filter((z)=> name ? z.name.toLowerCase().indexOf(name.toLowerCase()) > -1: true)
        .filter((x)=>x.color === color)
        .filter((y) => isviaferrata ? y.via_ferrata === isviaferrata : true)
        .filter((n) => difficulty ? n.difficulty === difficulty : true)
        .filter((g) => maxlength ? g.length <= maxlength : true)

    const renderZones = () => (
        <>
            <h5 style={{fontWeight:"600",fontFamily: "Libre Baskerville"}}>Select your filters and the generator will find a hike for you!</h5>
            <br></br>
            <p style={{fontWeight:"700", marginTop:"25px"}}>Pick a zone in the Italian Friuli Venezia Giulia region</p>
            <div style={{display:"flex", margin:"21px 0"}}>
                    <div style={{marginRight:"5px", fontWeight:"500"}}>
                        <img className="img_fvg img-card" style={{cursor: "pointer", objectFit:"cover", width:"100%", border:color === "yellow"? "solid 2px black":"0" }}
                        src="https://res.cloudinary.com/dqffc0h5e/image/upload/v1639649158/monti%20fvg/OVEST1_wz5snr.png" 
                        onClick={(e)=>setColor("yellow")}/>
                        <p style={{textAlign: "center"}}>Alpi Carniche Occidentali</p>
                    </div>
                    <div style={{marginRight:"5px", fontWeight:"500"}}>
                        <img className="img_fvg img-card" style={{ cursor: "pointer", objectFit:"cover", width:"100%", border:color === "red"? "solid 2px black":"0"  }}
                        src="https://res.cloudinary.com/dqffc0h5e/image/upload/v1639649157/monti%20fvg/CENTRO1_cvgwyf.png"
                        onClick={(e)=>setColor("red")} />
                        <p style={{textAlign: "center"}}> Alpi Carniche Orientali</p>
                    </div>
                    <div style={{marginRight:"",fontWeight:"500"}}>
                        <img className="img_fvg img-card" style={{cursor: "pointer", objectFit:"cover", width:"100%", border:color === "blu"? "solid 2px black":"0" }}
                        src="https://res.cloudinary.com/dqffc0h5e/image/upload/v1639649157/monti%20fvg/EST1_bx4lz9.png" 
                        onClick={(e)=>setColor("blu")}/>
                        <p style={{textAlign: "center"}}>Alpi Giulie</p>
                    </div>
            </div>
        </>
    )

    const renderFilters = () => (
          <div className="input-field col s12" id="thanks">
            {/* <div className="filter-section">
                <p style={{marginRight:"15px", fontWeight:"600"}}>Trail name</p>
                <div className="input-field" style={{ width: "50%"}}>
                    <input placeholder="Name" type="text" class="validate" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
            </div> */}
            
            <div className="filter-section">
                <p style={{marginRight:"15px",fontWeight:"600"}}>Do you want a "via Ferrata"?</p>
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
                <p style={{marginRight:"15px", fontWeight:"600"}}>Difficulty</p>
                <div style={{ width: '30%'}}>
                    <select className="browser-default"
                value={difficulty}
                onChange={(e)=>setDifficulty(e.target.value)}>
                <option value=""  selected>Any difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
                </div>
            </div>

            <div className="filter-section">
                <p style={{marginRight:"15px", fontWeight:"600"}}>Set a maximum walking length:  {maxlength}km</p>
                <input type="range" id="test5" min="0" max="30" style={{ width:"50%"}}
                    value={maxlength}
                    onChange={(e)=>setMaxLength(e.target.value)} />
            </div>
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
        <div className="card" id="signInUp" key={item._id}>
            <div style={{display:"flex", justifyContent:"space-around"}}>
                <img style={{height:"350px", width:"400px", objectFit:"cover", minWidth:"400px"}} src={item.photo}/>
                <div style={{ padding: '20px'}}>
                    <h5>{item.name} ({item.max}mt)</h5>
                    <div className="result-section">Length: {item.length} km</div>
                    <div style={{display:"flex", alignItems: 'center'}}>
                         <p>Difficulty: </p>
                        <div style={{ height: '25px', width: '25px', marginLeft: '10px', borderRadius: '20px', backgroundColor: getDifficultyColor(item.difficulty)}}/>
                    </div>
                     {/* <p>Via Ferrata: {item.via_ferrata.toString()}</p>  */}
                     <RandomCardDes description={item.description}/>
                    {/* <div className="result-section"><span style={{fontSize: '12px'}}>{item.description.substring(0, 360)}</span></div> */}
                </div>
            </div>
        </div>
    )
    
    const renderResults = () => {
        if (!filteredData || filteredData.length === 0) {
            return (
                <div id="renderResults">
                <p style={{fontWeight:"600"}}>No results. Try to change the filters</p>
                <img id="signInUp" src ="https://res.cloudinary.com/dqffc0h5e/image/upload/v1639502688/monti%20fvg/istockphoto-94977211-612x612_ohwjpt.jpg"/>
                </div>
            )
        }
        return (
            <div>
                {filteredData.map(item => renderResult(item))}
            </div>
        )
    }

    const renderModal = () => (
         <div id="modal12" className="modal" ref={randoModal}>
            <div className="modal-content" >
                {result? <div key={result.name}>
            <div style={{display:"flex",justifyContent:"space-around",fontWeight:"bold"}}>
            <h5>{result.name} ({result.max}mt)</h5>
            </div>
            <div style={{display:"flex", justifyContent: "space-around"}}>
            <img id="img_random" style={{maxHeight:"400px", width:"600px", objectFit:"cover"}} src={result.photo}/>
            </div>
            <p>Description: {result.description}</p>
            {/*      */}
            <p>Length: {result.length} km</p>
            <p>Difficulty: {result.difficulty}</p>
            <p>Via Ferrata: {result.via_ferrata.toString()}</p>   
            </div> : <div>NO RESULT</div>}
            </div>
            <div className="modal-footer">
            <button className="modal-close waves-effect waves-green btn-flat">close</button>
            </div>
        </div>
    )
    // const mapModal = () => (
    //     <div id="modal13" className="modal" ref={mapRandomModal}>
    //     <div className="modal-content" style={{padding:"0"}} >
    //         <img style={{width: "100%"}} src="https://res.cloudinary.com/dqffc0h5e/image/upload/v1639576053/monti%20fvg/img_friuli_fvg_bgxyhh.png"/>
    //     {/* <button className="modal-close waves-effect waves-green btn-flat">close</button> */}
    //     </div>
    // </div>
    // )
    // const floatingMap = () => (
    //     <div className="fixed-action-btn">
    //         <a className="btn-floating btn-large blue modal-trigger"
    //             data-target="modal13" 
    //                 >
    //             <i class="large material-icons">map</i>
    //         </a>
    //     </div>
    // )

    return (
        <div class="row">
            <div id="filters" class="col s3 m6">
                {renderZones()}
                {renderFilters()}
            </div>
            <div id="render" class="col s3 m6 offset-l6" style={{float:"none"}}>
                {renderResults()}
            </div>
            {renderModal()}
            {/* {mapModal()}
            {floatingMap()} */}
        </div>
    )
}

export default RandomHikeSide

