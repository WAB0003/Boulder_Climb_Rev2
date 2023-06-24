



function RouteInfoModal({route, infoModalToggle}){


    return (
        <div id="myModal" className={infoModalToggle?"route_info_modal_on":"route_info_modal_off"}>
            <div className="modal-content" >
                <p >I am the Info modal for Dot Number {route.id}</p>
            </div>
        </div>
    )

}

export default RouteInfoModal;