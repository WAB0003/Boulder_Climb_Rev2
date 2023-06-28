import { useRecoilState, useRecoilValue } from "recoil";
import { currentClimbs, currentLikes, currentUser } from "../../../Recoil/recoilManagement";
import { Icon } from "semantic-ui-react";
import VideoDisplay from "../VideoDisplay";


const RouteInfo = ({ route, setSelectedDot }) =>{

    const {id, name, rating, video_url, setter } = route
    const user = useRecoilValue(currentUser)
    const [allLikes, setAllLikes] = useRecoilState(currentLikes)
    const [allClimbs, setAllClimbs] = useRecoilState(currentClimbs)

    const allRouteLikes = allLikes?.filter((like)=>like.route.id === id)

    //get individual Like for the specific route and user:
    const likeArray = allLikes.filter((like)=>{
        if (like.user.id === user.id && like.route.id === route.id) {
            return like
        }
    })
    //above filter gives a list of "1" like. Needs to get the actual object of like if it exists. 
    const specificLike = likeArray[0]

    //get individual Climb for the specific route and user:
    const climbArray = allClimbs.filter((climb)=>{
        if (climb.user.id === user.id && climb.route.id === route.id) {
            return climb
        }
    })
    // above filter gives a list of "1" climb. Needs to get the actual object of like if it exists. 
    const specificClimb = climbArray[0]

    //!Like (HEART) BUTTON
    //Variable to display all ACTIVE routes for the SELECTED Gym:
    const handleLikeButton = () => {
        //*DELETE EXISTING LIKE
        if (specificLike) {
            fetch(`likes/${specificLike.id}`, {
                method: "DELETE", 
            })
            .then(()=>{
                const updatedLikes = allLikes.filter((like)=>like.id !== specificLike.id)
                setAllLikes(updatedLikes)
            })
        }else{
            //*ADD NEW LIKE
            const new_like = {
                route_id: route.id,
                user_id: user.id,
            }
            fetch(`likes`, {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                },
                body: JSON.stringify(new_like) 
            }).then(r=>r.json())
            .then((new_like)=>{
                setAllLikes((prevLikes)=>[...prevLikes,new_like])
            }) 
        } 
    }

    // //!CLIMB (CHECK) BUTTON
    //Variable to display all ACTIVE routes for the SELECTED Gym:
    const handleCheckButton = () => {
        //*DELETE EXISTING Climb
        if (specificClimb) {
            fetch(`climbs/${specificClimb.id}`, {
                method: "DELETE", 
            })
            .then(()=>{
                const updatedClimb = allClimbs.filter((climb)=>climb.id !== specificClimb.id)
                setAllClimbs(updatedClimb)
            })
        }else{
            //*ADD NEW LIKE
            const new_climb = {
                route_id: route.id,
                user_id: user.id,
            }
            fetch(`climbs`, {
                method: "POST",
                headers: {
                    "Content-Type":"application/json",
                },
                body: JSON.stringify(new_climb) 
            }).then(r=>r.json())
            .then((new_climb)=>{
                setAllClimbs((prevClimbs)=>[...prevClimbs,new_climb])
            }) 
        } 
    }


    return(
        <div >
            <h1>{name}</h1>
            <div>Setter: {setter.first_name} {setter.last_name}</div>
            <div>Rating: V-{rating}</div>
            <div className="centerItems" style={{backgroundColor:"rgb(225, 235, 237)"}} >
                <VideoDisplay video_url={video_url} />
            </div>
            <div className="table_icons" >
                <div>{allRouteLikes.length} Total Likes</div>
            </div>
            <div className="extraInfoContainer" >
                <div className="table_icons" style={{paddingLeft:"35%", paddingRight:"35%"}} >
                    <div className="centerItems" >
                        <Icon color={(specificLike) ? "green" : "grey"} name={(specificLike) ? "heart" : "heart outline"} onClick={handleLikeButton} />
                        <div>like</div>
                    </div>
                    <div className="centerItems">
                        <Icon color={(specificClimb) ? "green" : "grey"} name={(specificClimb) ? "check circle" : "check circle outline"} onClick={handleCheckButton} />
                        <div>climb?</div>
                    </div>
                </div>
            </div>
        </div>



    )
}

export default RouteInfo;