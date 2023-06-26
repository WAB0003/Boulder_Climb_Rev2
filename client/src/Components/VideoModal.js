import { Icon, Modal, Button } from "semantic-ui-react";
import { useState } from "react";

const VideoModal = ({route}) => {
    const [open, setOpen] = useState(false)

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button>View Video</Button>}
            style={{width:"auto"}}
        >
            <Modal.Header className="centerItems" >{route.name}'</Modal.Header>
            <Modal.Content className="centerItems" >
                <video src={`https://res.cloudinary.com/dorqiv7fn/video/upload/v1685546643/${route.video_url}.mov`} 
                    height="600" 
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