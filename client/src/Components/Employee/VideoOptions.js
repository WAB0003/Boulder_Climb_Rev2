import { Icon } from "semantic-ui-react"

import VideoModal from "../VideoModal";
import UploadVideoWidget from "../UploadVideoWidget";

const VideoOptions = ({route, setSelectedDot}) => {


    if (route.video_url){
        return (
            <div className="table_icons" >
                <VideoModal route={route} />
                <UploadVideoWidget key={route.id} route={route} setSelectedDot={setSelectedDot}/> 
            </div>
        )
    }else{
        return (
            <div>
                <UploadVideoWidget key={route.id} route={route} setSelectedDot={setSelectedDot}/>
            </div>
        )
    }
}

export default VideoOptions;