import { Icon } from "semantic-ui-react"

import VideoModal from "../VideoModal";
import UploadVideoWidget from "../UploadVideoWidget";

const VideoOptions = ({route}) => {

    if (route.video_url){
        return (
            <div className="table_icons" >
                <VideoModal route={route} />
                <UploadVideoWidget route={route}/> 
            </div>
        )
    }else{
        return (
            <div>
                <UploadVideoWidget route={route}/>
            </div>
        )
    }
}

export default VideoOptions;