import layoutImg from '../../../images/gymLayout.svg'  
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from "recoil"
import { currentRoutes, recoilSelectedDot } from '../../../Recoil/recoilManagement';
import RouteDots from './RouteDots';
import RouteInfo from './RouteInfo';



function CurrentRoutesPage() {
  const allRoutes = useRecoilValue(currentRoutes)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  const imageWidth = windowWidth * .5
  const dotDiameter = (imageWidth*.02)      //The size of each dot is relative to the image width.
  // const navbarHeight = 80 //The height of Navbar per from App.css


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
  

  const [selectedDot, setSelectedDot] = useRecoilState(recoilSelectedDot)
    
  const handleDotClick = (route) => {
      setSelectedDot(route)
  }

  const exitSideBar = () => {
    setSelectedDot(false)
  }

  //!Display All Routes as Dots on the page
  const activeRoutes = allRoutes.filter((eachRoute)=>eachRoute.active === true)

  const displayRouteDots = activeRoutes.map((eachRoute)=>{
    return <RouteDots key={eachRoute.id} route={eachRoute} dotDiameter={dotDiameter} handleDotClick={handleDotClick} selectedDot={selectedDot}/>
  })
  
  return (

        <div className='main_image_wrapper' style={{width:imageWidth}}  >
          <img src={layoutImg} id="main_image" alt="main_image" useMap='#imgMap' />
          {displayRouteDots}

          <div className="sideNavContainer" >
              <div id="mySidenav" className="sidenav" style={selectedDot ? {width:"400px"} : {width:"0px"}}>
                <div className="exitButton" onClick={exitSideBar}>&#x2716;</div>
                {selectedDot?<RouteInfo key={selectedDot.id} route={selectedDot} setSelectedDot={setSelectedDot} />:<></>}
              </div>        
          </div>
        </div>
  );
}

export default CurrentRoutesPage;
