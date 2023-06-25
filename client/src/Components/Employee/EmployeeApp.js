import { Routes, Route } from "react-router-dom"
import NavEmployee from "./NavEmployee";
import EmployeeHome from "./EmployeeHome";
import EmployeeGymLayout from "./GymLayoutPage/EmployeeGymLayout";



const EmployeeApp = () => {

    return(
        <div>
          <NavEmployee />
          <Routes>
            <Route path="/" element={<EmployeeHome />}/>
            <Route path="/gym_layout" element={<EmployeeGymLayout />} />
            <Route path="/routes" element={<EmployeeHome />}/>
          </Routes>
        </div>
      )
}
export default EmployeeApp;