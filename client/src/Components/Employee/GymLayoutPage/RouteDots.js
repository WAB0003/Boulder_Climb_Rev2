import { useState } from "react"
import { useRecoilState, useSetRecoilState } from "recoil"
import { recoilSelectedDot } from "../../../Recoil/recoilManagement"

function RouteDots({ route, dotDiameter}) {

    // id={eachRoute.id} xPosition={eachRoute.xPosition} yPosition={eachRoute.yPosition}
    const {id, xPosition, yPosition, rating} = route
    const [selectedDot, setSelectedDot] = useRecoilState(recoilSelectedDot)

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

    const handleDotClick = () => {
        setSelectedDot(route)
    }

 
    return (
        <div onClick={handleDotClick} style={(selectedDot.id === route.id)?{animation: "blinker 1s linear infinite"}:{animation:"none"}} >
            {/* The actual Circle Representing Each Route */}
            <svg className='dots'height={dotDiameter} width={dotDiameter} style={{ left:xPosition+"%", top:yPosition+"%"}} >
                <circle id={id}  cx={dotDiameter/2} cy={dotDiameter/2} r={dotDiameter/2-1} stroke="black" strokeWidth="1" fill={dotColor} />
            </svg>
        </div>
    )
}


export default RouteDots;