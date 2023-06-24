import { useEffect, useRef } from "react"
import { useRecoilState } from "recoil";
import { currentRoutes } from "../Recoil/routesRecoil";

const UploadVideoWidget = ({route, setSelectedDot}) => {
    const [allRoutes, setAllRoutes] = useRecoilState(currentRoutes)
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    const videoToDatabase = (route, video_url) => {
        const updatedRoute = {
            video_url: video_url 
          }

        fetch (`/routes/${route.id}`, {
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
            setSelectedDot(updatedRoute)
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
    },[])
    return (
        <div onClick={() => widgetRef.current.open()} >Upload New Video</div>
    )

}

export default UploadVideoWidget