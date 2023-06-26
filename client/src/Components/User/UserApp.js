import { Routes, Route } from "react-router-dom"
import NavUser from "./NavUser";
import UserHome from "./UserHome";
import ClimbedRoutesPage from "./ClimbedRoutesPage";
import CurrentRoutesPage from "./CurrentRoutesPage/CurrentRoutesPage";


const UserApp = () => {

    return(
        <div>
          <NavUser />
          <Routes>
            <Route path="/" element={<UserHome/>}/>
            <Route path="/routes" element={<CurrentRoutesPage />} />
            <Route path="/climbed_routes" element={<ClimbedRoutesPage />} />
          </Routes>
        </div>
      )
}
export default UserApp;