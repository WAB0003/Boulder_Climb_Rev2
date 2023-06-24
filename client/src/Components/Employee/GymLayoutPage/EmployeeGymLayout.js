import layoutImg from '../../../images/gymLayout.svg'  
import './GymVISUALS.css'
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from "recoil"
import RouteDots from './RouteDots';
import RouteAddForm from './RouteAddForm';
import { Icon } from 'semantic-ui-react';
import { currentRoutes } from '../../../Recoil/routesRecoil';
import { currentUser } from '../../../Recoil/userRecoil';
import UpdateRouteForm from '../UpdateRouteForm';


function EmployeeGymLayout() {

  const [ allRoutes, setAllRoutes ] = useRecoilState(currentRoutes)
  const user = useRecoilValue(currentUser)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  const imageWidth = windowWidth * .5
  const dotDiameter = (imageWidth*.02)      //The size of each dot is relative to the image width.
  const navbarHeight = 80 //The height of Navbar per from App.css


  //Centering the image caused positional errors for placing the dots
  //a useEffefct had to be created to constantly update state and capture the "current width of the window"
  useEffect(()=>{
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleWindowResize)
    return () => {
      window.removeEventListener("resize", handleWindowResize)
    }
  },[])
  
  
  //! Add Dot Click 
  const addRouteDot = (e) => {
    //When image is clicked, a dot will appear. Compute the height/width as a percentage relative to the image location
    const imageHeight = document.querySelector('#main_image').clientHeight
    const x = ((e.pageX - ((windowWidth-imageWidth)/2))-(dotDiameter/2))/imageWidth*100;
    const y = (e.pageY-(dotDiameter/2)-navbarHeight)/imageHeight*100;

    const newDotObj = {
      name:"Untitled Route", 
      setter_id:user.id,
      rating: "No Rating",
      gym_id:1,
      active:false,
      xPosition:(x),
      yPosition:(y)
    }

    fetch("/routes", {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
      },
      body:JSON.stringify(newDotObj)
    })
    .then((r)=>r.json())
    .then((newRoute)=>{
      setAllRoutes((prevRouteList)=>[...prevRouteList,newRoute])
    } )
  }


  const [selectedDot, setSelectedDot] = useState(false)
    
  const handleDotClick = (route) => {
      setSelectedDot(route)
      console.log(route)
  }

  const exitSideBar = () => {
    setSelectedDot(false)
  }



  


  //!Display All Routes as Dots on the page
  const displayRouteDots = allRoutes.map((eachRoute)=>{
    return <RouteDots key={eachRoute.id} route={eachRoute} dotDiameter={dotDiameter} handleDotClick={handleDotClick}/>
  })
  
  return (

        <div className='main_image_wrapper' style={{width:imageWidth}}  >
          <img src={layoutImg} id="main_image" alt="main_image" useMap='#imgMap' onClick = {addRouteDot} />
          {displayRouteDots}
                {/* <RouteAddForm setAddRouteModalToggle={setAddRouteModalToggle} addRouteModalToggle={addRouteModalToggle} /> */}
          <div className="sideNavContainer" >
              <div id="mySidenav" className="sidenav" style={selectedDot ? {width:"400px"} : {width:"0px"}}>
                {/* <p>I am the Info sidebar for Dot Number {selectedDot.id}</p> */}
                <div className="exitButton" onClick={exitSideBar}>&#x2716;</div>
                {selectedDot?<UpdateRouteForm key={selectedDot.id} route={selectedDot} />:<></>}
              </div>        
          </div>
        </div>

  );
}

export default EmployeeGymLayout;