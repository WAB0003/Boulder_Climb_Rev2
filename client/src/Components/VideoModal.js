import { Icon, Modal, Button } from "semantic-ui-react";
import { useState } from "react";
// import VideoPlayer from "./VideoPlayer";
// import "../../App.css"

const VideoModal = ({route}) => {
    const [open, setOpen] = useState(false)

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button>View Video</Button>}
        >
            <Modal.Header>Congrats! You climbed '{route.name}'</Modal.Header>
            <Modal.Content className="user_video" >
                <video src={`https://res.cloudinary.com/dorqiv7fn/video/upload/v1685546643/${route.video_url}.mov`} 
                    width="320" 
                    height="240" 
                    controls>
                </video>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => setOpen(false)}>
                Close
                </Button>
            </Modal.Actions>
        </Modal>
    )
  }

  export default VideoModal;