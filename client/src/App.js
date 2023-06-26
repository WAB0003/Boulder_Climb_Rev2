import './App.css';
import './GymVISUALS.css'
import LoginPage from './Components/LoginPage';
import UserApp from './Components/User/UserApp';
import EmployeeApp from './Components/Employee/EmployeeApp';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { currentClimbs, currentLikes, currentRoutes, currentUser } from './Recoil/routesRecoil';


function App() {

  const [user, updateUser ] = useRecoilState(currentUser)
  const setAllRoutes = useSetRecoilState(currentRoutes)
  const setAllLikes = useSetRecoilState(currentLikes)
  const setAllClimbs = useSetRecoilState(currentClimbs)

  //Check if user exists in session already
  useEffect(() => {
    fetch("/checksession")
    .then((r)=>{
      if (r.ok) {
        r.json().then((user) => updateUser(user));
      }
    });
  },[])

  //Get all routes upon initial render:
  useEffect(()=>{
    fetch("/routes")
    .then(r=>r.json())
    .then(routes=>setAllRoutes(routes))
  },[])
  

  useEffect(()=>{
    fetch("/likes")
    .then(r=>r.json())
    .then(likes=>setAllLikes(likes))
  },[])

  //Get all routes upon initial render:
  useEffect(()=>{
    fetch("/climbs")
    .then(r=>r.json())
    .then(climbs=>setAllClimbs(climbs))
  },[])


  //create a statement for USER. If User has Admin quality, then direct user toward employee page, otherwise, go to user page
  if (!user) return <LoginPage />
  if (user.admin ===false)return<UserApp /> 
  else if (user.admin === true)return <EmployeeApp />
}
export default App;
