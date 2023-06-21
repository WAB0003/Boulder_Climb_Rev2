import { useState } from "react"

function RouteDots({ id, xPosition, yPosition, dotDiameter, handleDotClick}) {
    

    return (
        <div onClick={()=>handleDotClick(id)}>
            {/* The actual Circle Representing Each Route */}
            <svg className='dots'height={dotDiameter} width={dotDiameter} style={{ left:xPosition+"%", top:yPosition+"%"}} >
                <circle id={id}  cx={dotDiameter/2} cy={dotDiameter/2} r={dotDiameter/2-1} stroke="black" strokeWidth="1" fill="red" />
            </svg>
        </div>
    )




}


export default RouteDots;