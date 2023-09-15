import { useEffect, useRef } from "react"
import { useRecoilState } from "recoil";
import { currentRoutes } from "../Recoil/recoilManagement";
import { Button } from "semantic-ui-react";

const UploadVideoWidget = ({route, setSelectedDot}) => {
    const [allRoutes, setAllRoutes] = useRecoilState(currentRoutes)
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    const videoToDatabase = (route, video_url) => {
        const updatedRoute = {
            video_url: video_url 
          }

        fetch (`https://boulderclimb.onrender.com/routes/${route.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type":"application/json",
            },
            body: JSON.stringify(updatedRoute)
        })
        .then((r)=>r.json())
        .then((updatedRoute)=>{
            
            const updatedRouteList = allRoutes.map((route)=>{
                if (route.id===updatedRoute.id) {
                    return updatedRoute;
                }else{
                    return route;
                }
            })
            setAllRoutes(()=>updatedRouteList)
            // if(setSelectedDot){setSelectedDot(updatedRoute)}
        })
    }




    useEffect(()=> {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: "dorqiv7fn",
            uploadPreset: "cpms2iop",
        },function(error, result){
            videoToDatabase(route, result.info.public_id);
        });
    },[route])
    return (
        <Button onClick={() => widgetRef.current.open()} >Upload Video</Button>
    )

}

export default UploadVideoWidget