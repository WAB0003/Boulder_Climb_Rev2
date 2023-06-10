import { useState } from "react"
import RouteInfoModal from "./RouteInfoModal"

function RouteDots({ id, xPosition, yPosition, dotDiameter}) {

    const [infoModalToggle, setInfoModalToggle ] = useState(false)
    
    
    const handleDotClick = () => {
        setInfoModalToggle(!infoModalToggle)
    }

    return (
        <div onClick={handleDotClick}>
            {/* The actual Circle Representing Each Route */}
            <svg className='dots'height={dotDiameter} width={dotDiameter} style={{ left:xPosition+"%", top:yPosition+"%"}} >
            <circle id={id}  cx={dotDiameter/2} cy={dotDiameter/2} r={dotDiameter/2-1} stroke="black" strokeWidth="1" fill="red" />
            </svg>
            {/* Modal for Viewing Individual Route Info */}
            <div id="myModal" className={infoModalToggle?"route_info_modal_on":"route_info_modal_off"}>
                <div className="modal-content" >
                    <p >I am the Info modal for Dot Number {id}</p>
            </div>
        </div>
        </div>
    )




}


export default RouteDots;