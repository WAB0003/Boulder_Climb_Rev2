import { useState } from "react"

function RouteDots({ id, xPosition, yPosition, dotDiameter}) {

    const [modalToggle, setModalToggle ] = useState(false)
    
    
    const handleDotClick = (e) => {
        setModalToggle(!modalToggle)
    }

    return (
        <div onClick={handleDotClick}>
            <svg className='dots'height={dotDiameter} width={dotDiameter} style={{ left:xPosition+"%", top:yPosition+"%"}} >
            <circle id={id}  cx={dotDiameter/2} cy={dotDiameter/2} r={dotDiameter/2-1} stroke="black" strokeWidth="1" fill="red" />
            </svg>

            <div id="myModal" className={modalToggle?"modal_on":"modal_off"}>
                <div className="modal-content" >
                    <p >I am the modal for Dot Number {id}</p>
                </div>
            </div>
        </div>
    )




}


export default RouteDots;