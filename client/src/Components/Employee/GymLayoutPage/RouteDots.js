import { useState } from "react"

function RouteDots({ route, dotDiameter, handleDotClick}) {

    // id={eachRoute.id} xPosition={eachRoute.xPosition} yPosition={eachRoute.yPosition}
    const {id, xPosition, yPosition, rating} = route

    //Write an If statement to compute the color of each route based on it's rating.
    let dotColor
    if (rating === "No Rating"){
    }else{
        dotColor = "grey"
        const ratingColor = {
            0:"#FCF638",
            1:"red",
            2:"green",
            3:"#C13CDE ",
            4:"orange",
            5:"#575554 ",
            6:"blue",
        }
        dotColor = ratingColor[rating] 
    }
 
    return (
        <div onClick={()=>handleDotClick(route)}>
            {/* The actual Circle Representing Each Route */}
            <svg className='dots'height={dotDiameter} width={dotDiameter} style={{ left:xPosition+"%", top:yPosition+"%"}} >
                <circle id={id}  cx={dotDiameter/2} cy={dotDiameter/2} r={dotDiameter/2-1} stroke="black" strokeWidth="1" fill={dotColor} />
            </svg>
        </div>
    )
}


export default RouteDots;