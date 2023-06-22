import layoutImg from '../../../images/gymLayout.svg'  
import './GymVISUALS.css'
import { useEffect, useState } from 'react';
import { useRecoilState } from "recoil"
import RouteDots from './RouteDots';
import RouteAddForm from './RouteAddForm';
import { Icon } from 'semantic-ui-react';
import { currentRoutes } from '../../../Recoil/routesRecoil';


function EmployeeGymLayout() {

  const [allDots, setAllDots] = useState([])
  const [ allRoutes, setAllRoutes ] = useRecoilState(currentRoutes)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const imageWidth = windowWidth * .5
  const dotDiameter = (imageWidth*.015)      //The size of each dot is relative to the image width.
  const navbarHeight = 80 //The height of Navbar per from App.css


  console.log(allDots)
  console.log(allRoutes)


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
      xPosition:(x),
      yPosition:(y)
    }
    setAllDots((prevDots)=>[...prevDots, newDotObj])
  }


  const [selectedDot, setSelectedDot] = useState([])
  console.log(selectedDot)
    
  const handleDotClick = (id) => {
      setSelectedDot([id])
  }

  const exitSideBar = () => {
    setSelectedDot([])
  }

  


  //!Display All Routes as Dots on the page
  const displayDots = allDots.map((eachDot)=>{
    return <RouteDots key={allDots.indexOf(eachDot)} id={allDots.indexOf(eachDot)} xPosition={eachDot.xPosition} yPosition={eachDot.yPosition} dotDiameter={dotDiameter} handleDotClick={handleDotClick}/>
  })
  
  return (

        <div className='main_image_wrapper' style={{width:imageWidth}}  >
          <img src={layoutImg} id="main_image" alt="main_image" useMap='#imgMap' onClick = {addRouteDot} />
          {displayDots}
                {/* <RouteAddForm setAddRouteModalToggle={setAddRouteModalToggle} addRouteModalToggle={addRouteModalToggle} /> */}
          <div className="sideNavContainer" >
              <div id="mySidenav" className="sidenav" style={selectedDot.length > 0 ? {width:"400px"} : {width:"0px"}}>
              <div className="exitButton" onClick={exitSideBar}>&#x2716;</div>
                <p>I am the Info sidebar for Dot Number {selectedDot[0]}</p>
              </div>        
          </div>
        </div>

  );
}

export default EmployeeGymLayout;
