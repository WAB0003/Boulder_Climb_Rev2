import { Button, Icon } from "semantic-ui-react"

import VideoModal from "../VideoModal";
import UploadVideoWidget from "../UploadVideoWidget";

const VideoOptions = ({route, setSelectedDot}) => {


    if (route.video_url){
        return (
      
                <Button.Group>
                    <VideoModal route={route} />
                    <Button.Or />
                    <UploadVideoWidget key={route.id} route={route} setSelectedDot={setSelectedDot}/> 
                </Button.Group>

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