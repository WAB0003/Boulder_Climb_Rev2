const VideoDisplay = ({video_url}) => {
    if (video_url){
        return (
            <video src={`https://res.cloudinary.com/dorqiv7fn/video/upload/v1685546643/${video_url}.mov`} 
                height="300" 
                controls>
            </video>
        )
    } else {
        return <p>Sorry, there is currently no Beta Video for this Route</p>
    }
}

export default VideoDisplay;